<?php

namespace App\Http\Controllers\Content\Assessments;

use App\Models\Content\Assessments\UserAnswer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\QuizAttempt;
use App\Repositories\UserAnswerRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuizAttemptController extends Controller
{
    protected UserAnswerRepository $userAnswerRepository;

    public function __construct(UserAnswerRepository $userAnswerRepository)
    {
        $this->userAnswerRepository = $userAnswerRepository;
    }

    /**
     * Запуск новой попытки прохождения теста
     */
    public function start(Request $request, Quiz $quiz)
    {
        $user = Auth::user();

        // Проверяем количество попыток
        $attemptsCount = $quiz->attempts()->where('user_id', $user->id)->count();
        if ($attemptsCount >= $quiz->max_attempts) {
            return response()->json(['error' => 'Maximum attempts reached'], 403);
        }

        // Создаем новую попытку
        $attempt = QuizAttempt::create([
            'quiz_id' => $quiz->id,
            'user_id' => $user->id,
            'attempt_number' => $attemptsCount + 1,
            'status' => 'in_progress',
            'started_at' => Carbon::now(),
        ]);

        return response()->json($attempt, 201);
    }

    /**
     * Завершение попытки и отправка результата
     */
    public function complete(Request $request, Quiz $quiz, QuizAttempt $attempt)
    {
        $user = Auth::user();

        // Проверяем, что попытка принадлежит пользователю и тесту
        if ($attempt->user_id !== $user->id || $attempt->quiz_id !== $quiz->id) {
            return response()->json(['error' => 'Invalid attempt'], 403);
        }

        // Проверяем, что попытка еще не завершена
        if ($attempt->status !== 'in_progress') {
            return response()->json(['error' => 'Attempt is already completed'], 403);
        }

        // Проверяем ограничение по времени
        if ($quiz->time_limit_minutes) {
            $timeElapsed = Carbon::now()->diffInMinutes($attempt->started_at);
            if ($timeElapsed > $quiz->time_limit_minutes) {
                $attempt->update(['status' => 'failed', 'completed_at' => Carbon::now()]);
                return response()->json(['error' => 'Time limit exceeded'], 403);
            }
        }

        // Подсчитываем результат
        $totalPoints = $quiz->questions()->sum('points');
        $earnedPoints = $attempt->userAnswers()->whereNotNull('points_earned')->sum('points_earned');
        $score = $totalPoints > 0 ? ($earnedPoints / $totalPoints) * 100 : 0;

        $status = $score >= $quiz->passing_score ? 'completed' : 'failed';

        $attempt->update([
            'score' => round($score, 2),
            'status' => $status,
            'completed_at' => Carbon::now(),
        ]);

        return response()->json([
            'attempt' => $attempt,
            'score' => $score,
            'status' => $status,
            'answers' => $attempt->userAnswers()->with('question')->get(),
        ], 200);
    }

    /**
     * Массовая отправка всех ответов и завершение попытки
     */

    public function submitAnswers(Request $request, Quiz $quiz)
    {
        $user = Auth::user();

        // Находим текущую активную попытку пользователя
        $attempt = $quiz->attempts()
            ->where('user_id', $user->id)
            ->where('status', 'in_progress')
            ->first();

        if (!$attempt) {
            return response()->json([
                'error' => 'No active attempt found. Please start the quiz first.'
            ], 404);
        }

        // Проверка времени
        if ($quiz->time_limit_minutes) {
            $timeElapsed = Carbon::now()->diffInMinutes($attempt->started_at);
            if ($timeElapsed > $quiz->time_limit_minutes) {
                $attempt->update([
                    'status' => 'failed',
                    'score' => 0,
                    'completed_at' => Carbon::now(),
                ]);

                return response()->json([
                    'error' => 'Time limit exceeded. Attempt has been failed.'
                ], 403);
            }
        }

        $validated = $request->validate([
            'answers' => 'required|array|min:1',
            'answers.*.question_id' => 'required|integer|exists:questions,id',
            'answers.*.question_type' => 'required|string',
            'answers.*.answer' => 'required', // array или mixed в зависимости от типа
        ]);

        DB::beginTransaction();
        try {
            $totalEarned = 0;
            $summary = [];

            foreach ($validated['answers'] as $answerData) {
                $question = Question::findOrFail($answerData['question_id']);

                // Проверка: вопрос принадлежит квизу
                if ($question->quiz_id !== $quiz->id) {
                    throw new \Exception("Question {$question->id} does not belong to this quiz");
                }

                // Проверка: ответ уже был (опционально — можно разрешить перезапись)
                $existing = UserAnswer::where('quiz_attempt_id', $attempt->id)
                    ->where('question_id', $question->id)
                    ->first();

                if ($existing) {
                    // Перезаписываем (или можно запретить — на ваш выбор)
                    $existing->delete();
                }

                $score = $this->userAnswerRepository->create($answerData, $attempt->id);
                $totalEarned += $score ?? 0;

                $summary[] = [
                    'question_id' => $question->id,
                    'points_earned' => $score,
                    'max_points' => $question->points,
                ];
            }

            // Подсчёт итогового результата
            $totalPossible = $quiz->questions()->sum('points');
            $percentage = $totalPossible > 0 ? ($totalEarned / $totalPossible) * 100 : 0;
            $passed = $percentage >= $quiz->passing_score;

            // Завершаем попытку
            $attempt->update([
                'score' => round($percentage, 2),
                'status' => $passed ? 'completed' : 'failed',
                'completed_at' => Carbon::now(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Quiz submitted successfully',
                'attempt_id' => $attempt->id,
                'attempt_number' => $attempt->attempt_number,
                'score_percentage' => round($percentage, 2),
                'points_earned' => $totalEarned,
                'points_possible' => $totalPossible,
                'passed' => $passed,
                'summary' => $summary,
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Quiz submit failed', ['error' => $e->getMessage(), 'user_id' => $user->id]);

            return response()->json([
                'error' => 'Failed to submit quiz',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}

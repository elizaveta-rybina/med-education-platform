<?php

namespace App\Http\Controllers\Content\Assessments;

use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\QuizAttempt;
use App\Models\Content\Assessments\UserAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Http\Controllers\Controller;

class QuizAttemptController extends Controller
{
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
     * Сохранение ответа пользователя на вопрос
     */
    public function saveAnswer(Request $request, Quiz $quiz, QuizAttempt $attempt, Question $question)
    {
        $user = Auth::user();

        // Проверяем, что попытка принадлежит пользователю и тесту
        if ($attempt->user_id !== $user->id || $attempt->quiz_id !== $quiz->id || $question->quiz_id !== $quiz->id) {
            return response()->json(['error' => 'Invalid attempt or question'], 403);
        }

        // Проверяем, что попытка еще не завершена
        if ($attempt->status !== 'in_progress') {
            return response()->json(['error' => 'Attempt is already completed'], 403);
        }

        // Проверяем ограничение по времени, если есть
        if ($quiz->time_limit_minutes) {
            $timeElapsed = Carbon::now()->diffInMinutes($attempt->started_at);
            if ($timeElapsed > $quiz->time_limit_minutes) {
                $attempt->update(['status' => 'failed', 'completed_at' => Carbon::now()]);
                return response()->json(['error' => 'Time limit exceeded'], 403);
            }
        }

        $validated = $request->validate([
            'answer_data' => 'required|json',
        ]);

        $answerData = json_decode($validated['answer_data'], true);
        $isCorrect = null;
        $pointsEarned = null;

        // Автоматическая проверка для вопросов с автопроверкой
        if ($question->is_auto_graded) {
            $isCorrect = $this->autoGradeAnswer($question, $answerData);
            $pointsEarned = $isCorrect ? $question->points : 0;
        }

        // Сохраняем ответ пользователя
        $userAnswer = UserAnswer::updateOrCreate(
            [
                'quiz_attempt_id' => $attempt->id,
                'question_id' => $question->id,
            ],
            [
                'answer_data' => $validated['answer_data'],
                'is_correct' => $isCorrect,
                'points_earned' => $pointsEarned,
            ]
        );

        return response()->json($userAnswer, 200);
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
     * Автоматическая проверка ответа
     */
    protected function autoGradeAnswer(Question $question, array $answerData): bool
    {
        switch ($question->question_type) {
            case 'single_choice':
                $correctOption = $question->options()->where('is_correct', true)->first();
                return $correctOption && isset($answerData['option_id']) && $correctOption->id == $answerData['option_id'];

            case 'multiple_choice':
                $correctOptionIds = $question->options()->where('is_correct', true)->pluck('id')->toArray();
                $selectedOptionIds = $answerData['option_ids'] ?? [];
                return !array_diff($correctOptionIds, $selectedOptionIds) && !array_diff($selectedOptionIds, $correctOptionIds);

            case 'text_input':
                $answerKey = $question->answerKeys()->first();
                if (!$answerKey) {
                    return false;
                }
                $userAnswer = $answerData['text'] ?? '';
                if ($answerKey->is_case_sensitive) {
                    return $userAnswer === $answerKey->correct_answer;
                }
                return strtolower($userAnswer) === strtolower($answerKey->correct_answer);

            case 'matching':
                $correctMatches = $question->options()->pluck('matching_data', 'id')->toArray();
                $userMatches = $answerData['matches'] ?? [];
                foreach ($correctMatches as $optionId => $correctMatch) {
                    if (!isset($userMatches[$optionId]) || $userMatches[$optionId] !== $correctMatch) {
                        return false;
                    }
                }
                return true;

            case 'ordering':
                $correctOrder = $question->options()->orderBy('order')->pluck('id')->toArray();
                $userOrder = $answerData['order'] ?? [];
                return $correctOrder === $userOrder;

            case 'table':
                $correctCells = json_decode($question->metadata, true)['correct_cells'] ?? [];
                $userCells = $answerData['cells'] ?? [];
                foreach ($correctCells as $cellId => $correctValue) {
                    if (!isset($userCells[$cellId]) || $userCells[$cellId] !== $correctValue) {
                        return false;
                    }
                }
                return true;

            default:
                return false;
        }
    }
}

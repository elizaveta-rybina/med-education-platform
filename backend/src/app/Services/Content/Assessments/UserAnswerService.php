<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\QuizAttempt;
use App\Repositories\UserAnswerRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserAnswerService
{
    protected $userAnswerRepository;

    public function __construct(UserAnswerRepository $userAnswerRepository)
    {
        $this->userAnswerRepository = $userAnswerRepository;
    }

    public function submitAnswers(int $quizAttemptId, array $answers): void
    {
        DB::beginTransaction();

        try {
            $quizAttempt = QuizAttempt::findOrFail($quizAttemptId);

            // Проверка, что попытка не завершена
            if ($quizAttempt->completed_at) {
                throw new \Exception('Quiz attempt already completed');
            }

            // Проверка, что пользователь имеет доступ к попытке
            if ($quizAttempt->user_id !== auth()->id()) {
                throw new \Exception('Unauthorized access to quiz attempt');
            }

            $totalScore = 0;
            foreach ($answers as $answerData) {
                // Проверка, что вопрос принадлежит тесту
                if ($answerData['question_id']) {
                    $question = \App\Models\Content\Assessments\Question::findOrFail($answerData['question_id']);
                    if ($question->quiz_id !== $quizAttempt->quiz_id) {
                        throw new \Exception("Question {$answerData['question_id']} does not belong to quiz {$quizAttempt->quiz_id}");
                    }
                }

                $score = $this->userAnswerRepository->create($answerData, $quizAttemptId);
                $totalScore += $score ?? 0;
            }

            // Завершаем попытку
            $quizAttempt->update([
                'score' => $totalScore,
                'completed_at' => now(),
            ]);

            // Обновляем результат теста
            $quiz = $quizAttempt->quiz;
            \App\Models\Content\Assessments\UserQuizResult::updateOrCreate(
                [
                    'user_id' => $quizAttempt->user_id,
                    'quiz_id' => $quizAttempt->quiz_id,
                    'attempt_number' => $quizAttempt->attempt_number,
                ],
                [
                    'score' => $totalScore,
                    'passed' => $totalScore >= $quiz->passing_score,
                    'started_at' => $quizAttempt->started_at,
                    'completed_at' => now(),
                ]
            );

            Log::info('UserAnswerService: Answers submitted', [
                'quiz_attempt_id' => $quizAttemptId,
                'total_score' => $totalScore,
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('UserAnswerService: Error in submitAnswers', ['error' => $e->getMessage()]);
            throw $e;
        }
    }
}

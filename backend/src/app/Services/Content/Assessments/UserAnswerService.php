<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\UserAnswer;
use App\Models\Content\Assessments\UserChoiceAnswer;
use App\Models\Content\Assessments\UserTextAnswer;
use App\Models\Content\Assessments\UserMatchingAnswer;
use Illuminate\Support\Facades\DB;

class UserAnswerService
{
    public function create(array $userAnswersData, int $quizAttemptId, int $questionId, string $questionType): array
    {
        $userAnswers = [];
        DB::beginTransaction();

        try {
            foreach ($userAnswersData as $data) {
                $userAnswerable = $this->createUserAnswerable($data, $questionType);
                $userAnswer = UserAnswer::create([
                    'quiz_attempt_id' => $quizAttemptId,
                    'question_id' => $questionId,
                    'user_answerable_type' => get_class($userAnswerable),
                    'user_answerable_id' => $userAnswerable->id,
                    'score' => $data['score'] ?? null,
                ]);
                $userAnswers[] = $userAnswer;
            }

            DB::commit();
            return $userAnswers;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    protected function createUserAnswerable(array $data, string $questionType)
    {
        return match ($questionType) {
            'single_choice', 'multiple_choice' => UserChoiceAnswer::create([
                'choice_answer_id' => $data['choice_answer_id'],
            ]),
            'open_answer', 'open_schema' => UserTextAnswer::create([
                'answer_text' => $data['answer_text'],
            ]),
            'matching', 'matching_schema' => UserMatchingAnswer::create([
                'matching_answer_id' => $data['matching_answer_id'],
                'user_match_value' => $data['user_match_value'],
            ]),
            default => throw new \InvalidArgumentException("Unsupported question type: $questionType"),
        };
    }
}

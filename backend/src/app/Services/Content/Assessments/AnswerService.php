<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Answer;

/**
 * Class AnswerService.
 */
class AnswerService
{
    public function create(array $answers, int $questionId): void
    {
        foreach ($answers as $answer) {
            Answer::create([
                'question_id' => $questionId,
                'answer_text' => $answer['answer_text'] ?? null,
                'is_correct' => $answer['is_correct'] ?? null,
                'match_key' => $answer['match_key'] ?? null,
                'match_value' => $answer['match_value'] ?? null,
                'order' => $answer['order'] ?? null,
            ]);
        }
    }
}

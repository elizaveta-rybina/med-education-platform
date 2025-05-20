<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Question;

class QuestionService
{
    public function create(array $data, int $quizId): Question
    {
        return Question::create([
            'quiz_id' => $quizId,
            'question_text' => $data['question_text'],
            'question_type' => $data['question_type'],
            'points' => $data['points'] ?? 1,
            'order_number' => $data['order_number'] ?? null,
            'explanation' => $data['explanation'] ?? null,
        ]);
    }
}

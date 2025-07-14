<?php

namespace App\Repositories;

use App\Models\Content\Assessments\Question;

class QuestionRepository
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

    public function update(Question $question, array $data): Question
    {
        $question->update(array_filter($data, fn($value) => !is_null($value)));
        return $question;
    }

    public function delete(Question $question): void
    {
        $question->delete();
    }

    public function findOrFail(int $id): Question
    {
        return Question::findOrFail($id);
    }
}

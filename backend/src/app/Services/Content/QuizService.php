<?php

namespace App\Services\Content;

use App\Models\Content\Quiz;

class QuizService
{
    public function create(array $data): Quiz
    {
        return Quiz::create([
            'quizable_type' => $data['quizable_type'] ?? null,
            'quizable_id' => $data['quizable_id'] ?? null,
            'topic_id' => $data['topic_id'],
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'quiz_type' => $data['quiz_type'] ?? 'topic_final',
            'max_attempts' => $data['max_attempts'] ?? 1,
            'passing_score' => $data['passing_score'] ?? 80,
            'time_limit_minutes' => $data['time_limit_minutes'] ?? null,
            'order_number' => $data['order_number'],
        ]);
    }
}

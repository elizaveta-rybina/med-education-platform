<?php

namespace App\Repositories;

use App\Models\Content\Assessments\Quiz;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class QuizRepository
{
    public function create(array $data, Model $parentModel): Quiz
    {
        try {
            $quiz = Quiz::create([
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'quiz_type' => $data['quiz_type'],
                'max_attempts' => $data['max_attempts'],
                'passing_score' => $data['passing_score'],
                'time_limit_minutes' => $data['time_limit_minutes'] ?? null,
                'questions_count' => $data['questions_count'] ?? null,
                'quizable_type' => get_class($parentModel),
                'quizable_id' => $parentModel->id,
            ]);
            Log::info('QuizRepository: Quiz created', ['quiz_id' => $quiz->id]);
            return $quiz;
        } catch (\Exception $e) {
            Log::error('QuizRepository: Error in create method', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function update(Quiz $quiz, array $data): Quiz
    {
        $quiz->update(array_filter($data, fn($value) => !is_null($value)));
        return $quiz;
    }

    public function delete(Quiz $quiz): void
    {
        $quiz->delete();
    }

    public function findOrFail(int $id): Quiz
    {
        return Quiz::findOrFail($id);
    }
}

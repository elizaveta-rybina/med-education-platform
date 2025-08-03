<?php

namespace App\Repositories;

use App\Models\Content\Assessments\Quiz;
use App\Repositories\Contracts\QuizRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuizRepository implements QuizRepositoryInterface
{
    protected Quiz $model;

    public function __construct(Quiz $quiz)
    {
        $this->model = $quiz;
    }

    /**
     * Get all quizzes with relations.
     *
     * @param array $relations
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllWithRelations(array $relations)
    {
        return $this->model->with($relations)->get();
    }

    /**
     * Find quiz by ID with relations.
     *
     * @param int $id
     * @param array $relations
     * @return \App\Models\Content\Assessments\Quiz
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findWithRelations(int $id, array $relations): Quiz
    {
        return $this->model->with($relations)->findOrFail($id);
    }

    /**
     * Find quiz by ID.
     *
     * @param int $id
     * @return \App\Models\Content\Assessments\Quiz
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function find(int $id): Quiz
    {
        return $this->model->findOrFail($id);
    }

    /**
     * Create a new quiz.
     *
     * @param array $data
     * @return \App\Models\Content\Assessments\Quiz
     */
    public function create(array $data): Quiz
    {
        return $this->model->create($data);
    }

    /**
     * Update an existing quiz.
     *
     * @param \App\Models\Content\Assessments\Quiz $quiz
     * @param array $data
     * @return bool
     */
    public function update(Quiz $quiz, array $data): bool
    {
        DB::enableQueryLog();
        $result = $quiz->update($data);
        Log::info('SQL queries for update', [
            'quiz_id' => $quiz->id,
            'queries' => DB::getQueryLog()
        ]);
        return $result;
    }

    /**
     * Delete a quiz.
     *
     * @param \App\Models\Content\Assessments\Quiz $quiz
     * @return void
     */
    public function delete(Quiz $quiz): void
    {
        $quiz->delete();
    }
}

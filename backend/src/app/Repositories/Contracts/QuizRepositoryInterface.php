<?php

namespace App\Repositories\Contracts;

use App\Models\Content\Assessments\Quiz;

interface QuizRepositoryInterface
{
    /**
     * Get all quizzes with relations.
     *
     * @param array $relations
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllWithRelations(array $relations);

    /**
     * Find quiz by ID with relations.
     *
     * @param int $id
     * @param array $relations
     * @return Quiz
     */
    public function findWithRelations(int $id, array $relations): Quiz;

    /**
     * Find quiz by ID.
     *
     * @param int $id
     * @return Quiz
     */
    public function find(int $id): Quiz;

    /**
     * Create a new quiz.
     *
     * @param array $data
     * @return Quiz
     */
    public function create(array $data): Quiz;

    /**
     * Update an existing quiz.
     *
     * @param Quiz $quiz
     * @param array $data
     * @return bool
     */
    public function update(Quiz $quiz, array $data): bool;

    /**
     * Delete a quiz.
     *
     * @param Quiz $quiz
     * @return void
     */
    public function delete(Quiz $quiz): void;
}

<?php

namespace App\Repositories\Contracts;

use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\Question;

interface QuestionRepositoryInterface
{
    /**
     * Get all questions for a quiz with relations.
     *
     * @param Quiz $quiz
     * @param array $relations
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllForQuiz(Quiz $quiz, array $relations);

    /**
     * Find question by ID with relations.
     *
     * @param int $id
     * @param array $relations
     * @return Question
     */
    public function findWithRelations(int $id, array $relations): Question;

    /**
     * Find question by ID.
     *
     * @param int $id
     * @return Question
     */
    public function find(int $id): Question;

    /**
     * Create a new question for a quiz.
     *
     * @param Quiz $quiz
     * @param array $data
     * @return Question
     */
    public function create(Quiz $quiz, array $data): Question;

    /**
     * Update an existing question.
     *
     * @param Question $question
     * @param array $data
     * @return bool
     */
    public function update(Question $question, array $data): bool;

    /**
     * Delete a question.
     *
     * @param Question $question
     * @return void
     */
    public function delete(Question $question): void;
}

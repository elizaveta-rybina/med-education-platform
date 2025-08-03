<?php

namespace App\Services\Contracts;

use App\Models\Content\Assessments\Quiz;

interface QuizServiceInterface
{
    /**
     * Get all quizzes with relations.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllQuizzes();

    /**
     * Get quiz by ID with relations.
     *
     * @param int $id
     * @return Quiz
     */
    public function getQuizById(int $id): Quiz;

    /**
     * Create a new quiz.
     *
     * @param array $data
     * @return Quiz
     */
    public function createQuiz(array $data): Quiz;

    /**
     * Update an existing quiz.
     *
     * @param Quiz $quiz
     * @param array $data
     * @return Quiz
     */
    public function updateQuiz(Quiz $quiz, array $data): Quiz;

    /**
     * Delete a quiz.
     *
     * @param Quiz $quiz
     * @return void
     */
    public function deleteQuiz(Quiz $quiz): void;
}

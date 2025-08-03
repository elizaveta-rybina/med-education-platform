<?php

namespace App\Services\Contracts;

use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\Question;

interface QuestionServiceInterface
{


    /**
     * Create a new question for a quiz.
     *
     * @param Quiz $quiz
     * @param array $data
     * @return Question
     */
    public function createQuestion(Quiz $quiz, array $data): Question;

    /**
     * Update an existing question.
     *
     * @param Quiz $quiz
     * @param Question $question
     * @param array $data
     * @return Question
     */
    public function updateQuestion(Quiz $quiz, Question $question, array $data): Question;

    /**
     * Delete a question.
     *
     * @param Quiz $quiz
     * @param Question $question
     * @return void
     */
    public function deleteQuestion(Quiz $quiz, Question $question): void;
}

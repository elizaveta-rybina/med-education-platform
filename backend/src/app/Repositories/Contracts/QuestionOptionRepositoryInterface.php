<?php

namespace App\Repositories\Contracts;

use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\QuestionOption;

interface QuestionOptionRepositoryInterface
{
    /**
     * Get all options for a question.
     *
     * @param Question $question
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllForQuestion(Question $question);

    /**
     * Find option by ID.
     *
     * @param int $id
     * @return QuestionOption
     */
    public function find(int $id): QuestionOption;

    /**
     * Create a new option for a question.
     *
     * @param Question $question
     * @param array $data
     * @return QuestionOption
     */
    public function create(Question $question, array $data): QuestionOption;

    /**
     * Update an existing option.
     *
     * @param QuestionOption $option
     * @param array $data
     * @return bool
     */
    public function update(QuestionOption $option, array $data): bool;

    /**
     * Delete an option.
     *
     * @param QuestionOption $option
     * @return void
     */
    public function delete(QuestionOption $option): void;
}

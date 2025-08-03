<?php

namespace App\Repositories;

use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\QuestionOption;
use App\Repositories\Contracts\QuestionOptionRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuestionOptionRepository implements QuestionOptionRepositoryInterface
{
    protected QuestionOption $model;

    public function __construct(QuestionOption $questionOption)
    {
        $this->model = $questionOption;
    }

    /**
     * Get all options for a question.
     *
     * @param Question $question
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllForQuestion(Question $question)
    {
        return $question->options()->get();
    }

    /**
     * Find option by ID.
     *
     * @param int $id
     * @return QuestionOption
     */
    public function find(int $id): QuestionOption
    {
        return $this->model->findOrFail($id);
    }

    /**
     * Create a new option for a question.
     *
     * @param Question  $question
     * @param array $data
     * @return QuestionOption
     */
    public function create(Question $question, array $data): QuestionOption
    {
        return $question->options()->create($data);
    }

    /**
     * Update an existing option.
     *
     * @param QuestionOption $option
     * @param array $data
     * @return bool
     */
    public function update(QuestionOption $option, array $data): bool
    {
        DB::enableQueryLog();
        $result = $option->update($data);
        Log::info('SQL queries for option update', [
            'option_id' => $option->id,
            'queries' => DB::getQueryLog()
        ]);
        return $result;
    }

    /**
     * Delete an option.
     *
     * @param QuestionOption $option
     * @return void
     */
    public function delete(QuestionOption $option): void
    {
        $option->delete();
    }
}

<?php

namespace App\Repositories;

use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\Question;
use App\Repositories\Contracts\QuestionRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuestionRepository implements QuestionRepositoryInterface
{
    protected Question $model;

    public function __construct(Question $question)
    {
        $this->model = $question;
    }

    /**
     * Get all questions for a quiz with relations.
     *
     * @param Quiz $quiz
     * @param array $relations
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllForQuiz(Quiz $quiz, array $relations)
    {
        return $quiz->questions()->with($relations)->get();
    }

    /**
     * Find question by ID with relations.
     *
     * @param int $id
     * @param array $relations
     * @return Question
     */
    public function findWithRelations(int $id, array $relations): Question
    {
        return $this->model->with($relations)->findOrFail($id);
    }

    /**
     * Find question by ID.
     *
     * @param int $id
     * @return Question
     */
    public function find(int $id): Question
    {
        return $this->model->findOrFail($id);
    }

    /**
     * Create a new question for a quiz.
     *
     * @param Quiz $quiz
     * @param array $data
     * @return Question
     */
    public function create(Quiz $quiz, array $data): Question
    {
        return $quiz->questions()->create($data);
    }

    /**
     * Update an existing question.
     *
     * @param Question $question
     * @param array $data
     * @return bool
     */
    public function update(Question $question, array $data): bool
    {
        DB::enableQueryLog();
        $result = $question->update($data);
        Log::info('SQL queries for question update', [
            'question_id' => $question->id,
            'queries' => DB::getQueryLog()
        ]);
        return $result;
    }

    /**
     * Delete a question.
     *
     * @param Question $question
     * @return void
     */
    public function delete(Question $question): void
    {
        $question->delete();
    }
}

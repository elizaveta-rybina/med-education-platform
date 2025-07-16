<?php

namespace App\Services\Content\Assessments;

use App\Repositories\AnswerRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AnswerService
{
    protected $answerRepository;

    public function __construct(AnswerRepository $answerRepository)
    {
        $this->answerRepository = $answerRepository;
    }

    public function create(array $answers, int $questionId, string $questionType): void
    {
        DB::beginTransaction();

        try {
            foreach ($answers as $answerData) {
                $this->answerRepository->create($answerData, $questionId, $questionType);
            }
            Log::info('AnswerService: Answers created', ['question_id' => $questionId, 'question_type' => $questionType]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('AnswerService: Error in create method', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function update(array $answers, int $questionId, string $questionType): void
    {
        DB::beginTransaction();

        try {
            // Удаляем старые ответы
            $this->answerRepository->deleteByQuestionId($questionId);
            // Создаем новые
            foreach ($answers as $answerData) {
                $this->answerRepository->create($answerData, $questionId, $questionType);
            }
            Log::info('AnswerService: Answers updated', ['question_id' => $questionId, 'question_type' => $questionType]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('AnswerService: Error in update method', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function delete(int $questionId): void
    {
        DB::beginTransaction();

        try {
            $this->answerRepository->deleteByQuestionId($questionId);
            Log::info('AnswerService: Answers deleted', ['question_id' => $questionId]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('AnswerService: Error in delete method', ['error' => $e->getMessage()]);
            throw $e;
        }
    }
}

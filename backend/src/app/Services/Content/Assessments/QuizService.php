<?php

namespace App\Services\Content\Assessments;

use App\Repositories\QuizRepository;
use App\Models\Content\Assessments\Quiz;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuizService
{
    protected $quizRepository;

    public function __construct(QuizRepository $quizRepository)
    {
        Log::debug('QuizService: Конструктор вызван');
        $this->quizRepository = $quizRepository;
        Log::debug('QuizService: QuizRepository инжектирован');
    }

    public function create(array $data, Model $parentModel)
    {
        Log::debug('QuizService: Метод create вызван', ['data' => $data, 'parent_type' => get_class($parentModel)]);
        DB::beginTransaction();

        try {
            $quiz = $this->quizRepository->create($data, $parentModel);
            Log::debug('QuizService: Тест создан', ['quiz_id' => $quiz->id]);

            DB::commit();
            Log::debug('QuizService: Транзакция зафиксирована');
            return $quiz;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('QuizService: Ошибка в методе create', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            throw $e;
        }
    }

    public function update(Quiz $quiz, array $data)
    {
        Log::debug('QuizService: Метод update вызван', ['quiz_id' => $quiz->id]);
        DB::beginTransaction();

        try {
            $quiz = $this->quizRepository->update($quiz, $data);
            Log::debug('QuizService: Тест обновлен');

            DB::commit();
            Log::debug('QuizService: Транзакция зафиксирована');
            return $quiz;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('QuizService: Ошибка в методе update', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            throw $e;
        }
    }

    public function delete(Quiz $quiz)
    {
        Log::debug('QuizService: Метод delete вызван', ['quiz_id' => $quiz->id]);
        DB::beginTransaction();

        try {
            $this->quizRepository->delete($quiz);
            DB::commit();
            Log::debug('QuizService: Тест удален');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('QuizService: Ошибка в методе delete', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            throw $e;
        }
    }

    public function findOrFail(int $id): Quiz
    {
        Log::debug('QuizService: Метод findOrFail вызван', ['id' => $id]);
        return $this->quizRepository->findOrFail($id);
    }
}

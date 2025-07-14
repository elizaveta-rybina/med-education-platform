<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Question;
use App\Repositories\QuestionRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuestionService
{
    protected $questionRepository;
    protected $answerService;
    // protected $schemaQuestionService;

    public function __construct(
        QuestionRepository $questionRepository,
        AnswerService $answerService
        // SchemaQuestionService $schemaQuestionService // Закомментировано
    ) {
        Log::debug('QuestionService: Конструктор вызван');
        $this->questionRepository = $questionRepository;
        Log::debug('QuestionService: QuestionRepository инжектирован');
        $this->answerService = $answerService;
        Log::debug('QuestionService: AnswerService инжектирован');
        // $this->schemaQuestionService = $schemaQuestionService;
        // Log::debug('QuestionService: SchemaQuestionService инжектирован');
    }

    public function create(array $data, int $quizId): Question
    {
        Log::debug('QuestionService: Метод create вызван', ['data' => $data, 'quizId' => $quizId]);
        DB::beginTransaction();

        try {
            // Временно отключаем создание вопросов типа open_schema и matching_schema
            $question = $this->questionRepository->create($data, $quizId);
            Log::debug('QuestionService: Вопрос создан', ['question_id' => $question->id]);

            if (!empty($data['answers'])) {
                $this->answerService->create($data['answers'], $question->id, $data['question_type']);
                Log::debug('QuestionService: Ответы созданы', ['question_id' => $question->id]);
            }

            DB::commit();
            Log::debug('QuestionService: Транзакция зафиксирована');
            return $question;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('QuestionService: Ошибка в методе create', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            throw $e;
        }
    }

    public function update(Question $question, array $data): Question
    {
        Log::debug('QuestionService: Метод update вызван', ['question_id' => $question->id]);
        DB::beginTransaction();

        try {
            $question = $this->questionRepository->update($question, $data);
            Log::debug('QuestionService: Вопрос обновлен');

            if (!empty($data['answers'])) {
                $this->answerService->update($data['answers'], $question->id, $question->question_type);
                Log::debug('QuestionService: Ответы обновлены');
            }

            DB::commit();
            Log::debug('QuestionService: Транзакция зафиксирована');
            return $question;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('QuestionService: Ошибка в методе update', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            throw $e;
        }
    }

    public function delete(Question $question): void
    {
        Log::debug('QuestionService: Метод delete вызван', ['question_id' => $question->id]);
        DB::beginTransaction();

        try {
            $this->answerService->delete($question->id);
            $this->questionRepository->delete($question);
            DB::commit();
            Log::debug('QuestionService: Вопрос удален');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('QuestionService: Ошибка в методе delete', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            throw $e;
        }
    }

    public function findOrFail(int $id): Question
    {
        Log::debug('QuestionService: Метод findOrFail вызван', ['id' => $id]);
        return $this->questionRepository->findOrFail($id);
    }
}

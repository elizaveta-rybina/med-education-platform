<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\Question;
use App\Repositories\Contracts\QuestionRepositoryInterface;
use App\Services\Contracts\QuestionOptionServiceInterface;
use App\Services\Contracts\QuestionServiceInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class QuestionService implements QuestionServiceInterface
{
    protected QuestionRepositoryInterface $questionRepository;
    protected QuestionOptionServiceInterface $questionOptionService;

    public function __construct(
        QuestionRepositoryInterface $questionRepository,
        QuestionOptionServiceInterface $questionOptionService
    ) {
        $this->questionRepository = $questionRepository;
        $this->questionOptionService = $questionOptionService;
    }

    /**
     * Create a new question for a quiz.
     *
     * @param Quiz $quiz
     * @param array $data
     * @return Question
     * @throws Exception
     */
    public function createQuestion(Quiz $quiz, array $data): Question
    {
        return DB::transaction(function () use ($quiz, $data) {
            try {
                Log::info('Creating question for quiz', ['quiz_id' => $quiz->id, 'data' => $data]);

                $options = $data['options'] ?? [];
                unset($data['options']);

                // Создаем вопрос
                $question = $this->questionRepository->create($quiz, $data);

                // Создаем опции, если они есть
                if (!empty($options)) {
                    $this->questionOptionService->createMultipleOptions($quiz, $question, $options);
                }

                return $question;
            } catch (Exception $e) {
                Log::error('Failed to create question: ' . $e->getMessage(), [
                    'quiz_id' => $quiz->id,
                    'data' => $data,
                    'trace' => $e->getTraceAsString()
                ]);
                throw new Exception('Failed to create question', 0, $e);
            }
        });
    }

    /**
     * Update an existing question.
     *
     * @param Quiz $quiz
     * @param Question $question
     * @param array $data
     * @return Question
     * @throws Exception
     */
    public function updateQuestion(Quiz $quiz, Question $question, array $data): Question
    {
        return DB::transaction(function () use ($quiz, $question, $data) {
            try {
                Log::info('Updating question', ['quiz_id' => $quiz->id, 'question_id' => $question->id, 'data' => $data]);

                $options = $data['options'] ?? [];
                unset($data['options']);

                // Обновляем вопрос
                $this->questionRepository->update($question, $data);

                // Синхронизируем опции
                if (!empty($options)) {
                    $this->questionOptionService->syncOptions($quiz, $question, $options);
                } else {
                    $question->options()->delete();
                }

                return $question->fresh(['options']);
            } catch (Exception $e) {
                Log::error('Failed to update question: ' . $e->getMessage(), [
                    'quiz_id' => $quiz->id,
                    'question_id' => $question->id,
                    'data' => $data,
                    'trace' => $e->getTraceAsString()
                ]);
                throw new Exception('Failed to update question', 0, $e);
            }
        });
    }

    /**
     * Delete a question.
     *
     * @param Quiz $quiz
     * @param Question $question
     * @return void
     * @throws Exception
     */
    public function deleteQuestion(Quiz $quiz, Question $question): void
    {
        try {
            Log::info('Deleting question', ['quiz_id' => $quiz->id, 'question_id' => $question->id]);
            $this->questionRepository->delete($question);
        } catch (Exception $e) {
            Log::error('Failed to delete question: ' . $e->getMessage(), [
                'quiz_id' => $quiz->id,
                'question_id' => $question->id,
                'trace' => $e->getTraceAsString()
            ]);
            throw new Exception('Failed to delete question', 0, $e);
        }
    }
}

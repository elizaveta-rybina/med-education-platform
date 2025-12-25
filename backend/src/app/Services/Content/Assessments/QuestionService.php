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

                $optionsData = $data['options'] ?? [];
                $metadataRaw = $data['metadata'] ?? null;

                unset($data['options']);

                // 1. Создаём вопрос
                $question = $this->questionRepository->create($quiz, $data);

                $createdOptions = null;

                // 2. Создаём опции
                if (!empty($optionsData)) {
                    $createdOptions = $this->questionOptionService->createMultipleOptions($quiz, $question, $optionsData);
                }

                // 3. Обработка table — старый и новый формат
                if ($metadataRaw && $question->question_type === 'table' && $createdOptions) {
                    $this->processTableMetadata($question, $metadataRaw, $createdOptions, $optionsData);
                }

                return $question->fresh(['options']);

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
                $metadataRaw = $data['metadata'] ?? null;

                unset($data['options']);

                // Обновляем вопрос
                $this->questionRepository->update($question, $data);

                // Синхронизируем опции
                $syncedOptions = null;
                if (!empty($options)) {
                    $syncedOptions = $this->questionOptionService->syncOptions($quiz, $question, $options);
                } else {
                    $question->options()->delete();
                }

                // Обработка table — если есть метаданные и опции
                if ($metadataRaw && $question->question_type === 'table' && ($syncedOptions || $question->options()->exists())) {
                    // Если опции были удалены — используем существующие
                    $currentOptions = $syncedOptions ?? $question->options()->get();
                    $this->processTableMetadata($question, $metadataRaw, $currentOptions, $options);
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
     * Общая обработка metadata для table — замена индексов на реальные ID опций
     */
    private function processTableMetadata(Question $question, $metadataRaw, $optionsCollection, array $originalOptionsData = []): void
    {
        $metadataArray = is_string($metadataRaw) ? json_decode($metadataRaw, true) : $metadataRaw;

        if (!is_array($metadataArray) || !isset($metadataArray['rows'])) {
            return;
        }

        // Создаём маппинг: индекс в исходном массиве options[] → реальный ID
        $indexToIdMap = [];
        foreach ($optionsCollection as $index => $option) {
            $indexToIdMap[$index] = $option->id;
        }

        foreach ($metadataArray['rows'] as &$row) {
            // Новый формат: correct_answers по ячейкам
            if (isset($row['correct_answers'])) {
                foreach ($row['correct_answers'] as $cellKey => &$indices) {
                    $realIds = [];
                    foreach ($indices as $index) {
                        if (isset($indexToIdMap[$index])) {
                            $realIds[] = $indexToIdMap[$index];
                        }
                    }
                    $indices = $realIds;
                }
            }

            // Старый формат: correct_option_ids на всю строку
            if (isset($row['correct_option_ids'])) {
                $realIds = [];
                foreach ($row['correct_option_ids'] as $index) {
                    if (isset($indexToIdMap[$index])) {
                        $realIds[] = $indexToIdMap[$index];
                    }
                }
                $row['correct_option_ids'] = $realIds;
            }

            // available_option_ids в ячейках (для per-cell вариантов)
            if (isset($row['cells'])) {
                foreach ($row['cells'] as &$cell) {
                    if (isset($cell['available_option_ids'])) {
                        $realIds = [];
                        foreach ($cell['available_option_ids'] as $index) {
                            if (isset($indexToIdMap[$index])) {
                                $realIds[] = $indexToIdMap[$index];
                            }
                        }
                        $cell['available_option_ids'] = $realIds;
                    }
                }
            }
        }

        $question->metadata = $metadataArray;
        $question->save();
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


<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\QuestionOption;
use App\Repositories\Contracts\QuestionOptionRepositoryInterface;
use App\Services\Contracts\QuestionOptionServiceInterface;
use Illuminate\Support\Facades\Log;
use Exception;

class QuestionOptionService implements QuestionOptionServiceInterface
{
    protected QuestionOptionRepositoryInterface $questionOptionRepository;

    public function __construct(QuestionOptionRepositoryInterface $questionOptionRepository)
    {
        $this->questionOptionRepository = $questionOptionRepository;
    }

    /**
     * Create multiple options for a question.
     *
     * @param Quiz $quiz
     * @param Question $question
     * @param array $optionsData
     * @return \Illuminate\Database\Eloquent\Collection
     * @throws Exception
     */
    public function createMultipleOptions(Quiz $quiz, Question $question, array $optionsData): \Illuminate\Database\Eloquent\Collection
    {
        if ($question->quiz_id !== $quiz->id) {
            throw new Exception('Question does not belong to this quiz', 404);
        }
        return \Illuminate\Support\Facades\DB::transaction(function () use ($question, $optionsData) {
            try {
                Log::info('Creating multiple options for question', ['question_id' => $question->id, 'options' => $optionsData]);
                $allowedFields = ['text', 'is_correct', 'matching_data', 'order'];
                $filteredOptions = array_map(function ($optionData) use ($allowedFields) {
                    return array_intersect_key($optionData, array_flip($allowedFields));
                }, $optionsData);
                $options = $question->options()->createMany($filteredOptions);
                Log::info('Multiple options created', ['question_id' => $question->id, 'option_ids' => $options->pluck('id')->toArray()]);
                return $options;
            } catch (Exception $e) {
                Log::error('Failed to create multiple options: ' . $e->getMessage(), [
                    'question_id' => $question->id,
                    'data' => $optionsData,
                    'trace' => $e->getTraceAsString()
                ]);
                throw new Exception('Failed to create multiple options', 0, $e);
            }
        });
    }

    /**
     * Sync options for a question (create, update, or delete).
     *
     * @param Quiz $quiz
     * @param Question $question
     * @param array $optionsData
     * @return \Illuminate\Database\Eloquent\Collection
     * @throws Exception
     */
    public function syncOptions(Quiz $quiz, Question $question, array $optionsData): \Illuminate\Database\Eloquent\Collection
    {
        if ($question->quiz_id !== $quiz->id) {
            throw new Exception('Question does not belong to this quiz', 404);
        }
        return \Illuminate\Support\Facades\DB::transaction(function () use ($question, $optionsData) {
            try {
                Log::info('Syncing options for question', ['question_id' => $question->id, 'options' => $optionsData]);

                $existingOptionIds = $question->options()->pluck('id')->toArray();
                $providedOptionIds = array_filter(array_column($optionsData, 'id'), fn($id) => !is_null($id));

                // Удаляем опции, которые не были переданы
                $optionsToDelete = array_diff($existingOptionIds, $providedOptionIds);
                if (!empty($optionsToDelete)) {
                    $question->options()->whereIn('id', $optionsToDelete)->delete();
                    Log::info('Deleted options from question', ['question_id' => $question->id, 'option_ids' => $optionsToDelete]);
                }

                // Создаем коллекцию Eloquent вместо Support Collection
                $options = new \Illuminate\Database\Eloquent\Collection();

                $allowedFields = ['text', 'is_correct', 'matching_data', 'order'];
                foreach ($optionsData as $optionData) {
                    $filteredData = array_intersect_key($optionData, array_flip($allowedFields));
                    if (isset($optionData['id']) && in_array($optionData['id'], $existingOptionIds)) {
                        $option = $question->options()->find($optionData['id']);
                        if ($option) {
                            $option->update($filteredData);
                            $options->push($option->fresh());
                        }
                    } else {
                        $options->push($question->options()->create($filteredData));
                    }
                }

                Log::info('Options synced for question', ['question_id' => $question->id, 'option_ids' => $options->pluck('id')->toArray()]);
                return $options;
            } catch (Exception $e) {
                Log::error('Failed to sync options: ' . $e->getMessage(), [
                    'question_id' => $question->id,
                    'data' => $optionsData,
                    'trace' => $e->getTraceAsString()
                ]);
                throw new Exception('Failed to sync options', 0, $e);
            }
        });
    }}

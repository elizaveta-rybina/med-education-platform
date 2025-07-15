<?php

namespace App\Repositories;

use App\Models\Content\Assessments\Answer;
use App\Models\Content\Assessments\ChoiceAnswer;
use App\Models\Content\Assessments\MatchingAnswer;
use App\Models\Content\Assessments\OrderingAnswer;
use App\Models\Content\Assessments\OpenSchemaAnswer;
use App\Models\Content\Assessments\MatchingSchemaAnswer;
use Illuminate\Support\Facades\Log;

class AnswerRepository
{
    public function create(array $data, int $questionId, string $questionType): ?Answer
    {
        try {
            $answerable = match ($questionType) {
                'single_choice', 'multiple_choice' => ChoiceAnswer::create([
                    'answer_text' => $data['text'],
                    'is_correct' => $data['is_correct'],
                ]),
                'matching' => MatchingAnswer::create([
                    'match_key' => $data['match_key'],
                    'match_value' => $data['match_value'],
                ]),
                'ordering' => OrderingAnswer::create([
                    'answer_text' => $data['answer_text'],
                    'correct_order' => $data['correct_order'],
                ]),
                'open_schema' => OpenSchemaAnswer::create([
                    'schema_data' => $data['schema_data'],
                    'description' => $data['description'] ?? null,
                ]),
                'matching_schema' => MatchingSchemaAnswer::create([
                    'match_key' => $data['match_key'],
                    'schema_value' => $data['schema_value'],
                ]),
                'open_answer', 'open_answer_reviewed' => null, // Нет ответа
                default => throw new \InvalidArgumentException("Unsupported question type: $questionType"),
            };

            if ($answerable) {
                $answer = Answer::create([
                    'question_id' => $questionId,
                    'answerable_id' => $answerable->id,
                    'answerable_type' => get_class($answerable),
                    'order' => $data['order'] ?? null,
                ]);
                Log::info('AnswerRepository: Answer created', ['question_id' => $questionId, 'answerable_type' => get_class($answerable)]);
                return $answer;
            }

            return null; // Для open_answer и open_answer_reviewed
        } catch (\Exception $e) {
            Log::error('AnswerRepository: Error in create method', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function deleteByQuestionId(int $questionId): void
    {
        $answers = Answer::where('question_id', $questionId)->get();
        foreach ($answers as $answer) {
            if ($answer->answerable) {
                $answer->answerable->delete();
            }
            $answer->delete();
        }
    }
}

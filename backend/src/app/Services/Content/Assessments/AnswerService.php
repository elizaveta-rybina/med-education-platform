<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Answer;
use App\Models\Content\Assessments\ChoiceAnswer;
use App\Models\Content\Assessments\MatchingAnswer;
use Illuminate\Support\Facades\DB;

class AnswerService
{
    public function create(array $answersData, int $questionId, string $questionType): array
    {
        $answers = [];
        DB::beginTransaction();

        try {
            foreach ($answersData as $data) {
                $answerable = $this->createAnswerable($data, $questionType);
                $answer = Answer::create([
                    'question_id' => $questionId,
                    'answerable_type' => get_class($answerable),
                    'answerable_id' => $answerable->id,
                    'order' => $data['order'] ?? null,
                ]);
                $answers[] = $answer;
            }

            DB::commit();
            return $answers;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    protected function createAnswerable(array $data, string $questionType)
    {
        return match ($questionType) {
            'single_choice', 'multiple_choice' => ChoiceAnswer::create([
                'answer_text' => $data['answer_text'],
                'is_correct' => $data['is_correct'] ?? false,
            ]),
            'matching', 'matching_schema' => MatchingAnswer::create([
                'match_key' => $data['match_key'],
                'match_value' => $data['match_value'],
            ]),
            default => throw new \InvalidArgumentException("Unsupported question type: $questionType"),
        };
    }

    public function update(array $answersData, int $questionId, string $questionType): array
    {
        DB::beginTransaction();

        try {
            Answer::where('question_id', $questionId)->delete();
            $answers = $this->create($answersData, $questionId, $questionType);
            DB::commit();
            return $answers;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete(int $questionId): void
    {
        DB::beginTransaction();

        try {
            Answer::where('question_id', $questionId)->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}

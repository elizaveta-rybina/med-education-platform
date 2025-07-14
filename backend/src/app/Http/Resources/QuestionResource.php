<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'quiz_id' => $this->quiz_id,
            'question_text' => $this->question_text,
            'question_type' => $this->question_type,
            'points' => $this->points,
            'order_number' => $this->order_number,
            'explanation' => $this->explanation,
            'answers' => $this->answers->map(fn($answer) => [
                'id' => $answer->id,
                'order' => $answer->order,
                'data' => $this->getAnswerableData($answer->answerable),
            ]),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    protected function getAnswerableData($answerable)
    {
        return match (true) {
            $answerable instanceof \App\Models\Content\Assessments\ChoiceAnswer => [
                'type' => 'choice',
                'answer_text' => $answerable->answer_text,
                'is_correct' => $answerable->is_correct,
            ],
            $answerable instanceof \App\Models\Content\Assessments\MatchingAnswer => [
                'type' => 'matching',
                'match_key' => $answerable->match_key,
                'match_value' => $answerable->match_value,
            ],
            default => [],
        };
    }
}

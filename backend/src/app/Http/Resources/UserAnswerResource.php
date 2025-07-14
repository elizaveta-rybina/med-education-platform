<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserAnswerResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'quiz_attempt_id' => $this->quiz_attempt_id,
            'question_id' => $this->question_id,
            'score' => $this->score,
            'data' => $this->getUserAnswerableData($this->user_answerable),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    protected function getUserAnswerableData($userAnswerable)
    {
        return match (true) {
            $userAnswerable instanceof \App\Models\Content\Assessments\UserChoiceAnswer => [
                'type' => 'choice',
                'choice_answer_id' => $userAnswerable->choice_answer_id,
            ],
            $userAnswerable instanceof \App\Models\Content\Assessments\UserTextAnswer => [
                'type' => 'text',
                'answer_text' => $userAnswerable->answer_text,
            ],
            $userAnswerable instanceof \App\Models\Content\Assessments\UserMatchingAnswer => [
                'type' => 'matching',
                'matching_answer_id' => $userAnswerable->matching_answer_id,
                'user_match_value' => $userAnswerable->user_match_value,
            ],
            default => [],
        };
    }
}

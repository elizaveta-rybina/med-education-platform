<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentQuizResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'quiz_type' => $this->quiz_type,
            'max_attempts' => $this->max_attempts,
            'time_limit_minutes' => $this->time_limit_minutes,
            'entity_type' => $this->quizable_type,
            'quizable_id' => $this->quizable_id,
            'quizable' => $this->whenLoaded('quizable', fn() => [
                'id' => $this->quizable->id,
                'name' => $this->quizable->name ?? $this->quizable->title,
            ]),
            'questions' => StudentQuestionResource::collection($this->whenLoaded('questions')),
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}

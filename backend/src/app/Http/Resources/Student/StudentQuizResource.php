<?php

namespace App\Http\Resources\Student;

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
            'passing_score' => $this->passing_score,
            'time_limit_minutes' => $this->time_limit_minutes,
            'file_name' => $this->file_name,
            'game_path' => $this->game_path,
            'questions_count' => $this->questions_count,
            'entity_type' => $this->entity_type,
            'quizable_id' => $this->quizable_id,
            'quizable' => $this->whenLoaded('quizable', function () {
                $quizable = $this->quizable;
                if ($quizable) {
                    return [
                        'id' => $quizable->id,
                        'name' => $quizable->name ?? $quizable->title ?? null,
                    ];
                }
                return null;
            }),
            'questions' => StudentQuestionResource::collection($this->whenLoaded('questions')),
        ];
    }
}

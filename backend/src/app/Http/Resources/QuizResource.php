<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuizResource extends JsonResource
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
            'questions_count' => $this->questions_count,
            'time_limit_minutes' => $this->time_limit_minutes,
            'time_limit_seconds' => $this->time_limit_seconds,
            'entity_type' => $this->quizable_type, // возвращаем как entity_type
            'quizable_id' => $this->quizable_id,
            'file_name' => $this->file_name,
            'game_path' => $this->game_path,
            'quizable' => $this->whenLoaded('quizable', fn() => [
                'id' => $this->quizable->id,
                'name' => $this->quizable->name ?? $this->quizable->title, // адаптируйте под вашу модель
            ]),
            'questions' => QuestionResource::collection($this->whenLoaded('questions')),
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}

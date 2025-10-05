<?php

namespace App\Http\Resources\Student;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentQuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $metadata = $this->metadata;
        if ($this->question_type === 'matching' && isset($metadata['pairs'])) {
            $metadata['pairs'] = array_map(fn($pair) => [$pair[0], ''], $metadata['pairs']); // Скрываем вторую часть пары
        }
        if ($this->question_type === 'table' && isset($metadata['rows'])) {
            $metadata['rows'] = array_map(function ($row) {
                unset($row['correct_option_ids']);
                return $row;
            }, $metadata['rows']);
        }

        return [
            'id' => $this->id,
            'quiz_id' => $this->quiz_id,
            'text' => $this->text,
            'question_type' => $this->question_type,
            'metadata' => $metadata,
            'points' => $this->points,
            'options' => StudentQuestionOptionResource::collection($this->whenLoaded('options')),
        ];
    }
}

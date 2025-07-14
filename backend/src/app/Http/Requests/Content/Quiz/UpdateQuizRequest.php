<?php

namespace App\Http\Requests\Content\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQuizRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'quiz_type' => 'sometimes|string|in:topic_final,module_final,embedded,additional',
            'max_attempts' => 'nullable|integer',
            'passing_score' => 'nullable|integer',
            'time_limit_minutes' => 'nullable|integer',
            'questions_count' => 'nullable|integer',
            'parent_type' => 'sometimes|string|in:topic,module,assignment,lecture',
            'parent_id' => 'sometimes|integer',
            'questions' => 'nullable|array',
        ];
    }
}

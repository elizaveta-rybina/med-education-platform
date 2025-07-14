<?php

namespace App\Http\Requests\Content\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuizRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Или проверка на роль admin
    }

    public function rules()
    {
        return [
            'parent_type' => 'required|in:topic,module,assignment,lecture',
            'parent_id' => 'required|integer|min:1',
            'title' => 'required|string|max:255',
            'quiz_type' => 'required|string',
            'max_attempts' => 'required|integer|min:1',
            'passing_score' => 'required|integer|min:0|max:100',
            'description' => 'nullable|string',
            'time_limit_minutes' => 'nullable|integer|min:1',
            'questions_count' => 'nullable|integer|min:0',
        ];
    }
}

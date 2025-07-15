<?php

namespace App\Http\Requests\Content\Question;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQuestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'question_text' => 'sometimes|string',
            'question_type' => 'sometimes|string|in:single_choice,multiple_choice,open_answer,open_schema,matching_schema',
            'points' => 'nullable|integer|min:1',
            'order_number' => 'nullable|integer|min:1',
            'explanation' => 'nullable|string',
            'answers' => 'nullable|array',
        ];
    }
}

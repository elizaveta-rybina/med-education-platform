<?php

namespace App\Http\Requests\Content\Question;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'question_text' => 'required|string',
            'question_type' => 'required|string|in:single_choice,multiple_choice,open_text,open_schema,matching_schema',
            'points' => 'nullable|integer|min:1',
            'order_number' => 'nullable|integer|min:1',
            'explanation' => 'nullable|string',
            'answers' => 'nullable|array',
        ];
    }
}

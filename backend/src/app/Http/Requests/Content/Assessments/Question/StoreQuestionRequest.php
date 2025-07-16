<?php

namespace App\Http\Requests\Content\Assessments\Question;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

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

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        Log::error('StoreQuestionRequest: Validation failed', [
            'errors' => $validator->errors()->toArray(),
            'request' => $this->all(),
        ]);
        throw new ValidationException($validator, response()->json([
            'errors' => $validator->errors(),
        ], 422));
    }
}

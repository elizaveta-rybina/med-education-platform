<?php

namespace App\Http\Requests\Content\Assessments\Quiz;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class StoreQuizRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quiz_type' => 'required|string|in:standard,adaptive,topic_final',
            'max_attempts' => 'required|integer|min:1',
            'passing_score' => 'required|integer|min:0|max:100',
            'time_limit_minutes' => 'nullable|integer|min:1',
            'questions_count' => 'nullable|integer|min:0',
            'parent_type' => 'required|string|in:topic,module,assignment,lecture',
            'parent_id' => 'required|integer|min:1',
            'questions' => 'nullable|array',
            'questions.*.question_text' => 'required|string',
            'questions.*.question_type' => 'required|string|in:single_choice,multiple_choice,open_answer,open_answer_reviewed,matching,ordering,open_schema,matching_schema',
            'questions.*.points' => 'nullable|integer|min:1',
            'questions.*.order_number' => 'nullable|integer|min:1',
            'questions.*.explanation' => 'nullable|string',
            'questions.*.answers' => 'nullable|array',
            // Для single_choice и multiple_choice
            'questions.*.answers.*.text' => 'required_if:questions.*.question_type,single_choice,multiple_choice|string',
            'questions.*.answers.*.is_correct' => 'required_if:questions.*.question_type,single_choice,multiple_choice|boolean',
            // Для matching
            'questions.*.answers.*.match_key' => 'required_if:questions.*.question_type,matching|string',
            'questions.*.answers.*.match_value' => 'required_if:questions.*.question_type,matching|string',
            // Для ordering
            'questions.*.answers.*.answer_text' => 'required_if:questions.*.question_type,ordering|string',
            'questions.*.answers.*.correct_order' => 'required_if:questions.*.question_type,ordering|integer|min:1',
            // Для open_schema
            'questions.*.answers.*.schema_data' => 'required_if:questions.*.question_type,open_schema|json',
            'questions.*.answers.*.description' => 'nullable|string',
            // Для matching_schema
            'questions.*.answers.*.schema_value' => 'required_if:questions.*.question_type,matching_schema|json',
            // Поле order для всех типов, где нужен порядок
            'questions.*.answers.*.order' => 'nullable|integer|min:1',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        Log::error('StoreQuizRequest: Validation failed', [
            'errors' => $validator->errors()->toArray(),
            'request' => $this->all(),
        ]);
        throw new ValidationException($validator, response()->json([
            'errors' => $validator->errors(),
        ], 422));
    }
}

<?php

namespace App\Http\Requests\Content\Assessments\UserAnswer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class UserAnswerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'quiz_attempt_id' => 'required|exists:quiz_attempts,id',
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.question_type' => 'required|string|in:single_choice,multiple_choice,open_answer,open_answer_reviewed,matching,ordering,open_schema,matching_schema',
            // single_choice: один choice_answer_id
            'answers.*.choice_answer_id' => 'required_if:answers.*.question_type,single_choice|exists:choice_answers,id',
            // multiple_choice: массив choice_answer_id
            'answers.*.choice_answer_ids' => 'required_if:answers.*.question_type,multiple_choice|array',
            'answers.*.choice_answer_ids.*' => 'exists:choice_answers,id',
            // open_answer и open_answer_reviewed: текст
            'answers.*.answer_text' => 'required_if:answers.*.question_type,open_answer,open_answer_reviewed|string',
            // matching: массив пар {matching_answer_id, user_match_value}
            'answers.*.matching_answers' => 'required_if:answers.*.question_type,matching|array',
            'answers.*.matching_answers.*.matching_answer_id' => 'required|exists:matching_answers,id',
            'answers.*.matching_answers.*.user_match_value' => 'required|string',
            // ordering: массив пар {ordering_answer_id, user_order}
            'answers.*.ordering_answers' => 'required_if:answers.*.question_type,ordering|array',
            'answers.*.ordering_answers.*.ordering_answer_id' => 'required|exists:ordering_answers,id',
            'answers.*.ordering_answers.*.user_order' => 'required|integer|min:1',
            // open_schema: JSON-схема
            'answers.*.user_schema_data' => 'required_if:answers.*.question_type,open_schema|json',
            // matching_schema: массив пар {matching_schema_answer_id, user_schema_value}
            'answers.*.matching_schema_answers' => 'required_if:answers.*.question_type,matching_schema|array',
            'answers.*.matching_schema_answers.*.matching_schema_answer_id' => 'required|exists:matching_schema_answers,id',
            'answers.*.matching_schema_answers.*.user_schema_value' => 'required|json',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        Log::error('UserAnswerRequest: Validation failed', [
            'errors' => $validator->errors()->toArray(),
            'request' => $this->all(),
        ]);
        throw new ValidationException($validator, response()->json([
            'errors' => $validator->errors(),
        ], 422));
    }
}

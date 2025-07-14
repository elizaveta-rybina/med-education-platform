<?php

namespace App\Http\Requests\Content\Answer;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserAnswerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'question_type' => 'required|string|in:single_choice,multiple_choice,open_answer,open_schema,matching,matching_schema',
            'answers' => 'required|array',
            'answers.*.choice_answer_id' => 'required_if:question_type,single_choice,multiple_choice|exists:choice_answers,id',
            'answers.*.answer_text' => 'required_if:question_type,open_answer,open_schema|string',
            'answers.*.matching_answer_id' => 'required_if:question_type,matching,matching_schema|exists:matching_answers,id',
            'answers.*.user_match_value' => 'required_if:question_type,matching,matching_schema|string',
            'answers.*.score' => 'nullable|integer|min:0',
        ];
    }
}

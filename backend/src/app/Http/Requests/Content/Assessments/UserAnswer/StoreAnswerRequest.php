<?php

namespace App\Http\Requests\Content\Assessments\UserAnswer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreAnswerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'question_id' => ['required', 'integer', 'exists:questions,id'],
            'answer' => ['required', 'array'],
            'answer.*.row' => ['required', 'integer', 'min:0'],
            'answer.*.option_ids' => ['required', 'array'],
            'answer.*.option_ids.*' => ['integer', 'exists:question_options,id'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'question_id.required' => 'The question ID is required.',
            'question_id.exists' => 'The question does not exist.',
            'answer.required' => 'The answer is required.',
            'answer.*.row.required' => 'Each answer must specify a row index.',
            'answer.*.option_ids.required' => 'Each row must have selected option IDs.',
            'answer.*.option_ids.*.exists' => 'One or more option IDs are invalid.',
        ];
    }
}

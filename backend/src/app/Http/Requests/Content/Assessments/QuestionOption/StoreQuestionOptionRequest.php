<?php

namespace App\Http\Requests\Content\Assessments\QuestionOption;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreQuestionOptionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;

        //return Auth::user()->hasPermissionTo('edit quizzes');
        // после настройки Spatie Permission

    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'text' => ['required', 'string'],
            'is_correct' => ['boolean'],
            'matching_data' => ['nullable', 'json'],
            'order' => ['required', 'integer', 'min:0'],
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
            'text.required' => 'The option text is required.',
            'order.min' => 'The order must be at least 0.',
        ];
    }
}

<?php

namespace App\Http\Requests\Content\Assessments\Question;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreQuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true; // или Auth::user()->hasPermissionTo('edit quizzes') после настройки Spatie
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $questionTypes = ['single_choice', 'multiple_choice', 'text_input', 'matching', 'ordering', 'table'];

        return [
            'text' => ['required', 'string'],
            'question_type' => ['required', Rule::in($questionTypes)],
            'metadata' => [
                'nullable',
                'json',
                function ($attribute, $value, $fail) use ($questionTypes) {
                    if ($this->input('question_type') === 'matching' && !empty($value)) {
                        $decoded = json_decode($value, true);
                        if (json_last_error() !== JSON_ERROR_NONE || !is_array($decoded) || !isset($decoded['pairs'])) {
                            $fail('The metadata for matching questions must be valid JSON with a "pairs" key.');
                        } else {
                            $options = $this->input('options', []);
                            $pairCount = count($decoded['pairs']);
                            $optionCount = count($options);
                            if ($pairCount > $optionCount) {
                                $fail('The number of pairs in metadata must not exceed the number of options for matching questions.');
                            }
                        }
                    }
                    if ($this->input('question_type') === 'table' && !empty($value)) {
                        $decoded = json_decode($value, true);
                        if (json_last_error() !== JSON_ERROR_NONE || !isset($decoded['rows']) || !isset($decoded['columns'])) {
                            $fail('The metadata for table questions must be valid JSON with rows and columns.');
                        }
                    }
                },
            ],
            'is_auto_graded' => ['boolean'],
            'points' => ['required', 'integer', 'min:1'],
            'options' => [
                'nullable',
                'array',
                'required_if:question_type,single_choice,multiple_choice,matching,ordering',
                function ($attribute, $value, $fail) {
                    if (!is_array($value)) {
                        return;
                    }
                    $type = $this->input('question_type');
                    if ($type === 'single_choice') {
                        $correctCount = array_sum(array_column($value, 'is_correct'));
                        if ($correctCount !== 1) {
                            $fail('For single_choice questions, exactly one option must be marked as correct.');
                        }
                    }
                    if ($type === 'multiple_choice') {
                        $correctCount = array_sum(array_column($value, 'is_correct'));
                        if ($correctCount < 1) {
                            $fail('For multiple_choice questions, at least one option must be marked as correct.');
                        }
                    }
                    if ($type === 'text_input' && !empty($value)) {
                        $fail('Text input questions should not have options.');
                    }
                },
            ],
            'options.*.text' => ['required_if:question_type,single_choice,multiple_choice,matching,ordering', 'string'],
            'options.*.is_correct' => ['required_if:question_type,single_choice,multiple_choice', 'boolean'],
            'options.*.matching_data' => ['nullable', 'required_if:question_type,matching', 'json'],
            'options.*.order' => ['required_if:question_type,ordering', 'integer', 'min:0'],
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
            'text.required' => 'The question text is required.',
            'question_type.in' => 'The question type must be one of: single_choice, multiple_choice, text_input, matching, ordering, table.',
            'points.min' => 'The points must be at least 1.',
            'options.required_if' => 'Options are required for single_choice, multiple_choice, matching, or ordering questions.',
            'options.*.text.required_if' => 'Each option must have text for single_choice, multiple_choice, matching, or ordering questions.',
            'options.*.is_correct.required_if' => 'Each option must specify if it is correct for single_choice or multiple_choice questions.',
            'options.*.matching_data.required_if' => 'Each option must have matching data for matching questions.',
            'options.*.order.required_if' => 'Each option must have an order for ordering questions.',
        ];
    }
}

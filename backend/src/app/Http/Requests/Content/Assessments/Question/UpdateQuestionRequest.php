<?php

namespace App\Http\Requests\Content\Assessments\Question;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateQuestionRequest extends FormRequest
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
                function ($attribute, $value, $fail) use ($questionTypes) {
                    $questionType = $this->input('question_type');

                    // Если metadata пустое или null, пропускаем, если не требуется
                    if (empty($value) && !in_array($questionType, ['matching', 'table'])) {
                        return;
                    }

                    // Ожидаем, что metadata — это массив (декодированный JSON)
                    if (!is_array($value)) {
                        $fail('The metadata must be a valid JSON object or array.');
                        return;
                    }

                    if ($questionType === 'matching') {
                        if (!isset($value['pairs']) || !is_array($value['pairs'])) {
                            $fail('The metadata for matching questions must contain a "pairs" key with an array.');
                        } else {
                            foreach ($value['pairs'] as $pair) {
                                if (!is_array($pair) || count($pair) !== 2 || !is_string($pair[0]) || !is_string($pair[1])) {
                                    $fail('Each pair in matching question metadata must be an array of two strings.');
                                }
                            }
                            $options = $this->input('options', []);
                            $matchingData = array_filter(array_column($options, 'matching_data'), fn($data) => !is_null($data));
                            $pairKeys = array_column($value['pairs'], 0);
                            foreach ($matchingData as $data) {
                                if (!in_array($data, $pairKeys)) {
                                    $fail("Matching data '{$data}' in options must match a pair key in metadata.");
                                }
                            }
                        }
                    }

                    if ($questionType === 'table') {
                        if (!isset($value['rows']) || !is_array($value['rows']) || !isset($value['columns']) || !is_array($value['columns'])) {
                            $fail('The metadata for table questions must contain "rows" and "columns" arrays.');
                        } else {
                            $options = $this->input('options', []);
                            $optionIds = array_column($options, 'order');
                            foreach ($value['rows'] as $rowIndex => $row) {
                                if (!isset($row['cells']) || !is_array($row['cells'])) {
                                    $fail("Row {$rowIndex} in table question must have a 'cells' array.");
                                }
                                if (!isset($row['correct_option_ids'])) {
                                    $fail("Row {$rowIndex} in table question must have 'correct_option_ids'.");
                                } elseif (!empty($row['correct_option_ids'])) {
                                    foreach ($row['correct_option_ids'] as $id) {
                                        if (!in_array($id, $optionIds)) {
                                            $fail("Invalid correct_option_id {$id} in row {$rowIndex} of table question.");
                                        }
                                    }
                                }
                            }
                            foreach ($value['columns'] as $columnIndex => $column) {
                                if (!isset($column['name']) || !isset($column['type'])) {
                                    $fail("Column {$columnIndex} in table question must have 'name' and 'type'.");
                                }
                            }
                        }
                    }
                },
            ],
            'is_auto_graded' => ['boolean'],
            'points' => ['required', 'integer', 'min:1'],
            'options' => [
                'nullable',
                'array',
                function ($attribute, $value, $fail) use ($questionTypes) {
                    $type = $this->input('question_type');
                    if (in_array($type, ['single_choice', 'multiple_choice', 'matching', 'ordering', 'table']) && empty($value)) {
                        $fail("Options are required for {$type} questions.");
                    }
                    if ($type === 'single_choice' && is_array($value)) {
                        $correctCount = array_sum(array_column($value, 'is_correct'));
                        if ($correctCount !== 1) {
                            $fail('For single_choice questions, exactly one option must be marked as correct.');
                        }
                    }
                    if ($type === 'multiple_choice' && is_array($value)) {
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
            'options.*.id' => ['nullable', 'integer', 'exists:question_options,id'],
            'options.*.text' => ['required_if:question_type,single_choice,multiple_choice,matching,ordering,table', 'string'],
            'options.*.is_correct' => ['required_if:question_type,single_choice,multiple_choice', 'boolean'],
            'options.*.matching_data' => ['nullable', 'string'],
            'options.*.order' => ['required_if:question_type,ordering,table', 'integer', 'min:0'],
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        if ($this->has('metadata')) {
            $metadata = $this->input('metadata');
            if (is_string($metadata)) {
                // Декодируем строку JSON в массив
                $decoded = json_decode($metadata, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    $this->merge([
                        'metadata' => $decoded,
                    ]);
                }
            }
        }
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
            'options.required_if' => 'Options are required for single_choice, multiple_choice, matching, ordering, or table questions.',
            'options.*.id.exists' => 'The option ID does not exist.',
            'options.*.text.required_if' => 'Each option must have text for single_choice, multiple_choice, matching, ordering, or table questions.',
            'options.*.is_correct.required_if' => 'Each option must specify if it is correct for single_choice or multiple_choice questions.',
            'options.*.matching_data.string' => 'Each option for matching questions must have a string matching_data or be null.',
            'options.*.order.required_if' => 'Each option must have an order for ordering or table questions.',
        ];
    }
}

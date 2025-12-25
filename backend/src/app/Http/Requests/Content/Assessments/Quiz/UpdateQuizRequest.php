<?php

namespace App\Http\Requests\Content\Assessments\Quiz;

use App\Models\Content\Assignment;
use App\Models\Content\Lecture;
use App\Models\Content\Module;
use App\Models\Content\Topic;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateQuizRequest extends FormRequest
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
        $entityTypes = ['module', 'topic', 'lecture', 'assignment'];
        $questionTypes = ['single_choice', 'multiple_choice', 'text_input', 'matching', 'ordering', 'table', 'input_answer', 'free-input'];
        $quizTypes = ['topic_final', 'module_final', 'practice', 'additional', 'embedded', 'standard', 'table', 'interactive', 'input', 'free-input'];

        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'quiz_type' => ['required', Rule::in($quizTypes)],
            'max_attempts' => ['nullable', 'integer', 'min:1'],
            'passing_score' => ['nullable', 'integer', 'min:0', 'max:100'],
            'questions_count' => ['nullable', 'integer', 'min:0'],
            'time_limit_minutes' => ['nullable', 'integer', 'min:1'],
            'time_limit_seconds' => ['nullable', 'integer', 'min:1'],
            'file_name' => ['nullable', 'string', 'max:255'],
            'game_path' => ['nullable', 'string', 'max:512'],
            'entity_type' => ['required', Rule::in($entityTypes)],
            'quizable_id' => [
                'required',
                'integer',
                'min:1',
                function ($attribute, $value, $fail) {
                    $entityType = $this->input('entity_type');
                    $modelClass = match ($entityType) {
                        'module' => Module::class,
                        'topic' => Topic::class,
                        'lecture' => Lecture::class,
                        'assignment' => Assignment::class,
                        default => null,
                    };
                    if (!$modelClass || !class_exists($modelClass)) {
                        $fail("Invalid entity type: {$entityType}");
                    } else {
                        if (!$modelClass::find($value)) {
                            $fail("No {$entityType} found with ID {$value}");
                        }
                    }
                },
            ],
            'questions' => ['nullable', 'array'],
            'questions.*.text' => ['required', 'string'],
            'questions.*.question_type' => ['required', Rule::in($questionTypes)],
            'questions.*.metadata' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    $index = explode('.', $attribute)[1];
                    $questionType = $this->input("questions.{$index}.question_type");

                    // Если metadata пустое или null, пропускаем, если не требуется
                    if (empty($value) && !in_array($questionType, ['matching', 'table'])) {
                        return;
                    }

                    // Ожидаем, что metadata — это строка JSON
                    if (!is_string($value)) {
                        $fail('The metadata must be a valid JSON string.');
                        return;
                    }

                    $metadata = json_decode($value, true);

                    if ($metadata === null) {
                        $fail('The metadata must be valid JSON.');
                        return;
                    }

                    if ($questionType === 'table') {
                        if (!isset($metadata['rows']) || !is_array($metadata['rows']) || !isset($metadata['columns']) || !is_array($metadata['columns'])) {
                            $fail('The metadata for table questions must contain "rows" and "columns" arrays.');
                        } else {
                            $options = $this->input("questions.{$index}.options", []);
                            $optionIds = array_column($options, 'order');
                            foreach ($metadata['rows'] as $rowIndex => $row) {
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
                            foreach ($metadata['columns'] as $columnIndex => $column) {
                                if (!isset($column['name']) || !isset($column['type'])) {
                                    $fail("Column {$columnIndex} in table question must have 'name' and 'type'.");
                                }
                            }
                        }
                    }
                },
            ],
            'questions.*.is_auto_graded' => ['boolean'],
            'questions.*.points' => ['required', 'integer', 'min:1'],
            'questions.*.max_length' => ['nullable', 'integer', 'min:1'],
            'questions.*.placeholder' => ['nullable', 'string', 'max:255'],
            'questions.*.options' => [
                'nullable',
                'array',
                function ($attribute, $value, $fail) {
                    $index = explode('.', $attribute)[1];
                    $type = $this->input("questions.{$index}.question_type");
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
            'questions.*.options.*.text' => ['required_if:questions.*.question_type,single_choice,multiple_choice,matching,ordering,table', 'string'],
            'questions.*.options.*.is_correct' => ['required_if:questions.*.question_type,single_choice,multiple_choice', 'boolean'],
            'questions.*.options.*.matching_data' => ['nullable', 'string'],
            'questions.*.options.*.order' => ['required_if:questions.*.question_type,ordering,table', 'integer', 'min:0'],
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        if ($this->has('entity_type')) {
            $entityType = $this->input('entity_type');
            $quizableType = match ($entityType) {
                'module' => 'module',
                'topic' => 'topic',
                'lecture' => 'lecture',
                'assignment' => 'assignment',
                default => null,
            };
            if ($quizableType) {
                $this->merge(['quizable_type' => $quizableType]);
            }
        }

        if ($this->has('questions')) {
            $questions = $this->input('questions', []);
            foreach ($questions as $index => $question) {
                if (isset($question['metadata']) && is_array($question['metadata'])) {
                    $this->merge([
                        "questions.{$index}.metadata" => json_encode($question['metadata']),
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
            'title.required' => 'The quiz title is required.',
            'quiz_type.in' => 'The quiz type must be one of: topic_final, module_final, practice, additional, embedded.',
            'entity_type.in' => 'The entity type must be one of: module, topic, lecture, assignment.',
            'quizable_id.required' => 'The quizable ID is required.',
            'questions.*.text.required' => 'Each question must have text.',
            'questions.*.question_type.in' => 'The question type must be one of: single_choice, multiple_choice, text_input, matching, ordering, table.',
            'questions.*.points.min' => 'The points for each question must be at least 1.',
            'questions.*.options.*.matching_data.string' => 'Each option for matching questions must have a string matching_data or be null.',
        ];
    }
}

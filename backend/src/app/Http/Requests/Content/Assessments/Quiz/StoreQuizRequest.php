<?php

namespace App\Http\Requests\Content\Assessments\Quiz;

use App\Models\Content\Assignment;
use App\Models\Content\Lecture;
use App\Models\Content\Module;
use App\Models\Content\Topic;
use App\Models\Content\Assessments\Quiz;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreQuizRequest extends FormRequest
{
    private const ENTITY_TYPES = ['module', 'topic', 'lecture', 'assignment'];
    private const QUIZ_TYPES = ['topic_final', 'additional', 'embedded', 'module_final'];
    private const QUESTION_TYPES = [
        'single_choice' => [
            'requires_options' => true,
            'requires_correct' => true,
            'correct_count' => 1,
            'metadata_required' => false,
        ],
        'multiple_choice' => [
            'requires_options' => true,
            'requires_correct' => true,
            'correct_count' => 'min:1',
            'metadata_required' => false,
        ],
        'text_input' => [
            'requires_options' => false,
            'requires_correct' => false,
            'metadata_required' => false,
        ],
        'matching' => [
            'requires_options' => true,
            'requires_correct' => false,
            'metadata_required' => true,
            'metadata_validator' => 'validateMatchingMetadata',
        ],
        'ordering' => [
            'requires_options' => true,
            'requires_correct' => false,
            'metadata_required' => false,
        ],
        'table' => [
            'requires_options' => true,
            'requires_correct' => false,
            'metadata_required' => true,
            'metadata_validator' => 'validateTableMetadata',
        ],
    ];

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'quiz_type' => ['required', Rule::in(self::QUIZ_TYPES)],
            'max_attempts' => ['nullable', 'integer', 'min:1'],
            'passing_score' => ['nullable', 'integer', 'min:0', 'max:100'],
            'time_limit_minutes' => ['nullable', 'integer', 'min:1'],
            'file_name' => ['nullable', 'string', 'max:255'],
            'game_path' => ['nullable', 'string', 'max:512'],
            'entity_type' => ['required', Rule::in(self::ENTITY_TYPES), $this->validateQuizTypeEntityCompatibility()],
            'quizable_id' => [
                'required',
                'integer',
                'min:1',
                $this->validateQuizableId(),
                $this->validateUniqueFinalQuiz(),
            ],
            'questions' => ['nullable', 'array'],
            'questions.*.text' => ['required', 'string'],
            'questions.*.question_type' => ['required', Rule::in(array_keys(self::QUESTION_TYPES))],
            'questions.*.metadata' => ['nullable', $this->validateMetadata()],
            'questions.*.is_auto_graded' => ['boolean'],
            'questions.*.points' => ['required', 'integer', 'min:1'],
            'questions.*.options' => ['nullable', 'array', $this->validateOptions()],
            'questions.*.options.*.text' => ['required_if:questions.*.question_type,' . implode(',', array_keys(array_filter(self::QUESTION_TYPES, fn($type) => $type['requires_options']))), 'string'],
            'questions.*.options.*.is_correct' => ['required_if:questions.*.question_type,' . implode(',', array_keys(array_filter(self::QUESTION_TYPES, fn($type) => $type['requires_correct']))), 'boolean'],
            'questions.*.options.*.matching_data' => ['nullable', 'string'],
            'questions.*.options.*.order' => ['required_if:questions.*.question_type,' . implode(',', array_keys(array_filter(self::QUESTION_TYPES, fn($type) => in_array($type['question_type'] ?? '', ['ordering', 'table'])))), 'integer', 'min:0'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('entity_type')) {
            $this->merge(['quizable_type' => $this->input('entity_type')]);
        }

        if ($this->has('questions')) {
            foreach ($this->input('questions', []) as $index => $question) {
                if (isset($question['metadata']) && is_array($question['metadata'])) {
                    $this->merge([
                        "questions.{$index}.metadata" => json_encode($question['metadata']),
                    ]);
                }
            }
        }
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Название теста обязательно.',
            'quiz_type.in' => 'Тип теста должен быть одним из: ' . implode(', ', self::QUIZ_TYPES) . '.',
            'entity_type.in' => 'Тип сущности должен быть одним из: ' . implode(', ', self::ENTITY_TYPES) . '.',
            'entity_type.quiz_type_entity_compatibility' => 'Тип теста :input несовместим с типом сущности.',
            'quizable_id.required' => 'ID сущности обязателен.',
            'quizable_id.unique_final_quiz' => 'Для указанного модуля или темы уже существует финальный тест.',
            'questions.*.text.required' => 'Текст вопроса обязателен.',
            'questions.*.question_type.in' => 'Тип вопроса должен быть одним из: ' . implode(', ', array_keys(self::QUESTION_TYPES)) . '.',
            'questions.*.points.min' => 'Баллы за вопрос должны быть не менее 1.',
        ];
    }

    private function validateQuizTypeEntityCompatibility(): callable
    {
        return function ($attribute, $value, $fail) {
            $quizType = $this->input('quiz_type');
            if ($quizType === 'topic_final' && $value !== 'topic') {
                $fail('Тест типа topic_final может быть прикреплен только к теме.');
            } elseif ($quizType === 'module_final' && $value !== 'module') {
                $fail('Тест типа module_final может быть прикреплен только к модулю.');
            }
        };
    }

    private function validateQuizableId(): callable
    {
        return function ($attribute, $value, $fail) {
            $entityType = $this->input('entity_type');
            $modelClass = match ($entityType) {
                'module' => Module::class,
                'topic' => Topic::class,
                'lecture' => Lecture::class,
                'assignment' => Assignment::class,
                default => null,
            };

            if (!$modelClass || !class_exists($modelClass)) {
                $fail("Недопустимый тип сущности: {$entityType}");
            } elseif (!$modelClass::find($value)) {
                $fail("Сущность типа {$entityType} с ID {$value} не найдена");
            }
        };
    }

    private function validateUniqueFinalQuiz(): callable
    {
        return function ($attribute, $value, $fail) {
            $quizType = $this->input('quiz_type');
            $entityType = $this->input('entity_type');

            if (in_array($quizType, ['module_final', 'topic_final']) && in_array($entityType, ['module', 'topic'])) {
                $modelClass = $entityType === 'module' ? Module::class : Topic::class;
                $exists = Quiz::where('quizable_type', $modelClass)
                    ->where('quizable_id', $value)
                    ->where('quiz_type', $quizType)
                    ->exists();

                if ($exists) {
                    $fail("Для указанного {$entityType} уже существует {$quizType} тест.");
                }
            }
        };
    }

    private function validateMetadata(): callable
    {
        return function ($attribute, $value, $fail) {
            $index = explode('.', $attribute)[1];
            $questionType = $this->input("questions.{$index}.question_type");
            $typeConfig = self::QUESTION_TYPES[$questionType] ?? [];

            if (!$typeConfig['metadata_required'] && empty($value)) {
                return;
            }

            $metadata = is_string($value) ? json_decode($value, true) : $value;

            if ($metadata === null) {
                $fail('Метаданные должны быть валидным JSON.');
                return;
            }

            if (!is_array($metadata)) {
                $fail('Метаданные должны быть массивом.');
                return;
            }

            if ($typeConfig['metadata_required'] && isset($typeConfig['metadata_validator'])) {
                $validatorMethod = $typeConfig['metadata_validator'];
                $this->$validatorMethod($metadata, $index, $fail);
            }
        };
    }

    private function validateMatchingMetadata(array $metadata, $index, callable $fail): void
    {
        if (!isset($metadata['pairs']) || !is_array($metadata['pairs'])) {
            $fail('Метаданные для matching должны содержать массив "pairs".');
            return;
        }

        foreach ($metadata['pairs'] as $pair) {
            if (!is_array($pair) || count($pair) !== 2 || !is_string($pair[0]) || !is_string($pair[1])) {
                $fail('Каждая пара в метаданных matching должна быть массивом из двух строк.');
            }
        }

        $options = $this->input("questions.{$index}.options", []);
        $pairKeys = array_column($metadata['pairs'], 0);
        foreach (array_column($options, 'matching_data') as $data) {
            if ($data && !in_array($data, $pairKeys)) {
                $fail("Данные соответствия '{$data}' должны быть ключом пары в метаданных.");
            }
        }
    }

    private function validateTableMetadata(array $metadata, $index, callable $fail): void
    {
        if (!isset($metadata['rows']) || !is_array($metadata['rows']) || !isset($metadata['columns']) || !is_array($metadata['columns'])) {
            $fail('Метаданные для table должны содержать массивы "rows" и "columns".');
            return;
        }

        $options = $this->input("questions.{$index}.options", []);
        $optionIds = array_column($options, 'order');

        foreach ($metadata['rows'] as $rowIndex => $row) {
            if (!isset($row['cells']) || !is_array($row['cells']) || !isset($row['correct_option_ids'])) {
                $fail("Строка {$rowIndex} в table должна содержать 'cells' и 'correct_option_ids'.");
                return;
            }
            foreach ($row['correct_option_ids'] ?? [] as $id) {
                if (!in_array($id, $optionIds)) {
                    $fail("Недопустимый correct_option_id {$id} в строке {$rowIndex} table.");
                }
            }
        }

        foreach ($metadata['columns'] as $columnIndex => $column) {
            if (!isset($column['name']) || !isset($column['type'])) {
                $fail("Столбец {$columnIndex} в table должен содержать 'name' и 'type'.");
            }
        }
    }

    private function validateOptions(): callable
    {
        return function ($attribute, $value, $fail) {
            $index = explode('.', $attribute)[1];
            $type = $this->input("questions.{$index}.question_type");
            $typeConfig = self::QUESTION_TYPES[$type] ?? [];

            if ($typeConfig['requires_options'] && empty($value)) {
                $fail("Опции обязательны для вопросов типа {$type}.");
            }

            if (!$typeConfig['requires_options'] && !empty($value)) {
                $fail("Вопросы типа {$type} не должны содержать опции.");
            }

            if ($typeConfig['requires_correct'] && is_array($value)) {
                $correctCount = array_sum(array_column($value, 'is_correct'));
                if (is_numeric($typeConfig['correct_count']) && $correctCount !== $typeConfig['correct_count']) {
                    $fail("Для {$type} должно быть ровно {$typeConfig['correct_count']} правильных опций.");
                } elseif ($typeConfig['correct_count'] === 'min:1' && $correctCount < 1) {
                    $fail("Для {$type} хотя бы одна опция должна быть правильной.");
                }
            }
        };
    }
}

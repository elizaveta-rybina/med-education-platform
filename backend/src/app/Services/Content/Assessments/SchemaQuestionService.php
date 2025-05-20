<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\QuestionSchemaRow;
use App\Models\Content\Assessments\QuestionSchemaColumn;
use App\Models\Content\Assessments\QuestionSchemaCell;

class SchemaQuestionService
{
    protected $questionService;

    public function __construct(QuestionService $questionService)
    {
        $this->questionService = $questionService;
    }

    public function create(array $data, int $quizId): Question
    {
        // 1. Создаём вопрос
        $question = $this->questionService->create([
            'quiz_id' => $quizId,
            'question_text' => $data['question_text'],
            'question_type' => $data['question_type'], // 'matching_schema' или 'open_schema'
            'points' => $data['points'] ?? 1,
            'order_number' => $data['order_number'] ?? null,
            'explanation' => $data['explanation'] ?? null,
        ], $quizId);

        // 2. Создаём столбцы
        $columnsMap = []; // label => id
        foreach ($data['table']['columns'] as $index => $columnData) {
            $column = QuestionSchemaColumn::create([
                'question_id' => $question->id,
                'label' => $columnData['label'],
                'order' => $columnData['order'] ?? $index,
            ]);
            $columnsMap[$columnData['label']] = $column->id;
        }

        // 3. Создаём строки и связанные ячейки
        foreach ($data['table']['rows'] as $rowIndex => $rowData) {
            $row = QuestionSchemaRow::create([
                'question_id' => $question->id,
                'label' => $rowData['label'],
                'order' => $rowData['order'] ?? $rowIndex,
            ]);

            foreach ($rowData['cells'] as $cellData) {
                $columnLabel = $cellData['column'];
                $columnId = $columnsMap[$columnLabel] ?? null;

                if (!$columnId) {
                    throw new \Exception("Column '{$columnLabel}' not found in columns list.");
                }

                QuestionSchemaCell::create([
                    'question_id' => $question->id,
                    'row_id' => $row->id,
                    'column_id' => $columnId,
                    'cell_key' => $cellData['cell_key'] ?? null,
                    'content' => $cellData['content'] ?? null,
                    'is_fillable' => $cellData['is_fillable'] ?? false,
                ]);
            }
        }

        return $question;
    }
}

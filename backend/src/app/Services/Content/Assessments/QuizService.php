<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Quiz;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class QuizService
{
    protected $questionService;
    protected $answerService;
    protected $schemaQuestionService;

    public function __construct(
        QuestionService $questionService,
        AnswerService $answerService,
        SchemaQuestionService $schemaQuestionService
    ) {
        $this->questionService = $questionService;
        $this->answerService = $answerService;
        $this->schemaQuestionService = $schemaQuestionService;
    }

    public function create(array $data, Model $parentModel)
    {
        DB::beginTransaction();

        try {
            $quiz = Quiz::create([
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'quiz_type' => $data['quiz_type'],
                'max_attempts' => $data['max_attempts'],
                'passing_score' => $data['passing_score'],
                'time_limit_minutes' => $data['time_limit_minutes'] ?? null,
                'questions_count' => $data['questions_count'] ?? null,
                'quizable_type' => get_class($parentModel),
                'quizable_id' => $parentModel->id,
            ]);

            // Можно не вызывать $parentModel->quizzes()->save($quiz), так как create уже всё связал

            if (!empty($data['questions'])) {
                foreach ($data['questions'] as $questionData) {
                    $type = $questionData['question_type'];

                    $question = in_array($type, ['open_schema', 'matching_schema'])
                        ? $this->schemaQuestionService->create($questionData, $quiz->id)
                        : $this->questionService->create($questionData, $quiz->id);

                    if (!empty($questionData['answers'])) {
                        $this->answerService->create($questionData['answers'], $question->id);
                    }
                }
            }

            DB::commit();
            return $quiz;

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}

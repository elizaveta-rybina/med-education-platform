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

    public function create(array $data, Model $parentModel = null)
    {
        DB::beginTransaction();

        try {
            $quiz = Quiz::create([
                'topic_id' => $data['topic_id'],
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'quiz_type' => $data['quiz_type'],
                'max_attempts' => $data['max_attempts'],
                'passing_score' => $data['passing_score'],
                'time_limit_minutes' => $data['time_limit_minutes'] ?? null,
                'questions_count' => $data['questions_count'] ?? null,
                'quizable_type' => $parentModel ? get_class($parentModel) : null,
                'quizable_id' => $parentModel ? $parentModel->id : null,
            ]);

            if ($parentModel) {
                $parentModel->quizzes()->save($quiz);
            }

            // Делаем вопросы опциональными
            if (!empty($data['questions'])) {
                foreach ($data['questions'] as $questionData) {
                    $type = $questionData['question_type'];

                    if (in_array($type, ['open_schema', 'matching_schema'])) {
                        $question = $this->schemaQuestionService->create($questionData, $quiz->id);
                    } else {
                        $question = $this->questionService->create($questionData, $quiz->id);
                    }

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

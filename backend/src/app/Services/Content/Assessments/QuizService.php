<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Quiz;
use App\Repositories\QuizRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuizService
{
    protected $quizRepository;
    protected $questionService;

    public function __construct(QuizRepository $quizRepository, QuestionService $questionService)
    {
        $this->quizRepository = $quizRepository;
        $this->questionService = $questionService;
    }

    public function create(array $data, Model $parentModel): Quiz
    {
        DB::beginTransaction();

        try {
            $quiz = $this->quizRepository->create($data, $parentModel);
            Log::info('QuizService: Quiz created', ['quiz_id' => $quiz->id]);

            if (!empty($data['questions'])) {
                foreach ($data['questions'] as $questionData) {
                    $this->questionService->create($questionData, $quiz->id);
                }
                Log::info('QuizService: Questions created for quiz', ['quiz_id' => $quiz->id, 'question_count' => count($data['questions'])]);
            }

            DB::commit();
            return $quiz;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('QuizService: Error in create method', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function update(Quiz $quiz, array $data): Quiz
    {
        DB::beginTransaction();

        try {
            $quiz = $this->quizRepository->update($quiz, $data);
            Log::info('QuizService: Quiz updated', ['quiz_id' => $quiz->id]);
            DB::commit();
            return $quiz;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('QuizService: Error in update method', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function delete(Quiz $quiz): void
    {
        DB::beginTransaction();

        try {
            $this->quizRepository->delete($quiz);
            Log::info('QuizService: Quiz deleted', ['quiz_id' => $quiz->id]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('QuizService: Error in delete method', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function findOrFail(int $id): Quiz
    {
        return $this->quizRepository->findOrFail($id);
    }
}

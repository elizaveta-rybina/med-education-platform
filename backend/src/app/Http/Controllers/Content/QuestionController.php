<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Requests\Content\Question\StoreQuestionRequest;
use App\Http\Requests\Content\Question\UpdateQuestionRequest;
use App\Http\Resources\QuestionResource;
use App\Services\Content\Assessments\QuestionService;
use App\Models\Content\Assessments\Quiz;
use Illuminate\Support\Facades\Log;

class QuestionController extends Controller
{
    protected $questionService;

    public function __construct(QuestionService $questionService)
    {
        $this->questionService = $questionService;
    }

    public function store(StoreQuestionRequest $request, int $quizId)
    {
        try {
            $data = $request->validated();
            Quiz::findOrFail($quizId);
            $question = $this->questionService->create($data, $quizId);
            Log::info('Question created', ['question_id' => $question->id, 'quiz_id' => $quizId]);
            return new QuestionResource($question);
        } catch (\Exception $e) {
            Log::error('Failed to create question', ['quiz_id' => $quizId, 'error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function update(UpdateQuestionRequest $request, int $quizId, int $id)
    {
        try {
            $data = $request->validated();
            Quiz::findOrFail($quizId);
            $question = $this->questionService->findOrFail($id);
            $question = $this->questionService->update($question, $data);
            Log::info('Question updated', ['question_id' => $question->id, 'quiz_id' => $quizId]);
            return new QuestionResource($question);
        } catch (\Exception $e) {
            Log::error('Failed to update question', ['quiz_id' => $quizId, 'question_id' => $id, 'error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function destroy(int $quizId, int $id)
    {
        try {
            Quiz::findOrFail($quizId);
            $question = $this->questionService->findOrFail($id);
            $this->questionService->delete($question);
            Log::info('Question deleted', ['question_id' => $id, 'quiz_id' => $quizId]);
            return response()->json(['message' => 'Вопрос успешно удален']);
        } catch (\Exception $e) {
            Log::error('Failed to delete question', ['quiz_id' => $quizId, 'question_id' => $id, 'error' => $e->getMessage()]);
            throw $e;
        }
    }
}

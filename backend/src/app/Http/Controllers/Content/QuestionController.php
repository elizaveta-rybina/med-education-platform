<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Requests\Content\Question\StoreQuestionRequest;
use App\Http\Requests\Content\Question\UpdateQuestionRequest;
use App\Http\Resources\QuestionResource;
use App\Services\Content\Assessments\QuestionService;
use App\Models\Content\Assessments\Quiz;

class QuestionController extends Controller
{
    protected $questionService;

    public function __construct(QuestionService $questionService)
    {
        $this->questionService = $questionService;
    }

    public function store(StoreQuestionRequest $request, int $quizId)
    {
        $data = $request->validated();
        Quiz::findOrFail($quizId); // Проверяем существование теста
        $question = $this->questionService->create($data, $quizId);
        return new QuestionResource($question);
    }

    public function update(UpdateQuestionRequest $request, int $quizId, int $id)
    {
        $data = $request->validated();
        Quiz::findOrFail($quizId); // Проверяем существование теста
        $question = $this->questionService->findOrFail($id);
        $question = $this->questionService->update($question, $data);
        return new QuestionResource($question);
    }

    public function destroy(int $quizId, int $id)
    {
        Quiz::findOrFail($quizId); // Проверяем существование теста
        $question = $this->questionService->findOrFail($id);
        $this->questionService->delete($question);

        return response()->json([
            'message' => 'Вопрос успешно удален',
        ]);
    }
}

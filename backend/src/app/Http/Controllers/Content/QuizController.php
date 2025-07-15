<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Requests\Content\Quiz\StoreQuizRequest;
use App\Http\Requests\Content\Quiz\UpdateQuizRequest;
use App\Http\Resources\QuizResource;
use App\Services\Content\Assessments\QuizService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;

class QuizController extends Controller
{
    protected $quizService;

    public function __construct(QuizService $quizService)
    {
        $this->quizService = $quizService;
    }

    public function store(StoreQuizRequest $request)
    {
        try {
            $data = $request->validated();
            $parentClass = match ($data['parent_type']) {
                'topic' => \App\Models\Content\Topic::class,
                'module' => \App\Models\Content\Module::class,
                'assignment' => \App\Models\Content\Assignment::class,
                'lecture' => \App\Models\Content\Lecture::class,
                default => throw new \InvalidArgumentException('Invalid parent type: ' . ($data['parent_type'] ?? 'null')),
            };

            $parentModel = $parentClass::findOrFail($data['parent_id']);
            $quiz = $this->quizService->create($data, $parentModel);
            Log::info('QuizController: Quiz created', ['quiz_id' => $quiz->id]);

            return new QuizResource($quiz);
        } catch (\InvalidArgumentException $e) {
            Log::error('QuizController: Invalid parent type', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (ModelNotFoundException $e) {
            Log::error('QuizController: Parent model not found', ['parent_id' => $data['parent_id'] ?? null]);
            return response()->json(['error' => 'Parent model not found'], 404);
        } catch (\Exception $e) {
            Log::error('QuizController: Error in store method', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function update(UpdateQuizRequest $request, int $id)
    {
        try {
            $data = $request->validated();
            $quiz = $this->quizService->findOrFail($id);
            $quiz = $this->quizService->update($quiz, $data);
            Log::info('QuizController: Quiz updated', ['quiz_id' => $quiz->id]);
            return new QuizResource($quiz);
        } catch (ModelNotFoundException $e) {
            Log::error('QuizController: Quiz not found', ['quiz_id' => $id]);
            return response()->json(['error' => 'Quiz not found'], 404);
        } catch (\Exception $e) {
            Log::error('QuizController: Error in update method', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function destroy(int $id)
    {
        try {
            $quiz = $this->quizService->findOrFail($id);
            $this->quizService->delete($quiz);
            Log::info('QuizController: Quiz deleted', ['quiz_id' => $id]);
            return response()->json(['message' => 'Quiz deleted successfully']);
        } catch (ModelNotFoundException $e) {
            Log::error('QuizController: Quiz not found', ['quiz_id' => $id]);
            return response()->json(['error' => 'Quiz not found'], 404);
        } catch (\Exception $e) {
            Log::error('QuizController: Error in destroy method', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}

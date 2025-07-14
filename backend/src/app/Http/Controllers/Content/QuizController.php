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
        Log::debug('QuizController: Конструктор вызван');
        $this->quizService = $quizService;
        Log::debug('QuizController: QuizService инжектирован');
    }

    public function store(StoreQuizRequest $request)
    {
        Log::debug('QuizController: Метод store вызван', ['request' => $request->all()]);

        try {
            $data = $request->validated();
            Log::debug('QuizController: Данные валидированы', ['data' => $data]);

            $parentClass = match ($data['parent_type']) {
                'topic' => \App\Models\Content\Topic::class,
                'module' => \App\Models\Content\Module::class,
                'assignment' => \App\Models\Content\Assignment::class,
                'lecture' => \App\Models\Content\Lecture::class,
                default => throw new \InvalidArgumentException('Invalid parent type: ' . ($data['parent_type'] ?? 'null')),
            };
            Log::debug('QuizController: Определен parentClass', ['parentClass' => $parentClass]);

            $parentModel = $parentClass::findOrFail($data['parent_id']);
            Log::debug('QuizController: Найдена родительская модель', ['parent_id' => $data['parent_id']]);

            $quiz = $this->quizService->create($data, $parentModel);
            Log::debug('QuizController: Тест создан', ['quiz_id' => $quiz->id]);

            return new QuizResource($quiz);
        } catch (\InvalidArgumentException $e) {
            Log::error('QuizController: Ошибка валидации parent_type', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (ModelNotFoundException $e) {
            Log::error('QuizController: Родительская модель не найдена', ['parent_id' => $data['parent_id'] ?? null]);
            return response()->json(['error' => 'Родительская модель не найдена'], 404);
        } catch (\Exception $e) {
            Log::error('QuizController: Ошибка в методе store', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'Ошибка сервера'], 500);
        }
    }

    public function update(UpdateQuizRequest $request, int $id)
    {
        Log::debug('QuizController: Метод update вызван', ['quiz_id' => $id]);
        try {
            $data = $request->validated();
            $quiz = $this->quizService->findOrFail($id);
            $quiz = $this->quizService->update($quiz, $data);
            return new QuizResource($quiz);
        } catch (ModelNotFoundException $e) {
            Log::error('QuizController: Тест не найден', ['quiz_id' => $id]);
            return response()->json(['error' => 'Тест не найден'], 404);
        } catch (\Exception $e) {
            Log::error('QuizController: Ошибка в методе update', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'Ошибка сервера'], 500);
        }
    }

    public function destroy(int $id)
    {
        Log::debug('QuizController: Метод destroy вызван', ['quiz_id' => $id]);
        try {
            $quiz = $this->quizService->findOrFail($id);
            $this->quizService->delete($quiz);
            return response()->json(['message' => 'Тест успешно удален']);
        } catch (ModelNotFoundException $e) {
            Log::error('QuizController: Тест не найден', ['quiz_id' => $id]);
            return response()->json(['error' => 'Тест не найден'], 404);
        } catch (\Exception $e) {
            Log::error('QuizController: Ошибка в методе destroy', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'Ошибка сервера'], 500);
        }
    }
}

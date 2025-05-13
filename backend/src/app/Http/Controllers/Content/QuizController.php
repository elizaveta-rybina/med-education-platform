<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Services\Content\Assessments\QuizService;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    protected $quizService;

    public function __construct(QuizService $quizService)
    {
        $this->quizService = $quizService;
    }

    /**
     * Создание нового теста.
     */
    public function create(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quiz_type' => 'required|string',
            'max_attempts' => 'nullable|integer',
            'passing_score' => 'nullable|integer',
            'time_limit_minutes' => 'nullable|integer',
            'questions_count' => 'nullable|integer',
            'topic_id' => 'required|exists:topics,id', // Предполагаем, что тест привязан к теме
            'questions' => 'required|array', // Массив вопросов
            'parent_type' => 'nullable|string|in:lecture,assignment', // Тип родительского объекта
            'parent_id' => 'nullable|exists:lectures,id,assignments,id', // Идентификатор родительского объекта
        ]);

        // Определяем родительский объект
        $parentModel = null;
        if ($validated['parent_type'] && $validated['parent_id']) {
            $parentModel = app('App\Models\Content\\' . ucfirst($validated['parent_type']))->find($validated['parent_id']);
        }

        // Используем сервис для создания квиза с вопросами и ответами
        $quiz = $this->quizService->create($validated, $parentModel);

        return response()->json([
            'message' => 'Тест успешно создан!',
            'quiz' => $quiz
        ], 201);
    }}

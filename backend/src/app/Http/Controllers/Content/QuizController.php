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
            'quiz_type' => 'required|string|in:topic_final,module_final,embedded,additional',
            'max_attempts' => 'nullable|integer',
            'passing_score' => 'nullable|integer',
            'time_limit_minutes' => 'nullable|integer',
            'questions_count' => 'nullable|integer',
            'parent_type' => 'required|string|in:topic,module,assignment,lecture',
            'parent_id' => 'required|integer',
            'questions' => 'nullable|array',
        ]);

        $parentClass = match ($validated['parent_type']) {
            'topic' => \App\Models\Content\Topic::class,
            'module' => \App\Models\Content\Module::class,
            'assignment' => \App\Models\Content\Assignment::class,
            'lecture' => \App\Models\Content\Lecture::class,
        };

        $parentModel = $parentClass::findOrFail($validated['parent_id']);

        $quiz = $this->quizService->create($validated, $parentModel);

        return response()->json([
            'message' => 'Тест успешно создан!',
        ], 201);
    }

}

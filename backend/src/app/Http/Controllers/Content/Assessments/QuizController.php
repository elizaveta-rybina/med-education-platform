<?php

namespace App\Http\Controllers\Content\Assessments;

use App\Models\Content\Assessments\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuizController extends Controller
{
    public function index()
    {
        $quizzes = Quiz::with('quizable')->get();
        return response()->json($quizzes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quiz_type' => 'required|in:topic_final,additional,embedded,module_final',
            'max_attempts' => 'required|integer|min:1',
            'passing_score' => 'required|integer|min:0|max:100',
            'questions_count' => 'nullable|integer|min:1',
            'time_limit_minutes' => 'nullable|integer|min:1',
            'quizable_id' => 'nullable|integer',
            'quizable_type' => 'nullable|string',
        ]);

        $quiz = Quiz::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'quiz_type' => $validated['quiz_type'],
            'max_attempts' => $validated['max_attempts'],
            'passing_score' => $validated['passing_score'],
            'questions_count' => $validated['questions_count'],
            'time_limit_minutes' => $validated['time_limit_minutes'],
            'quizable_id' => $validated['quizable_id'],
            'quizable_type' => $validated['quizable_type'],
        ]);

        return response()->json($quiz, 201);
    }

    public function show(Quiz $quiz)
    {
        return response()->json($quiz->load('quizable', 'questions'));
    }

    public function update(Request $request, Quiz $quiz)
    {
        Log::info('Request data:', $request->all());

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quiz_type' => 'required|in:topic_final,additional,embedded,module_final',
            'max_attempts' => 'required|integer|min:1',
            'passing_score' => 'required|integer|min:0|max:100',
            'questions_count' => 'nullable|integer|min:1',
            'time_limit_minutes' => 'nullable|integer|min:1',
            'quizable_id' => 'nullable|integer',
            'quizable_type' => 'nullable|string',
        ]);

        Log::info('Validated data:', $validated);

        DB::enableQueryLog();
        $result = $quiz->update($validated);
        Log::info('Update result:', ['result' => $result]);
        Log::info('SQL queries:', DB::getQueryLog());

        if (!$result) {
            Log::error('Failed to update quiz', ['quiz_id' => $quiz->id]);
            return response()->json(['error' => 'Failed to update quiz'], 500);
        }

        $freshQuiz = $quiz->fresh();
        Log::info('Updated quiz:', $freshQuiz->toArray());

        return response()->json($freshQuiz);
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return response()->json(null, 204);
    }
}

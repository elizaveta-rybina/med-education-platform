<?php

namespace App\Http\Controllers\Content\Assessments;


use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\Quiz;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class QuestionController extends Controller
{
    public function index(Quiz $quiz)
    {
        $questions = $quiz->questions()->with('options', 'answerKeys')->get();
        return response()->json($questions);
    }

    public function store(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'text' => 'required|string',
            'question_type' => 'required|in:single_choice,multiple_choice,text_input,matching,ordering,table',
            'metadata' => 'nullable|json',
            'is_auto_graded' => 'boolean',
            'points' => 'required|integer|min:1',
            'order' => 'required|integer|min:0',
        ]);

        $question = $quiz->questions()->create([
            'text' => $validated['text'],
            'question_type' => $validated['question_type'],
            'metadata' => $validated['metadata'],
            'is_auto_graded' => $validated['is_auto_graded'] ?? true,
            'points' => $validated['points'],
            'order' => $validated['order'],
        ]);

        return response()->json($question, 201);
    }

    public function show(Quiz $quiz, Question $question)
    {
        if ($question->quiz_id !== $quiz->id) {
            return response()->json(['error' => 'Question does not belong to this quiz'], 404);
        }
        return response()->json($question->load('options', 'answerKeys'));
    }

    public function update(Request $request, Quiz $quiz, Question $question)
    {
        if ($question->quiz_id !== $quiz->id) {
            return response()->json(['error' => 'Question does not belong to this quiz'], 404);
        }

        $validated = $request->validate([
            'text' => 'required|string',
            'question_type' => 'required|in:single_choice,multiple_choice,text_input,matching,ordering,table',
            'metadata' => 'nullable|json',
            'is_auto_graded' => 'boolean',
            'points' => 'required|integer|min:1',
            'order' => 'required|integer|min:0',
        ]);

        $question->update($validated);

        return response()->json($question);
    }

    public function destroy(Quiz $quiz, Question $question)
    {
        if ($question->quiz_id !== $quiz->id) {
            return response()->json(['error' => 'Question does not belong to this quiz'], 404);
        }

        $question->delete();
        return response()->json(null, 204);
    }
}

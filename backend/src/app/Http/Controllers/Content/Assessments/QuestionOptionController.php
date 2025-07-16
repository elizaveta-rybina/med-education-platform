<?php

namespace App\Http\Controllers\Content\Assessments;

use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\QuestionOption;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class QuestionOptionController extends Controller
{
    public function index(Question $question)
    {
        $options = $question->options()->get();
        return response()->json($options);
    }

    public function store(Request $request, Question $question)
    {
        $validated = $request->validate([
            'text' => 'required|string',
            'is_correct' => 'boolean',
            'matching_data' => 'nullable|json',
            'order' => 'required|integer|min:0',
        ]);

        $option = $question->options()->create([
            'text' => $validated['text'],
            'is_correct' => $validated['is_correct'] ?? false,
            'matching_data' => $validated['matching_data'],
            'order' => $validated['order'],
        ]);

        return response()->json($option, 201);
    }

    public function show(Question $question, QuestionOption $option)
    {
        if ($option->question_id !== $question->id) {
            return response()->json(['error' => 'Option does not belong to this question'], 404);
        }
        return response()->json($option);
    }

    public function update(Request $request, Question $question, QuestionOption $option)
    {
        if ($option->question_id !== $question->id) {
            return response()->json(['error' => 'Option does not belong to this question'], 404);
        }

        $validated = $request->validate([
            'text' => 'required|string',
            'is_correct' => 'boolean',
            'matching_data' => 'nullable|json',
            'order' => 'required|integer|min:0',
        ]);

        $option->update($validated);

        return response()->json($option);
    }

    public function destroy(Question $question, QuestionOption $option)
    {
        if ($option->question_id !== $question->id) {
            return response()->json(['error' => 'Option does not belong to this question'], 404);
        }

        $option->delete();
        return response()->json(null, 204);
    }
}

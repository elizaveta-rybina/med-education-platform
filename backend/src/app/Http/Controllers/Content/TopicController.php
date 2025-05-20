<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function storeBulk(Request $request)
    {
        $validated = $request->validate([
            'module_id' => 'required|exists:modules,id',
            'topics' => 'required|array|min:1',
            'topics.*.title' => 'required|string|max:255',
            'topics.*.description' => 'nullable|string',
            'topics.*.order_number' => 'required|integer',
            'topics.*.is_published' => 'sometimes|boolean',
        ]);

        $saved = [];

        foreach ($validated['topics'] as $topicData) {
            $topicData['module_id'] = $validated['module_id'];
            $topicData['is_published'] = $topicData['is_published'] ?? false;
            $saved[] = Topic::create($topicData);
        }

        return response()->json([
            'message' => 'Темы успешно добавлены',
        ], 201);
    }
}

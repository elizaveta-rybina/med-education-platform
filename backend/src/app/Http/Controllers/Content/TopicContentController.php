<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Content\TopicContentService;

class TopicContentController extends Controller
{
    public function __construct(
        protected TopicContentService $topicContentService,
    ) {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'items' => 'required|array|min:1',
            'items.*.type' => 'required|in:lecture,quiz,assignment',
            'items.*.title' => 'required|string|max:255',
            'items.*.order_number' => 'required|integer',
            'items.*.is_published' => 'required|boolean',

            // Для самостоятельных тестов
            'items.*.quiz_type' => 'required_if:items.*.type,quiz|in:module,topic_final,additional,embedded',

            // Для тестов, прикрепленных к лекциям/заданиям
            'items.*.attached_quiz' => 'nullable|array',
            'items.*.attached_quiz.title' => 'required_with:items.*.attached_quiz|string|max:255',
            'items.*.attached_quiz.quiz_type' => 'required_with:items.*.attached_quiz|in:embedded',
        ]);

        try {
            $savedItems = $this->topicContentService->store($validated);

            return response()->json([
                'message' => 'Контент темы успешно добавлен',
                'items' => $savedItems,
            ], 201);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Ошибка при добавлении контента',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

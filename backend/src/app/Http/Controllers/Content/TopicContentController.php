<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Lecture;
use App\Models\Content\Quiz;
use App\Models\Content\TopicItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TopicContentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'created_by' => 'required|exists:users,id',
            'items' => 'required|array|min:1',
            'items.*.type' => 'required|in:lecture,quiz',
            'items.*.title' => 'required|string|max:255',
            'items.*.content' => 'required_if:items.*.type,lecture|string',
            'items.*.content_type' => 'in:html,markdown',
            'items.*.description' => 'nullable|string', // для quiz
            'items.*.quiz_type' => 'in:module,topic_final,additional',
            'items.*.order_number' => 'required|integer',
        ]);

        $savedItems = [];

        DB::beginTransaction();

        try {
            foreach ($validated['items'] as $itemData) {
                $type = $itemData['type'];
                $order = $itemData['order_number'];

                if ($type === 'lecture') {
                    $lecture = Lecture::create([
                        'topic_id' => $validated['topic_id'],
                        'title' => $itemData['title'],
                        'content' => $itemData['content'],
                        'content_type' => $itemData['content_type'] ?? 'html',
                        'order_number' => $order, // опционально
                        'created_by' => $validated['created_by']
                    ]);

                    $savedItems[] = TopicItem::create([
                        'topic_id' => $validated['topic_id'],
                        'item_type' => 'lecture',
                        'item_id' => $lecture->id,
                        'order_number' => $order
                    ]);
                } elseif ($type === 'quiz') {
                    $quiz = Quiz::create([
                        'topic_id' => $validated['topic_id'],
                        'title' => $itemData['title'],
                        'description' => $itemData['description'] ?? null,
                        'quiz_type' => $itemData['quiz_type'] ?? 'topic_final',
                        'created_by' => $validated['created_by']
                    ]);

                    $savedItems[] = TopicItem::create([
                        'topic_id' => $validated['topic_id'],
                        'item_type' => 'quiz',
                        'item_id' => $quiz->id,
                        'order_number' => $order
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Контент темы успешно добавлен',
                'items' => $savedItems
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Ошибка при добавлении контента',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

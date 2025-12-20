<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    // Массовое создание тем
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
            'data' => $saved,
        ], 201);
    }

    // Получить одну тему по ID
    public function show($id)
    {
        $topic = Topic::findOrFail($id);

        return response()->json([
            'data' => $topic,
        ]);
    }

    // Получение всех тем, привязанных к модулю
    public function indexByModule($module)
    {
        $topics = Topic::where('module_id', $module)
            ->orderBy('order_number')
            ->get();

        return response()->json([
            'data' => $topics,
        ]);
    }


    // Обновить тему по ID
    public function update(Request $request, $id)
    {
        $topic = Topic::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'order_number' => 'sometimes|required|integer',
            'is_published' => 'sometimes|boolean',
        ]);

        $topic->update($validated);

        return response()->json([
            'message' => 'Тема успешно обновлена',
            'data' => $topic,
        ]);
    }

    // Удалить тему по ID
    public function destroy($id)
    {
        $topic = Topic::findOrFail($id);
        $topic->delete();

        return response()->json([
            'message' => 'Тема успешно удалена',
        ]);
    }

    // Загрузить обложку темы
    public function uploadCover(Request $request, $id)
    {
        $topic = Topic::findOrFail($id);

        $validated = $request->validate([
            'cover' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB
        ]);

        try {
            // Удаляем старую обложку если существует
            if ($topic->cover_image) {
                $oldPath = storage_path('app/' . $topic->cover_image);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            // Сохраняем новую обложку
            $file = $validated['cover'];
            $path = $file->store('topics/covers', 'public');

            $topic->cover_image = $path;
            $topic->save();

            return response()->json([
                'message' => 'Обложка темы успешно загружена',
                'cover_image' => $path,
                'url' => asset('storage/' . $path),
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Ошибка при загрузке обложки',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

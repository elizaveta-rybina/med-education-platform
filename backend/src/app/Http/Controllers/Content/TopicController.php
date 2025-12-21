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
            'data' => [
                'id' => $topic->id,
                'module_id' => $topic->module_id,
                'title' => $topic->title,
                'description' => $topic->description,
                'order_number' => $topic->order_number,
                'is_published' => $topic->is_published,
                'cover_image' => $topic->cover_image
                    ? asset('storage/' . $topic->cover_image)
                    : null,
                'created_at' => $topic->created_at,
                'updated_at' => $topic->updated_at,
            ],
        ]);
    }

    // Получение всех тем, привязанных к модулю
    public function indexByModule($module)
    {
        $topics = Topic::where('module_id', $module)
            ->orderBy('order_number')
            ->get();

        \Log::info('Fetching topics for module:', [
            'module_id' => $module,
            'count' => count($topics),
            'topics' => $topics->map(fn($t) => [
                'id' => $t->id,
                'title' => $t->title,
                'cover_image' => $t->cover_image
            ])->toArray()
        ]);

        $result = $topics->map(function ($topic) {
            return [
                'id' => $topic->id,
                'module_id' => $topic->module_id,
                'title' => $topic->title,
                'description' => $topic->description,
                'order_number' => $topic->order_number,
                'is_published' => $topic->is_published,
                'cover_image' => $topic->cover_image
                    ? asset('storage/' . $topic->cover_image)
                    : null,
                'created_at' => $topic->created_at,
                'updated_at' => $topic->updated_at,
            ];
        });

        \Log::info('indexByModule response (before return):', [
            'data' => $result->toArray()
        ]);

        return response()->json([
            'data' => $result
        ]);
    }


    // Обновить тему по ID
    public function update($id, Request $request)
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
                $oldPath = public_path('storage/' . $topic->cover_image);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            // Сохраняем новую обложку
            $file = $validated['cover'];
            $path = $file->store('topics/covers', 'public');

            \Log::info('Saving cover for topic:', [
                'topic_id' => $id,
                'path' => $path,
                'cover_image_before' => $topic->cover_image
            ]);

            // Используем update() для явного обновления
            $topic->update(['cover_image' => $path]);

            // Перезагружаем модель из БД
            $topic->refresh();

            // Проверяем что сохранилось в БД
            $freshTopic = Topic::find($id);

            \Log::info('Cover saved verification:', [
                'topic_id' => $id,
                'cover_image_from_update' => $topic->cover_image,
                'cover_image_from_fresh_find' => $freshTopic->cover_image,
                'stored_path' => $path
            ]);

            return response()->json([
                'message' => 'Обложка темы успешно загружена',
                'cover_image' => $path,
                'url' => asset('storage/' . $path),
            ], 200);
        } catch (\Throwable $e) {
            \Log::error('Upload cover error:', [
                'topic_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Ошибка при загрузке обложки',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

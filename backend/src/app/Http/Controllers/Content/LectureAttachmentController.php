<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\LectureAttachment;
use Illuminate\Http\Request;

class LectureAttachmentController extends Controller
{
    /**
     * Получить все вложения для конкретной лекции.
     */
    public function index($lectureId)
    {
        $attachments = LectureAttachment::where('lecture_id', $lectureId)->get();

        return response()->json([
            'success' => true,
            'attachments' => $attachments,
        ]);
    }

    /**
     * Загрузить новое вложение (пока заглушка).
     */
    public function store(Request $request, $lectureId)
    {
        return response()->json([
            'message' => 'Метод store пока не реализован',
        ], 501);
    }

    /**
     * Показать одно вложение (пока заглушка).
     */
    public function show($lectureId, $id)
    {
        return response()->json([
            'message' => 'Метод show пока не реализован',
        ], 501);
    }

    /**
     * Обновить вложение (пока заглушка).
     */
    public function update(Request $request, $lectureId, $id)
    {
        return response()->json([
            'message' => 'Метод update пока не реализован',
        ], 501);
    }

    /**
     * Удалить вложение (пока заглушка).
     */
    public function destroy($lectureId, $id)
    {
        return response()->json([
            'message' => 'Метод destroy пока не реализован',
        ], 501);
    }


    /**
     * Временный метод для добавления ссылки на игру как вложения.
     */
    public function addGameAttachment(Request $request, $lectureId)
    {
        $validated = $request->validate([
            'file_name' => 'required|string|max:255',
            'game_path' => 'required|string|max:512',
        ]);

        $attachment = LectureAttachment::create([
            'lecture_id' => $lectureId,
            'file_name' => $validated['file_name'],
            'file_path' => $validated['game_path'],
            'file_type' => 'link',
            'file_size' => 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Игра успешно добавлена как вложение',
            'attachment' => $attachment,
        ], 201);
    }

}

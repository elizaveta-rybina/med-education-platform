<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Lecture;
use App\Models\Content\LectureAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\UnauthorizedException;

class LectureImageController extends Controller
{

    /**
     * Загрузка изображения для конкретной лекции
     */
    public function upload(Request $request, $lectureId): JsonResponse
    {
        $request->validate([
            'image' => 'required|file|image|mimes:jpeg,png,jpg,gif,webp,svg|max:10240', // 10MB
        ]);

        $lecture = Lecture::findOrFail($lectureId);

        $file = $request->file('image');

        $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();
        $path = 'lectures/images/' . $filename;

        Storage::disk('public')->put($path, file_get_contents($file));

        // Получаем URL от Storage, который учитывает APP_URL из .env
        $url = Storage::disk('public')->url($path);
        
        // Если URL относительный, делаем его абсолютным
        if (!str_starts_with($url, 'http')) {
            $appUrl = config('app.url', 'http://localhost');
            $url = rtrim($appUrl, '/') . '/' . ltrim($url, '/');
        }

        $attachment = LectureAttachment::create([
            'lecture_id' => $lecture->id,
            'file_name' => $filename,
            'file_path' => $path,
            'file_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
        ]);

        return response()->json([
            'success' => true,
            'url' => $url,
            'attachment_id' => $attachment->id,
            'filename' => $filename,
            'message' => 'Изображение успешно загружено',
        ], 201);
    }


    /**
     * Удаление изображения
     */
    public function delete($lectureId, $attachmentId): JsonResponse
    {
        $lecture = Lecture::findOrFail($lectureId);

        // Находим вложение и дополнительно проверяем принадлежность к лекции
        $attachment = LectureAttachment::where('id', $attachmentId)
            ->where('lecture_id', $lectureId)
            ->firstOrFail();

        // Удаляем файл с диска
        if (Storage::disk('public')->exists($attachment->file_path)) {
            Storage::disk('public')->delete($attachment->file_path);
        }

        $attachment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Изображение успешно удалено',
        ]);
    }


}

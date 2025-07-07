<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Content\LectureUploadService;

class LectureController extends Controller
{
    public function __construct(
        protected LectureUploadService $uploadService,
    ) {}

    public function upload(Request $request)
    {
        $validated = $request->validate([
            'lecture_id' => 'required|exists:lectures,id',
            'doc_file' => 'required|file|mimes:doc,docx',
        ]);

        try {
            $lecture = $this->uploadService->processDocFile($validated);
            return response()->json([
                'message' => 'Текст успешно добавлен к лекции',
                'lecture' => $lecture,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Ошибка при обработке файла',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function update(Request $request, $id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Лекция успешно обновлена',
            'data' => $request->all()
        ]);
    }

    public function destroy($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Лекция успешно удалена'
        ]);
    }
}

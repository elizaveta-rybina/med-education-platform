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
            'topic_id' => 'required|exists:topics,id',
            'title' => 'required|string|max:255',
            'order_number' => 'required|integer',
            'doc_file' => 'required|file|mimes:doc,docx',
        ]);

        try {
            $lecture = $this->uploadService->processDocFile($validated);
            return response()->json([
                'message' => 'Лекция успешно загружена',
                'lecture' => $lecture,
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Ошибка при обработке файла',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

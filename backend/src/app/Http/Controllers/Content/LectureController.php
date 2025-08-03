<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Lecture;
use App\Services\Content\LectureService;
use Illuminate\Http\Request;
class LectureController extends Controller
{
    public function __construct(
        protected LectureService $lectureService,
    ) {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'content_type' => 'nullable|string|in:markdown,html,plaintext',
            'order_number' => 'required|integer',
        ]);

        $lecture = $this->lectureService->create($validated);

        return response()->json([
            'message' => 'Лекция успешно создана',
            'lecture' => $lecture,
        ], 201);
    }

    public function show($id)
    {
        $lecture = Lecture::with(['quizzes'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'lecture' => $lecture,
        ]);
    }

    public function update(Request $request, $id)
    {
        $lecture = Lecture::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $lecture->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Лекция успешно обновлена',
            'lecture' => $lecture
        ]);
    }

    public function destroy($id)
    {
        $lecture = Lecture::findOrFail($id);
        $lecture->delete();

        return response()->json([
            'success' => true,
            'message' => 'Лекция успешно удалена'
        ]);
    }

//    public function upload(Request $request, $id)
//    {
//        try {
//            $lecture = Lecture::findOrFail($id);
//        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
//            return response()->json([
//                'message' => 'Лекция не найдена',
//                'error' => $e->getMessage(),
//            ], 404);
//        }
//
//        $validated = $request->validate([
//            'doc_file' => 'required|file|mimes:doc,docx|max:10240', // добавляем max размер (10MB)
//        ]);
//
//        try {
//            $lecture = $this->uploadService->processDocFile($lecture, $validated['doc_file']);
//
//            return response()->json([
//                'message' => 'Текст успешно добавлен к лекции',
//                'lecture' => $lecture,
//            ], 200);
//        } catch (\Throwable $e) {
//            return response()->json([
//                'message' => 'Ошибка при обработке файла',
//                'error' => $e->getMessage(),
//            ], 500);
//        }
//    }


}

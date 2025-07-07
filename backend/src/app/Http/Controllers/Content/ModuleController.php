<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    // Массовое создание модулей
    public function storeBulk(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'modules' => 'required|array|min:1',
            'modules.*.title' => 'required|string|max:255',
            'modules.*.description' => 'nullable|string',
            'modules.*.order_number' => 'required|integer'
        ]);

        $saved = [];

        foreach ($validated['modules'] as $moduleData) {
            $moduleData['course_id'] = $validated['course_id'];
            $saved[] = Module::create($moduleData);
        }

        return response()->json([
            'message' => 'Модули успешно добавлены',
            'data' => $saved
        ], 201);
    }

    // Получить модуль вместе с темами и итоговым тестом
    public function show($id)
    {
        $module = Module::with(['topics', 'quizzes'])->findOrFail($id);

        $topics = $module->topics->map(fn($topic) => [
            'title' => $topic->title,
        ])->values();

        // Добавим "Итоговый тест по модулю", если он есть
        $finalQuiz = optional($module->quizzes)->firstWhere('quiz_type', 'module_final');
        if ($finalQuiz) {
            $topics->push([
                'title' => 'Итоговый тест по модулю',
            ]);
        }

        return response()->json([
            'module_title' => $module->title,
            'module_description' => $module->description,
            'topics_count' => $module->topics->count(),
            'topics' => $topics,
        ]);
    }

    // GET /admin/content/courses/{course_id}/modules
    public function getByCourse($courseId)
    {
        $modules = \App\Models\Content\Module::where('course_id', $courseId)
            ->orderBy('order_number')
            ->get(['id', 'title', 'description', 'order_number']);

        return response()->json([
            'course_id' => (int) $courseId,
            'modules' => $modules,
        ]);
    }



    public function update(Request $request, $id)
    {
        $module = Module::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'order_number' => 'sometimes|required|integer'
        ]);

        $module->update($validated);

        return response()->json([
            'message' => 'Модуль обновлён',
            'data' => $module
        ]);
    }

    public function destroy($id)
    {
        $module = Module::findOrFail($id);
        $module->delete();

        return response()->json([
            'message' => 'Модуль удалён'
        ]);
    }
}

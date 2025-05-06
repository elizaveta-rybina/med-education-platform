<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
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
            'modules' => $saved
        ], 201);
    }
}

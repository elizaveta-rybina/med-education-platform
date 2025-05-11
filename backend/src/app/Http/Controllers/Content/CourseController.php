<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'skills' => 'nullable|array',
            'skills.*' => 'string',
            'description_modules' => 'nullable|string',
        ]);

        $course = Course::create($validated);

        return response()->json([
            'message' => 'Курс создан успешно',
            //'course' => $course
        ], 201);
    }

    public function show($id)
    {
        $course = Course::findOrFail($id);  // Получаем курс по id
        $courseDetails = $course->getCourseDetails();
        $response = [
            'course_title' => $courseDetails->title,
            'course_description' => $courseDetails->description,
            'modules' => $courseDetails->modules->map(function ($module) {
                return [
                    'module_title' => $module->title,
                    'module_description' => $module->description,
                    'topics_count' => $module->topics->count(),
                    'topics' => $module->topics->map(function ($topic) {
                        return [
                            'topic_title' => $topic->title,
                            'topic_description' => $topic->description,
                            'content' => $topic->lectures->concat($topic->quizzes)->map(function ($item) {
                                return [
                                    'title' => $item->title,
                                    'type' => $item instanceof \App\Models\Content\Lecture ? 'lecture' : 'quiz'
                                ];
                            })
                        ];
                    })
                ];
            })
        ];

        return response()->json($response);

    }
}

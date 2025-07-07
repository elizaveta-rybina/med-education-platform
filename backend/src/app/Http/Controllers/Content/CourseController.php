<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Services\Content\CourseService;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    protected CourseService $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    // GET /admin/content/courses
    public function index()
    {
        $courses = $this->courseService->getAllCourses();
        return response()->json($courses);
    }

    // POST /admin/content/courses
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'skills' => 'nullable|array',
            'skills.*' => 'string',
            'description_modules' => 'nullable|string',
        ]);

        $course = $this->courseService->createCourse($validated);

        return response()->json([
            'message' => 'Курс создан успешно',
            'course' => $course,
        ], 201);
    }

    // GET /admin/content/courses/{id}
    public function show($id)
    {
        $details = $this->courseService->getCourseDetails((int) $id);
        return response()->json($details);
    }

    // PUT /admin/content/courses/{id}
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'skills' => 'nullable|array',
            'skills.*' => 'string',
            'description_modules' => 'nullable|string',
        ]);

        $course = $this->courseService->updateCourse($id, $validated);

        return response()->json([
            'message' => 'Курс обновлён успешно',
            'course' => $course,
        ]);
    }

    // DELETE /admin/content/courses/{id}
    public function destroy($id)
    {
        $this->courseService->deleteCourse($id);

        return response()->json(['message' => 'Курс удалён успешно']);
    }
}

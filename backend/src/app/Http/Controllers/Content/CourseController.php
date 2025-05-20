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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'skills' => 'nullable|array',
            'skills.*' => 'string',
            'description_modules' => 'nullable|string',
        ]);

        $this->courseService->createCourse($validated);

        return response()->json(['message' => 'Курс создан успешно'], 201);
    }

    public function show($id)
    {
        $details = $this->courseService->getCourseDetails($id);
        return response()->json($details);
    }
}

<?php

namespace App\Services\Content;

use App\Models\Content\Course;

class CourseService
{
    public function createCourse(array $data): Course
    {
        return Course::create($data);
    }

    public function getCourseDetails(int $id): array
    {
        $course = Course::findOrFail($id);
        $details = $course->getCourseDetails();

        return [
            'title' => $details->title,
            'description' => $details->description,
            'skills' => $details->skills,
            'description_modules' => $details->description_modules,
            'modules' => $details->modules->map(function ($module) {
                // Сначала собираем темы
                $topics = $module->topics->map(function ($topic) {
                    return [
                        'title' => $topic->title
                    ];
                })->values();

                // Ищем итоговый тест
                $finalQuiz = collect($module->quizzes)->firstWhere('type', 'topic_final');

                if ($finalQuiz) {
                    $topics->push([
                        'title' => 'Итоговый тест по модулю'
                    ]);
                }

                return [
                    'module_title' => $module->title,
                    'module_description' => $module->description,
                    'topics_count' => $module->topics->count(),
                    'topics' => $topics
                ];
            })
        ];
    }
}

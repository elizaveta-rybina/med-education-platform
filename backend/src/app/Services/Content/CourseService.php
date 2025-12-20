<?php

namespace App\Services\Content;

use App\Models\Content\Course;
use Illuminate\Support\Facades\DB;

class CourseService
{
    /**
     * Получить список всех курсов
     */
    public function getAllCourses()
    {
        return Course::all();
    }

    /**
     * Создать новый курс
     */
    public function createCourse(array $data)
    {
        return Course::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'description_modules' => $data['description_modules'] ?? null,
            'skills' => $data['skills'] ?? [],
        ]);
    }

    /**
     * Получить подробности курса
     */
    public function getCourseDetails(int $id): array
    {
        try {
            $course = Course::with(['modules.topics', 'modules.quizzes'])->findOrFail($id);
            return $this->formatCourseForMainPage($course);
        } catch (\Exception $e) {
            \Log::error('Failed to get course details', ['error' => $e->getMessage()]);
            throw $e; // или вернуть пустую структуру
        }
    }

    protected function formatCourseForMainPage($course): array
    {
        return [
            'course_title' => $course->title,
            'course_description' => $course->description,
            'modules' => $course->modules->map(function ($module) {
                $topics = $module->topics->map(fn($topic) => [
                    'title' => $topic->title
                ])->values();

                if (optional($module->quizzes)->firstWhere('quiz_type', 'module_final')) {
                    $topics->push(['title' => 'Итоговый тест по модулю']);
                }

                return [
                    'id' => $module->id,
                    'module_title' => $module->title,
                    'module_description' => $module->description,
                    'topics_count' => $module->topics->count(),
                    'topics' => $topics,
                ];
            }),
        ];
    }

    /**
     * Обновить курс
     */
    public function updateCourse($id, array $data)
    {
        $course = Course::findOrFail($id);

        $course->update([
            'title' => $data['title'] ?? $course->title,
            'description' => $data['description'] ?? $course->description,
            'description_modules' => $data['description_modules'] ?? $course->description_modules,
            'skills' => $data['skills'] ?? $course->skills,
        ]);

        return $course;
    }

    /**
     * Удалить курс
     */
    public function deleteCourse($id)
    {
        \Log::info('Deleting course', ['id' => $id, 'type' => gettype($id)]);
        $course = Course::findOrFail($id);
        \Log::info('Found course', ['course_id' => $course->id, 'title' => $course->title]);
        $course->delete();
        \Log::info('Course deleted successfully');
    }
}

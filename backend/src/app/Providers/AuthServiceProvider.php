<?php

namespace App\Providers;

use App\Models\Content\Assessments\Quiz;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // ...
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Право для управления тестами (админы/преподаватели)
        Gate::define('manage-quizzes', function ($user) {
            return $user->hasRole('admin') || $user->hasRole('teacher'); // Используйте Spatie или свою логику
        });

        // Право для просмотра теста студентом
        Gate::define('view-student-quiz', function ($user, Quiz $quiz) {
            if (!$user->hasRole('student')) {
                return false;
            }
            // Проверяем, имеет ли студент доступ к quizable (например, модуль или курс)
            $quizable = $quiz->quizable;
            if (!$quizable) {
                return false;
            }
            // Пример: студент должен быть записан на курс, связанный с quizable
            return $user->enrolledCourses()->where('course_id', $quizable->course_id ?? $quizable->id)->exists();
        });
    }
}

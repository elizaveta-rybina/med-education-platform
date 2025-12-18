<?php

use App\Http\Controllers\Content\{Assessments\QuizAttemptController,
    Assessments\QuizController,
    CourseController,
    LectureAttachmentController,
    LectureController,
    ModuleController,
    TopicController,
    AssignmentController};
use App\Http\Controllers\Content\Assessments\UserAnswerController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.api')->prefix('student')->group(function () {

    // Просмотр контента (курсы, модули, лекции и т.д.)
    Route::prefix('content')->group(function () {

        Route::get('courses', [CourseController::class, 'indexForStudent']);
        Route::get('courses/{course}', [CourseController::class, 'showForStudent']);

        Route::get('courses/{course}/modules', [ModuleController::class, 'getByCourse']);
        Route::get('modules/{module}/topics', [TopicController::class, 'indexByModule']);

        Route::get('lectures/{lecture}', [LectureController::class, 'showForStudent']);

        // Вложения лекций (публичный доступ для студентов)
        Route::get('lectures/{lectureId}/attachments', [LectureAttachmentController::class, 'index']);
        Route::get('lectures/{lectureId}/attachments/{id}', [LectureAttachmentController::class, 'show']);


        Route::prefix('quizzes')->group(function () {
            Route::get('{quiz}', [QuizController::class, 'showForStudent']);

            Route::post('{quiz}/attempts', [QuizAttemptController::class, 'start']);

            Route::post('{quiz}/submit-answers', [QuizAttemptController::class, 'submitAnswers']);

        });
    });

});

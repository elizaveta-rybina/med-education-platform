<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Content\{Assessments\QuizAttemptController,
    Assessments\QuizController,
    CourseController,
    LectureController,
    LectureImageController,
    ModuleController,
    TopicController,
    TopicContentController};
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRolesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth.api', 'role:admin'])->prefix('admin')->group(function () {

    // Управление пользователями
    Route::prefix('users')->group(function () {
        Route::get('admins', [UserRolesController::class, 'getAdmins']);
        Route::post('staff', [AuthController::class, 'registerStaff']);
        Route::post('students', [UserRolesController::class, 'registerVerifiedStudent']); // если есть
        Route::put('{user}', [UserController::class, 'update']);
        Route::delete('{user}', [UserController::class, 'destroy']);
    });

    // Управление контентом
    Route::prefix('content')->group(function () {

        // Курсы
        Route::apiResource('courses', CourseController::class);
        Route::get('courses/{course}/modules', [ModuleController::class, 'getByCourse']);

        // Модули
        Route::post('modules/bulk', [ModuleController::class, 'storeBulk']);
        Route::apiResource('modules', ModuleController::class)->except(['index']);
        Route::get('modules/{module}/topics', [TopicController::class, 'indexByModule']);

        // Топики
        Route::post('topics/bulk', [TopicController::class, 'storeBulk']);
        Route::apiResource('topics', TopicController::class)->except(['index']);

        // Загрузка обложки темы
        Route::post('topics/{topic}/cover', [TopicController::class, 'uploadCover']);

        // Контент топиков
        Route::prefix('topics/{topic}/contents')->group(function () {
            Route::get('/', [TopicContentController::class, 'index']);
            Route::post('/', [TopicContentController::class, 'store']);
            Route::put('{item}', [TopicContentController::class, 'update']);
            Route::delete('{item}', [TopicContentController::class, 'destroy']);
        });

        // Лекции
        Route::apiResource('lectures', LectureController::class)->except(['index']);
        Route::post('lectures/{lecture}/upload-doc', [LectureController::class, 'upload']);

        // Изображения лекций (загрузка и удаление)
        Route::prefix('lectures/{lectureId}/attachments/images')->group(function () {
            Route::post('/upload', [LectureImageController::class, 'upload']);
            Route::delete('/{attachmentId}', [LectureImageController::class, 'delete']);
        });

        // Квизы
        Route::get('quizzes', [QuizController::class, 'index']);
        Route::apiResource('quizzes', QuizController::class)->except(['index']);
        Route::prefix('quizzes/{quiz}/questions')->group(function () {
            Route::post('/', [QuizController::class, 'storeQuestion']);
            Route::put('{questionId}', [QuizController::class, 'updateQuestion']);
            Route::delete('{questionId}', [QuizController::class, 'destroyQuestion']);
        });


        Route::prefix('quizzes')->group(function () {
            Route::get('{quiz}', [QuizController::class, 'showForStudent']);

            Route::post('{quiz}/attempts', [QuizAttemptController::class, 'start']);

            Route::post('{quiz}/submit-answers', [QuizAttemptController::class, 'submitAnswers']);

        });
    });
});

<?php

use App\Http\Controllers\Content\{Assessments\QuizController, Assessments\UserAnswerController};
use Illuminate\Support\Facades\Route;

Route::middleware('auth.api')->group(function () {
    // Quiz submissions
    Route::post('quizzes/{quiz}/submit', [UserAnswerController::class, 'store']);

    // Content routes accessible by multiple roles
    Route::middleware('role:teacher,admin,student')->prefix('content')->group(function () {
        // Добавьте здесь общие маршруты для работы с контентом
    });
});

Route::middleware(['auth.api'])->prefix('student')->group(function () {
    Route::prefix('content')->group(function () {
        Route::prefix('quizzes')->group(function () {

            Route::get('/{quiz}', [QuizController::class, 'showForStudent']);
        });
    });
});


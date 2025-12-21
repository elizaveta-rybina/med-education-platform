<?php

use App\Http\Controllers\Content\CourseController;
use App\Http\Controllers\Content\TopicController;
use App\Http\Controllers\UniversityController;
use Illuminate\Support\Facades\Route;

Route::prefix('content')->group(function () {
    Route::get('courses', [CourseController::class, 'indexPublic']);
    Route::get('courses/{course}', [CourseController::class, 'showPublic']);

    // Топики (публичный доступ)
    Route::get('modules/{module}/topics', [TopicController::class, 'indexByModule']);
});

<?php

use App\Http\Controllers\Content\CourseController;
use App\Http\Controllers\UniversityController;
use Illuminate\Support\Facades\Route;

Route::prefix('content')->group(function () {
    Route::get('courses/{course}', [CourseController::class, 'show']);
    Route::get('universities', [UniversityController::class, 'index']);
});

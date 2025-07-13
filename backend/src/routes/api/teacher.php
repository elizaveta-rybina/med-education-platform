<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserRolesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth.api', 'role:teacher'])->prefix('management')->group(function () {
    // Student management
    Route::prefix('students')->group(function () {
    });

    Route::get('teachers', [UserRolesController::class, 'getTeachers']);
});

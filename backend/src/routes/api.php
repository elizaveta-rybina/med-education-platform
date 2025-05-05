<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegistrationController;
use App\Http\Controllers\Auth\StaffManagementController;
use App\Http\Controllers\Auth\StudentVerificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UniversityController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [RegistrationController::class, 'register']);
    Route::post('refresh-token', [AuthController::class, 'refresh']);
});

// Authenticated user routes
Route::middleware('auth:api')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [ProfileController::class, 'show']);
    });

    // Shared teacher and admin routes
    Route::middleware('role:teacher,admin')->prefix('teacher')->group(function () {
        // Список неподтвержденных студентов
        Route::get('students/pending-approval', [StudentVerificationController::class, 'pending']);

        // Подтверждение конкретного студента
        Route::post('students/{student}/verification', [StudentVerificationController::class, 'verification']);
    });

    // Admin-specific routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // Регистрация сотрудника (преподавателя/админа)
        Route::post('staff/register', [StaffManagementController::class, 'register']);

        // Подтверждение студента
        Route::post('students/{student}/verification', [StudentVerificationController::class, 'verification']);
    });
});

// Public university list
Route::get('universities', [UniversityController::class, 'index']);

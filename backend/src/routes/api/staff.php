<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserRolesController;
use Illuminate\Support\Facades\Route;

Route::middleware('role:admin,teacher')->group(function () {
    // Student management
    Route::prefix('students')->group(function () {
        Route::get('pending-approval', [StudentVerificationController::class, 'pending']);
        Route::post('{student}/verify', [AuthController::class, 'verifyStudent']);
        Route::get('/', [UserRolesController::class, 'getStudents']);
    });

    Route::get('teachers', [UserRolesController::class, 'getTeachers']);
});

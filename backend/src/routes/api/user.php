<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


// Профиль текущего пользователя
Route::prefix('me')->group(function () {
    Route::get('/', [UserController::class, 'me']);           // GET /api/me
    Route::put('/', [UserController::class, 'updateMe']);     // PUT /api/me
    Route::patch('/', [UserController::class, 'updateMe']);   // PATCH /api/me (если предпочитаешь)
    // Route::delete('/', [UserController::class, 'deleteMe']); // если нужно удаление аккаунта
});

// Только для админа — управление другими пользователями
Route::middleware('role:admin')->prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);                  // GET /api/users?role=student&is_verified=1
    Route::get('{id}', [UserController::class, 'show']);                // если нужно
    Route::put('{id}', [UserController::class, 'update']);              // обновить чужой профиль
    Route::delete('{id}', [UserController::class, 'destroy']);          // удалить пользователя
});

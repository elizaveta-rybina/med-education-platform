<?php

use App\Http\Controllers\UniversityController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Artisan;

Route::post('/register', [AuthController::class, 'register'])->withoutMiddleware('auth:api');
Route::post('/login', [AuthController::class, 'login'])->withoutMiddleware('auth:api');
Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::post('/universities', [UniversityController::class, 'store']);
});
Route::get('/universities', [UniversityController::class, 'index']);

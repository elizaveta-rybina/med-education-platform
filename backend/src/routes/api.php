<?php

use App\Services\TokenService;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    require __DIR__.'/api/public.php';
    require __DIR__.'/api/auth.php';

    Route::middleware('auth.api')->group(function () {
        require __DIR__ . '/api/student.php';
        require __DIR__.'/api/admin.php';
        require __DIR__.'/api/user.php';
    });

});

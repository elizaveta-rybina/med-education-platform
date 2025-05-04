<?php

use App\Http\Controllers\DebugTestController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('api-docs');
});
Route::get('/debug-test', [DebugTestController::class, 'test']);

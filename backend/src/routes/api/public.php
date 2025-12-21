<?php

use App\Http\Controllers\Content\CourseController;
use App\Http\Controllers\Content\ModuleController;
use App\Http\Controllers\UniversityController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Content\LectureAttachmentController;


Route::prefix('content')->group(function () {
    Route::get('courses', [CourseController::class, 'index']);
    Route::get('courses/{course}', [CourseController::class, 'show']);
    Route::get('modules/{module}/topics', [ModuleController::class, 'getModuleTopics']);
    Route::get('universities', [UniversityController::class, 'index']);
});

Route::prefix('lectures/{lectureId}/attachments')->group(function () {
    Route::get('/', [LectureAttachmentController::class, 'index']); // получить все вложения
    Route::post('/', [LectureAttachmentController::class, 'store']); // создать
    Route::get('{id}', [LectureAttachmentController::class, 'show']); // показать одно
    Route::put('{id}', [LectureAttachmentController::class, 'update']); // обновить
    Route::delete('{id}', [LectureAttachmentController::class, 'destroy']); // удалить
    Route::post('add-game', [LectureAttachmentController::class, 'addGameAttachment']);
});





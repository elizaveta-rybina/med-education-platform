<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\StudentVerificationController;
use App\Http\Controllers\Content\{
    Assessments\QuizController,
    AssignmentController,
    CourseController,
    LectureController,
    ModuleController,
    QuizAttemptController,
    TopicContentController,
    TopicController};
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRolesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth.api', 'role:admin'])->prefix('admin')->group(function () {
    // User management
    Route::prefix('users')->group(function () {
        Route::get('admins', [UserRolesController::class, 'getAdmins']);
        Route::post('staff', [AuthController::class, 'registerStaff']);
        Route::post('students', [StaffManagementController::class, 'registerVerifiedStudent']);
        Route::put('{user}', [UserController::class, 'update']);
        Route::delete('{user}', [UserController::class, 'destroy']);
    });

    // Content management
    Route::prefix('content')->group(function () {
        // Courses
        Route::prefix('courses')->group(function () {
            Route::get('/', [CourseController::class, 'index']);
            Route::post('/', [CourseController::class, 'store']);
            Route::get('{course}', [CourseController::class, 'show']);
            Route::put('{course}', [CourseController::class, 'update']);
            Route::delete('{course}', [CourseController::class, 'destroy']);
            Route::get('{course}/modules', [ModuleController::class, 'getByCourse']);
        });

        // Modules
        Route::prefix('modules')->group(function () {
            Route::post('bulk', [ModuleController::class, 'storeBulk']);
            Route::get('{module}', [ModuleController::class, 'show']);
            Route::put('{module}', [ModuleController::class, 'update']);
            Route::delete('{module}', [ModuleController::class, 'destroy']);
            Route::get('{module}/topics', [TopicController::class, 'indexByModule']);
        });

        // Topics
        Route::prefix('topics')->group(function () {
            Route::post('bulk', [TopicController::class, 'storeBulk']);
            Route::get('{topic}', [TopicController::class, 'show']);
            Route::put('{topic}', [TopicController::class, 'update']);
            Route::post('{topic}/cover', [TopicController::class, 'uploadCover']);
            Route::delete('{topic}', [TopicController::class, 'destroy']);

            // Topic contents
            Route::prefix('{topic}/contents')->group(function () {
                Route::get('/', [TopicContentController::class, 'index']);
                Route::post('/', [TopicContentController::class, 'store']);
                Route::put('{item}', [TopicContentController::class, 'update']);
                Route::delete('{item}', [TopicContentController::class, 'destroy']);
            });
        });

        // Lectures
        Route::prefix('lectures')->group(function () {
            Route::post('/', [LectureController::class, 'store']);
            Route::get('{lecture}', [LectureController::class, 'show']);
            Route::post('{lecture}/upload-doc', [LectureController::class, 'upload']);
            Route::put('{lecture}', [LectureController::class, 'update']);
            Route::delete('{lecture}', [LectureController::class, 'destroy']);
        });

        // Assignments
        Route::prefix('assignments')->group(function () {
            Route::post('/', [AssignmentController::class, 'store']);
            Route::put('{assignment}', [AssignmentController::class, 'update']);
            Route::delete('{assignment}', [AssignmentController::class, 'destroy']);
        });
        Route::put('user-answers/{userAnswerId}/score', [\App\Http\Controllers\Content\AdminUserAnswerController::class, 'updateScore'])->middleware('auth:api', 'admin');
        // Quizzes

        Route::prefix('quizzes/{quiz}')->middleware('auth')->group(function () {
            Route::post('attempts', [QuizAttemptController::class, 'start']);
            Route::post('attempts/{attempt}/questions/{question}/answer', [QuizAttemptController::class, 'saveAnswer']);
            Route::post('attempts/{attempt}/complete', [QuizAttemptController::class, 'complete']);
        });

        Route::prefix('quizzes')->group(function () {
            Route::get('/', [QuizController::class, 'index']);
            Route::post('/', [QuizController::class, 'store']);
            Route::get('{quiz}', [QuizController::class, 'show']);
            Route::put('{quiz}', [QuizController::class, 'update']);
            Route::delete('{quiz}', [QuizController::class, 'destroy']);

            Route::prefix('{quiz}/questions')->group(function () {
                Route::post('/', [QuizController::class, 'storeQuestion']);
                Route::put('{questionId}', [QuizController::class, 'updateQuestion']);
                Route::delete('{questionId}', [QuizController::class, 'destroyQuestion']);

            });
        });
    });
});

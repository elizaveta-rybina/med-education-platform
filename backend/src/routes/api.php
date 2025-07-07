<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegistrationController;
use App\Http\Controllers\Auth\StaffManagementController;
use App\Http\Controllers\Auth\StudentVerificationController;
use App\Http\Controllers\Content\AssignmentController;
use App\Http\Controllers\Content\CourseController;
use App\Http\Controllers\Content\LectureController;
use App\Http\Controllers\Content\ModuleController;
use App\Http\Controllers\Content\QuizController;
use App\Http\Controllers\Content\TopicContentController;
use App\Http\Controllers\Content\TopicController;
use App\Http\Controllers\Content\UserAnswerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UniversityController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRolesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [RegistrationController::class, 'register']);
    Route::post('refresh-token', [AuthController::class, 'refresh']);
});

// Public content routes
Route::prefix('content')->group(function () {
    Route::get('courses/{course}', [CourseController::class, 'show']);
    Route::get('universities', [UniversityController::class, 'index']);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth.api')->group(function () {
    // Auth related
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [ProfileController::class, 'me']);
    });

    // Quiz submissions
    Route::post('quizzes/{quiz}/submit', [UserAnswerController::class, 'store']);

    /*
    |--------------------------------------------------------------------------
    | Teacher & Admin Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:teacher,admin')->prefix('management')->group(function () {
        // Student management
        Route::prefix('students')->group(function () {
            Route::get('pending-approval', [StudentVerificationController::class, 'pending']);
            Route::post('{student}/verify', [StudentVerificationController::class, 'verifyStudent']);
            Route::get('/', [UserRolesController::class, 'getStudents']);
        });

        // Teacher management
        Route::get('teachers', [UserRolesController::class, 'getTeachers']);
    });

    /*
    |--------------------------------------------------------------------------
    | Admin Only Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // User management
        Route::prefix('users')->group(function () {
            Route::get('admins', [UserRolesController::class, 'getAdmins']);
            Route::post('staff', [StaffManagementController::class, 'registerStaff']);
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

            });

            // Topics
            Route::prefix('topics')->group(function () {
                Route::post('bulk', [TopicController::class, 'storeBulk']);
                Route::get('{topic}', [TopicController::class, 'show']);
                Route::put('{topic}', [TopicController::class, 'update']);
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
                Route::post('upload-doc', [LectureController::class, 'upload']);
                Route::put('{lecture}', [LectureController::class, 'update']);
                Route::delete('{lecture}', [LectureController::class, 'destroy']);
            });

            // Assignments
            Route::prefix('assignments')->group(function () {
                Route::post('/', [AssignmentController::class, 'store']);
                Route::put('{assignment}', [AssignmentController::class, 'update']);
                Route::delete('{assignment}', [AssignmentController::class, 'destroy']);
            });

            // Quizzes
            Route::prefix('quizzes')->group(function () {
                Route::post('/', [QuizController::class, 'create']);
                Route::put('{quiz}', [QuizController::class, 'update']);
                Route::delete('{quiz}', [QuizController::class, 'destroy']);
            });
        });
    });
});

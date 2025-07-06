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

// Public routes
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [RegistrationController::class, 'register']);
Route::post('refresh-token', [AuthController::class, 'refresh']);
Route::post('/refresh', [AuthController::class, 'refresh']);
Route::get('courses/{course}', [CourseController::class, 'show']); // при желании получить конкретный курс

// Authenticated user routes
Route::middleware('auth:api')->group(function () {
    Route::post('quizzes/{quiz}/submit', [UserAnswerController::class, 'store']);
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [ProfileController::class, 'me']);
    });

    // Shared teacher and admin routes
    Route::middleware('role:teacher,admin')->prefix('teacher')->group(function () {
        // Список неподтвержденных студентов
        Route::get('students/pending-approval', [StudentVerificationController::class, 'pending']);

        // Подтверждение конкретного студента
        Route::post('students/{student}/verification', [StudentVerificationController::class, 'verifyStudent']);

        Route::get('/teachers', [UserRolesController::class, 'getTeachers']);
        Route::get('/students', [UserRolesController::class, 'getStudents']);
    });

    // Admin-specific routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/admins', [UserRolesController::class, 'getAdmins']);

        // Регистрация сотрудника (преподавателя/админа)
        Route::post('/staff/register', [StaffManagementController::class, 'registerStaff']);
        Route::post('/students/register', [StaffManagementController::class, 'registerVerifiedStudent']);

        // --- Курсы ---
        Route::post('courses', [CourseController::class, 'store']);
        Route::get('courses', [CourseController::class, 'index']);          // при желании получить список
        Route::put('courses/{course}', [CourseController::class, 'update']);
        Route::delete('courses/{course}', [CourseController::class, 'destroy']);
        Route::get('courses/{course}', [CourseController::class, 'show']);  // новый маршрут

        // --- Модули ---
        Route::post('modules/bulk', [ModuleController::class, 'storeBulk']);
        Route::get('modules/{module}', [ModuleController::class, 'show']);
        Route::put('modules/{module}', [ModuleController::class, 'update']);
        Route::delete('modules/{module}', [ModuleController::class, 'destroy']);

        // --- Темы ---
        Route::post('topics/bulk', [TopicController::class, 'storeBulk']);
        Route::get('topics/{topic}', [TopicController::class, 'show']);
        Route::put('topics/{topic}', [TopicController::class, 'update']);
        Route::delete('topics/{topic}', [TopicController::class, 'destroy']);

        // --- Контент тем (лекции и тесты) ---
        Route::post('topics/{topic}/contents', [TopicContentController::class, 'store']);
        Route::get('topics/{topic}/contents', [TopicContentController::class, 'index']); // список элементов по порядку
        Route::put('topics/{topic}/contents/{item}', [TopicContentController::class, 'update']);
        Route::delete('topics/{topic}/contents/{item}', [TopicContentController::class, 'destroy']);

        Route::post('/quizzes', [QuizController::class, 'create']);

        // --- Лекции ---
        Route::post('lectures', [LectureController::class, 'store']);
        Route::put('lectures/{lecture}', [LectureController::class, 'update']);
        Route::delete('lectures/{lecture}', [LectureController::class, 'destroy']);

        // --- Задания ---
        Route::post('assignments', [AssignmentController::class, 'store']);
        Route::put('assignments/{assignment}', [AssignmentController::class, 'update']);
        Route::delete('assignments/{assignment}', [AssignmentController::class, 'destroy']);

        // --- Тесты ---
        Route::put('quizzes/{quiz}', [QuizController::class, 'update']);
        Route::delete('quizzes/{quiz}', [QuizController::class, 'destroy']);

        // --- Пользователи ---
        Route::put('users/{user}', [UserController::class, 'update']);
        Route::delete('users/{user}', [UserController::class, 'destroy']);
    });
});
Route::post('/lectures/upload-doc', [LectureController::class, 'upload']);

// Public university list
Route::get('universities', [UniversityController::class, 'index']);

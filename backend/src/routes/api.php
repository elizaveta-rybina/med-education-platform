    <?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegistrationController;
use App\Http\Controllers\Auth\StaffManagementController;
use App\Http\Controllers\Auth\StudentVerificationController;
use App\Http\Controllers\Content\CourseController;
use App\Http\Controllers\Content\LectureController;
use App\Http\Controllers\Content\ModuleController;
    use App\Http\Controllers\Content\QuizController;
    use App\Http\Controllers\Content\TopicContentController;
use App\Http\Controllers\Content\TopicController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UniversityController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [RegistrationController::class, 'register']);
    Route::post('refresh-token', [AuthController::class, 'refresh']);
});
Route::get('courses/{course}', [CourseController::class, 'show']); // при желании получить конкретный курс

// Authenticated user routes
Route::middleware('auth:api')->group(function () {
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
    });

    // Admin-specific routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // Регистрация сотрудника (преподавателя/админа)
        Route::post('staff/register', [StaffManagementController::class, 'register']);

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

    });
});
Route::post('/lectures/upload-doc', [LectureController::class, 'upload']);

// Public university list
Route::get('universities', [UniversityController::class, 'index']);

<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->renderable(function (ModelNotFoundException $e, $request) {
            Log::error('ModelNotFoundException in QuestionController', [
                'model' => $e->getModel(),
                'ids' => $e->getIds(),
                'message' => $e->getMessage(),
            ]);
            return response()->json(['error' => 'Quiz not found'], 404);
        });
    }

    public function render($request, Throwable $e)
    {
        if ($e instanceof MethodNotAllowedHttpException) {
            return response()->json([
                'message' => 'Метод не разрешён для этого маршрута.',
                'error' => 'Method Not Allowed',
            ], 405);
        }

        if ($e instanceof ModelNotFoundException) {
            $modelName = class_basename($e->getModel());
            $ids = $e->getIds();

            // Формируем понятное сообщение
            $message = match ($modelName) {
                'Lecture' => 'Лекция не найдена',
                'LectureAttachment' => 'Изображение не найдено',
                default => 'Запрашиваемая запись не найдена',
            };

            if ($ids) {
                $message .= ' (ID: ' . implode(', ', (array)$ids) . ')';
            }

            // Если запрос ожидает JSON (API) — возвращаем JSON-ответ
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => $message,
                ], 404);
            }

            // Для обычных веб-запросов — стандартная 404 страница или abort
            abort(404, $message);
        }
        return parent::render($request, $e);
    }

}

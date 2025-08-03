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

        return parent::render($request, $e);
    }

}

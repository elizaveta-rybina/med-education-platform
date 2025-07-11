<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'auth.api' => \App\Http\Middleware\AuthenticateWithJWT::class,
            'jwt.refresh' => \Tymon\JWTAuth\Http\Middleware\RefreshToken::class,
            'role' => \App\Http\Middleware\CheckRole::class,
        ]);

        $middleware->group('api', [
            //\App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);
    })
    ->withProviders([
        Tymon\JWTAuth\Providers\LaravelServiceProvider::class,
    ])
    ->withExceptions(function (Exceptions $exceptions) {
//        $exceptions->render(function (UnauthorizedHttpException $e, Request $request) {
//            if ($request->is('api/*')) {
//                return response()->json([
//                    'status' => 'false',
//                    'message' => 'Unauthorized access. Please check your token.'
//                ], 401);
//            }
//        });
    })
    ->create();

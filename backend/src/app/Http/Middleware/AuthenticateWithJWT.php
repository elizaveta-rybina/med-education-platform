<?php

namespace App\Http\Middleware;

use App\Services\TokenService;
use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticateWithJWT
{
    protected TokenService $tokenService;

    public function __construct(TokenService $tokenService)
    {
        $this->tokenService = $tokenService;
    }

    public function handle(Request $request, Closure $next)
    {
        $token = JWTAuth::getToken();

        if (!$token || !$this->tokenService->hasToken($token->get())) {
            return response()->json(['error' => 'Unauthorized or token revoked'], 401);
        }

        return $next($request);
    }
}

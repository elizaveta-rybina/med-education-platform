<?php

namespace App\Http\Middleware;

use App\Services\RedisTokenService;
use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticateWithJWT
{
    protected RedisTokenService $redisTokenService;

    public function __construct(RedisTokenService $redisTokenService)
    {
        $this->redisTokenService = $redisTokenService;
    }

    public function handle(Request $request, Closure $next)
    {
        $token = JWTAuth::getToken();

        if (!$token || !$this->redisTokenService->hasToken($token->get())) {
            return response()->json(['error' => 'Unauthorized or token revoked'], 401);
        }

        return $next($request);
    }
}

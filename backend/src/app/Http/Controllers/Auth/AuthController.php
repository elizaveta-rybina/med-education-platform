<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Register\StaffRegisterRequest;
use App\Http\Requests\Register\UserRegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(protected AuthService  $authService) {}
    public function login(LoginRequest $request)
    {
        return $this->authService->login($request->validated());
    }
    public function logout(Request $request)
    {
        $accessToken = $request->bearerToken();
        $refreshToken = $request->cookie('refresh_token');
        return $this->authService->logout($accessToken, $refreshToken);
    }
    public function refresh(Request $request)
    {
        $refreshToken = $request->cookie('refresh_token');
        return $this->authService->refresh($refreshToken);
    }
    public function register(UserRegisterRequest $request)
    {
        return $this->authService->register($request->validated());
    }

    public function registerStaff(StaffRegisterRequest $request)
    {
        return $this->authService->registerStaff($request->validated());
    }
    public function verifyStudent($userId)
    {
        return $this->authService->verifyStudent((int)$userId);
    }

}

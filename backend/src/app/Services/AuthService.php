<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\JsonResponse;

class AuthService
{
    protected int $accessTTL;
    protected int $refreshTTL;

    public function __construct(
        protected UserRepository $userRepo,
        protected TokenService $tokenService,
    ) {
        $this->accessTTL = config('jwt.ttl', 60) * 60; // Добавлен default
        $this->refreshTTL = config('jwt.refresh_ttl', 7 * 24 * 60 * 60); // Используем конфиг
    }

    public function login(array $credentials): JsonResponse
    {
        try {
            if (!$accessToken = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Неверный email или пароль'], 401);
            }

            $user = JWTAuth::user();
            if (!$user) {
                return response()->json(['error' => 'Пользователь не найден'], 401);
            }

            $refreshToken = JWTAuth::customClaims(['refresh' => true])
                ->fromUser($user);

            $this->tokenService->storeAccessToken($accessToken, $this->accessTTL, $user->id);
            $this->tokenService->storeRefreshToken($refreshToken, $this->refreshTTL, $user->id);

            return response()->json([
                'token' => $accessToken,
                'token_type' => 'bearer',
                'expires_in' => $this->accessTTL,
            ])->cookie('refresh_token', $refreshToken, $this->refreshTTL / 60, null, null, true, true, false, 'Strict');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ошибка авторизации'], 500);
        }
    }

    public function refresh(?string $refreshToken): JsonResponse
    {
        try {
            if (!$refreshToken || !$this->tokenService->hasRefreshToken($refreshToken)) {
                return response()->json(['error' => 'Недействительный или отозванный refresh token'], 401);
            }

            JWTAuth::setToken($refreshToken);

            try {
                $payload = JWTAuth::getPayload();
                if (!$payload->get('refresh')) {
                    return response()->json(['error' => 'Недействительный refresh token'], 401);
                }

                $user = JWTAuth::authenticate();
                if (!$user) {
                    return response()->json(['error' => 'Пользователь не найден'], 401);
                }
            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                return response()->json(['error' => 'Недействительный refresh token'], 401);
            }

            $oldAccessToken = request()->bearerToken();
            if ($oldAccessToken) {
                $this->tokenService->revokeAccessToken($oldAccessToken);
            }

            $newAccessToken = JWTAuth::fromUser($user);
            $this->tokenService->storeAccessToken($newAccessToken, $this->accessTTL, $user->id);

            return response()->json([
                'token' => $newAccessToken,
                'token_type' => 'bearer',
                'expires_in' => $this->accessTTL,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ошибка обновления токена'], 500);
        }
    }

    public function logout(?string $accessToken, ?string $refreshToken = null): JsonResponse
    {
        try {
            if ($accessToken) {
                $this->tokenService->revokeAccessToken($accessToken);
            }

            if ($refreshToken) {
                $this->tokenService->revokeRefreshToken($refreshToken);
            }

            return response()->json(['message' => 'Успешный выход из системы'])
                ->withoutCookie('refresh_token');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ошибка при выходе из системы'], 500);
        }
    }

    public function register(array $data): JsonResponse
    {
        try {
            return DB::transaction(function () use ($data) {
                $user = $this->userRepo->createStudent($data);

                return response()->json([
                    'message' => $user->hasRole('unverified_student')
                        ? 'Регистрация успешна. Ожидается подтверждение университета.'
                        : 'Регистрация успешна!',
                    'token' => JWTAuth::fromUser($user),
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ошибка регистрации: ' . $e->getMessage()], 400);
        }
    }

    public function registerStaff(array $data): JsonResponse
    {
        try {
            return DB::transaction(function () use ($data) {
                $user = $this->userRepo->createStaff($data);

                return response()->json([
                    'message' => ucfirst($data['role'] ?? 'staff') . ' успешно зарегистрирован',
                    'user' => new UserResource($user->load('roles')),
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ошибка регистрации: ' . $e->getMessage()], 400);
        }
    }

    public function verifyStudent(int $studentId): JsonResponse
    {
        try {
            $student = $this->userRepo->findStudent($studentId);
            if (!$student) {
                return response()->json(['error' => 'Студент не найден'], 404);
            }

            if (!$student->education) {
                return response()->json(['error' => 'Пользователь не является студентом'], 400);
            }

            $this->userRepo->verifyStudent($student);
            return response()->json(['message' => 'Студент успешно подтверждён']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ошибка верификации: ' . $e->getMessage()], 400);
        }
    }
}

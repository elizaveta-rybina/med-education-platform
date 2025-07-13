<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class AuthService
{
    protected int $accessTTL;   // например, 15 минут
    protected int $refreshTTL;  // например, 7 дней (в минутах)

    public function __construct(
        protected UserRepository $userRepo,
        protected JWTAuth $jwt,
        protected RedisTokenService $redisTokenService,
    ) {
        $this->accessTTL = config('jwt.ttl') * 60;           // в секундах
        $this->refreshTTL = 7 * 24 * 60 * 60; // 7 дней в секундах
    }

    public function login(array $credentials): JsonResponse
    {
        if (!$accessToken = $this->jwt->attempt($credentials)) {
            return response()->json(['error' => 'Неверный email или пароль'], 401);
        }

        $user = $this->jwt->user();

        // Создаём refresh токен с claim 'refresh' и большим TTL
        $refreshToken = $this->jwt
            ->customClaims(['refresh' => true])
            ->fromUser($user);

        // Сохраняем оба токена в Redis с TTL
        $this->redisTokenService->storeAccessToken($accessToken, $this->accessTTL);
        $this->redisTokenService->storeRefreshToken($refreshToken, $this->refreshTTL);

        return response()->json([
            'token' => $accessToken,
            'token_type' => 'bearer',
            'expires_in' => $this->accessTTL,
        ])->cookie('refresh_token', $refreshToken, $this->refreshTTL / 60, null, null, true, true, false, 'Strict');
    }

    public function refresh(?string $refreshToken): JsonResponse
    {
        if (!$refreshToken || !$this->redisTokenService->hasRefreshToken($refreshToken)) {
            return response()->json(['error' => 'Refresh token not found or revoked'], 401);
        }

        $this->jwt->setToken($refreshToken);
        $payload = $this->jwt->getPayload();

        if (!$payload->get('refresh')) {
            return response()->json(['error' => 'Invalid refresh token'], 401);
        }

        $user = $this->jwt->toUser($refreshToken);

        $oldAccessToken = request()->bearerToken(); // получить токен из заголовка
        if ($oldAccessToken && $this->redisTokenService->hasAccessToken($oldAccessToken)) {
            $this->redisTokenService->revokeAccessToken($oldAccessToken);
        }

        $newAccessToken = $this->jwt->fromUser($user);
        $this->redisTokenService->storeAccessToken($newAccessToken, $this->accessTTL);

        return response()->json([
            'token' => $newAccessToken,
            'token_type' => 'bearer',
            'expires_in' => $this->accessTTL,
        ]);
    }


    public function logout(string $accessToken, ?string $refreshToken = null): JsonResponse
    {
        $this->redisTokenService->revokeAccessToken($accessToken);

        if ($refreshToken) {
            $this->redisTokenService->revokeRefreshToken($refreshToken);
        }

        return response()->json(['message' => 'Успешный выход из системы'])
            ->withoutCookie('refresh_token');
    }


    public function register(array $data)
    {
        return DB::transaction(function () use ($data) {
            $user = $this->userRepo->createStudent($data);

            return response()->json([
                'message' => $user->hasRole('unverified_student')
                    ? 'Регистрация успешна. Ожидается подтверждение университета.'
                    : 'Регистрация успешна!',
                'token' => $this->jwt->fromUser($user),
            ], 201);
        });
    }

    public function registerStaff(array $data)
    {
        return DB::transaction(function () use ($data) {
            $user = $this->userRepo->createStaff($data);

            return response()->json([
                'message' => ucfirst($data['role']) . ' успешно зарегистрирован',
                'user' => new UserResource($user->load('roles')),
            ], 201);
        });
    }

    public function verifyStudent(int $studentId)
    {
        $student = $this->userRepo->findStudent($studentId);

        if (!$student->education) {
            return response()->json(['error' => 'User is not a student'], 400);
        }

        // Обновляем статус верификации
        $this->userRepo->verifyStudent($student);

        return response()->json(['message' => 'Студент успешно подтверждён']);
    }

}

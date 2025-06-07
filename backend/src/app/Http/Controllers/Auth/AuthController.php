<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UsersEducation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Неверный email или пароль'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Не удалось создать токен'], 500);
        }

        JWTAuth::factory()->setTTL(10080); // 7 дней для refresh
        $refreshToken = JWTAuth::claims(['refresh' => true])->fromUser(auth()->user());

        // Восстанавливаем TTL для обычных токенов, если нужно
        JWTAuth::factory()->setTTL(config('jwt.ttl'));

        return response()
            ->json([
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60
            ])
            ->cookie('refresh_token', $refreshToken, 10080, null, null, true, true, false, 'Strict'); // httpOnly secure cookie
    }
    public function logout()
    {
        try {
            auth()->logout();
            return response()->json(['message' => 'Успешный выход из системы']);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Не удалось выйти из системы'], 500);
        }
    }

    public function refresh(Request $request)
    {
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return response()->json(['error' => 'Refresh token not found'], 401);
        }

        try {
            JWTAuth::setToken($refreshToken);
            $payload = JWTAuth::getPayload();

            // Проверим, что это действительно refresh токен
            if (!$payload->get('refresh')) {
                return response()->json(['error' => 'Invalid refresh token'], 401);
            }

            $user = JWTAuth::toUser($refreshToken);

            $newAccessToken = JWTAuth::fromUser($user);

            return response()->json([
                'token' => $newAccessToken,
                'token_type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60
            ]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Refresh failed'], 401);
        }
    }



}

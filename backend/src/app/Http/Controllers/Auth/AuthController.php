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

        return response()->json([
            //'user' => auth()->user(),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
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



}

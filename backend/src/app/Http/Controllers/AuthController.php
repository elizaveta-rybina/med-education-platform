<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UsersEducation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Валидация
        $validator = Validator::make($request->all(), [
            'username'      => 'required|string|unique:users,username|max:50',
            'email'         => 'required|email|unique:users,email|max:100',
            'password'      => 'required|string|min:6|confirmed',
            'birth_date'    => 'required|date',
            'last_name'     => 'required|string|max:50',
            'first_name'    => 'required|string|max:50',
            'middle_name'   => 'nullable|string|max:50',

            // Образование (необязательно, но если есть — тогда обязательно всё)
            'university_id' => 'nullable|exists:universities,id',
            'faculty_code'  => 'required_with:university_id|string|max:50',
            'faculty_name'  => 'required_with:university_id|string|max:100',
            'course'        => 'required_with:university_id|integer|between:1,6',
            'group_number'  => 'required_with:university_id|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Создание пользователя
        $user = User::create([
            'username'    => $request->username,
            'email'       => $request->email,
            'password'    => $request->password, // каст автоматически хеширует
            'birth_date'  => $request->birth_date,
            'last_name'   => $request->last_name,
            'first_name'  => $request->first_name,
            'middle_name' => $request->middle_name,
        ]);

        // Если пользователь указал университет — создаем образование
        if ($request->filled('university_id')) {
            UsersEducation::create([
                'user_id'       => $user->id,
                'university_id' => $request->university_id,
                'faculty_code'  => $request->faculty_code,
                'faculty_name'  => $request->faculty_name,
                'course'        => $request->course,
                'group_number'  => $request->group_number,
            ]);
        }

        // Выдача JWT токена
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Регистрация успешна',
            'user'    => $user,
            'token'   => $token,
        ]);
    }
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
            'user' => auth()->user(),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
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

    public function me()
    {
        return response()->json(auth()->user()->load('education', 'roles'));
    }

}

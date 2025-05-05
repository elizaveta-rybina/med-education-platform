<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UsersEducation;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class RegistrationController extends Controller
{
    /**
     * Регистрация пользователя с автоматическим назначением роли
     */
    public function register(Request $request)
    {
        $validator = $this->validateRegistration($request);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $this->createUser($request->all());

        $this->handleUserEducation($user, $request);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => $this->getSuccessMessage($user),
            'user' => $user->load('roles'),
            'token' => $token,
        ], 201);
    }

    /**
     * Валидация входящих данных
     */
    protected function validateRegistration(Request $request)
    {
        $rules = [
            'username' => 'required|string|unique:users,username|max:50',
            'email' => 'required|email|unique:users,email|max:100',
            'password' => 'required|string|min:6|confirmed',
            'birth_date' => 'required|date',
            'last_name' => 'required|string|max:50',
            'first_name' => 'required|string|max:50',
            'middle_name' => 'nullable|string|max:50',
        ];

        // Добавляем правила для студенческих данных, если они есть
        if ($request->has('university_id')) {
            $rules += [
                'university_id' => 'required|exists:universities,id',
                'faculty' => 'required|string|max:255',
                'course' => 'required|integer|between:1,6',
                'group' => 'required|string|max:50',
            ];
        }

        return Validator::make($request->all(), $rules);
    }

    /**
     * Создание пользователя
     */
    protected function createUser(array $data): User
    {
        return User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $data['password'],
            'birth_date' => $data['birth_date'],
            'last_name' => $data['last_name'],
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'] ?? null,
            'is_verified' => false,
        ]);
    }

    /**
     * Обработка образовательных данных пользователя
     */
    protected function handleUserEducation(User $user, Request $request): void
    {
        if ($request->filled('university_id')) {
            $this->createEducationRecord($user, $request);
            $this->assignRole($user, 'unverified_student');
        } else {
            $this->assignRole($user, 'user');
        }
    }

    /**
     * Создание записи об образовании
     */
    protected function createEducationRecord(User $user, Request $request): void
    {
        UsersEducation::create([
            'user_id' => $user->id,
            'university_id' => $request->university_id,
            'faculty' => $request->faculty,
            'course' => $request->course,
            'group' => $request->group,
            'start_date' => now(),
            'is_current' => true,
        ]);
    }

    /**
     * Назначение роли пользователю
     */
    protected function assignRole(User $user, string $roleName): void
    {
        $role = Role::where('name', $roleName)->firstOrFail();
        $user->roles()->attach($role);
    }

    /**
     * Сообщение об успешной регистрации
     */
    protected function getSuccessMessage(User $user): string
    {
        return $user->hasRole('unverified_student')
            ? 'Регистрация успешна. Требуется подтверждение от администрации университета.'
            : 'Регистрация успешна. Добро пожаловать!';
    }
}

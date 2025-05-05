<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class StudentVerificationController extends Controller
{
    public function verifyStudent(Request $request, $userId)
    {
        $user = User::findOrFail($userId);

        // Получаем роли авторизованного пользователя
        $roles = auth()->user()->roles->pluck('name');  // Получаем коллекцию имен ролей

        // Проверяем, что студент существует
        if (!$user->education) {
            return response()->json(['error' => 'User is not a student'], 400);
        }

        // Если у пользователя есть роль admin, пропускаем проверку
        if ($roles->contains('admin')) {
            return $this->verifyStudentAsAdmin($user);
        }

        // Если у пользователя есть роль teacher, проверяем университет
        if ($roles->contains('teacher')) {
            // Студент должен быть из того же университета
            if ($user->education->university_id != auth()->user()->education->university_id) {
                return response()->json(['error' => 'Not authorized to verify this student'], 403);
            }
        }

        // Получаем ID роли "unverified_student" и "student"
        $unverifiedStudentRoleId = Role::where('name', 'unverified_student')->first()->id;
        $studentRoleId = Role::where('name', 'student')->first()->id;

        // Удаляем временную роль и добавляем роль студента
        $user->roles()->detach($unverifiedStudentRoleId);
        $user->roles()->attach($studentRoleId);

        // Обновляем статус проверки
        $user->update(['is_verified' => true]);

        return response()->json([
            'message' => 'Student verified successfully',
            //'user' => $user->fresh()->load('roles'),
        ]);
    }

    // Логика для админа
    protected function verifyStudentAsAdmin($user)
    {
        // Получаем ID роли "unverified_student" и "student"
        $unverifiedStudentRoleId = Role::where('name', 'unverified_student')->first()->id;
        $studentRoleId = Role::where('name', 'student')->first()->id;

        // Удаляем временную роль и добавляем роль студента
        $user->roles()->detach($unverifiedStudentRoleId);
        $user->roles()->attach($studentRoleId);

        // Обновляем статус проверки
        $user->update(['is_verified' => true]);

        return response()->json([
            'message' => 'Student verified successfully',
            //'user' => $user->fresh()->load('roles'),
        ]);
    }
}

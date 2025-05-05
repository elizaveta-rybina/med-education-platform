<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class StudentVerificationController extends Controller
{
    public function verifyStudent(Request $request, $userId)
    {
        $user = User::findOrFail($userId);

        // Определяем роль авторизованного пользователя
        $role = auth()->user()->getRoleNames()->first();

        // Проверяем, что студент существует
        if (!$user->education) {
            return response()->json(['error' => 'User is not a student'], 400);
        }

        if ($role === 'teacher') {
            // Проверка для учителя: студент должен быть из того же университета
            if ($user->education->university_id != auth()->user()->education->university_id) {
                return response()->json(['error' => 'Not authorized to verify this student'], 403);
            }
        }

        // Удаляем временную роль и добавляем роль студента
        $user->roles()->detach(config('roles.unverified_student'));
        $user->roles()->attach(config('roles.student'));

        // Обновляем статус проверки
        $user->update(['is_verified' => true]);

        return response()->json([
            'message' => 'Student verified successfully',
            'user' => $user->fresh()->load('roles'),
        ]);
    }
}

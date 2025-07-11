<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Models\UsersEducation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class StaffManagementController extends Controller
{
    /**
     * Регистрация преподавателя/администратора
     */
    public function registerStaff(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username|max:50',
            'email' => 'required|email|unique:users,email|max:100',
            'password' => 'required|string|min:6|confirmed',
            'last_name' => 'required|string|max:50',
            'first_name' => 'required|string|max:50',
            'middle_name' => 'nullable|string|max:50',
            'phone_number' => 'nullable|string|max:20',
            'role' => 'required|in:teacher,admin',
            'university_id' => 'required|exists:universities,id',
            'faculty' => 'required_if:role,teacher|string|max:255',
            'department' => 'required_if:role,teacher|string|max:255',
            'position' => 'required_if:role,teacher|string|max:255',
            'academic_degree' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'last_name' => $request->last_name,
                'first_name' => $request->first_name,
                'middle_name' => $request->middle_name,
                'is_verified' => true,
            ]);

            $role = Role::where('name', $request->role)->firstOrFail();
            $user->roles()->attach($role);

            if ($request->role === 'teacher') {
                UsersEducation::create([
                    'user_id' => $user->id,
                    'university_id' => $request->university_id,
                    'faculty' => $request->faculty,
                    'department' => $request->department,
                    'position' => $request->position,
                    'academic_degree' => $request->academic_degree,
                    'start_date' => now(),
                    'is_current' => true,
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => ucfirst($request->role) . ' registered successfully',
                'user' => $user->load('roles'),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Registration failed: ' . $e->getMessage()], 500);
        }
    }

    public function registerVerifiedStudent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username|max:50',
            'email' => 'required|email|unique:users,email|max:100',
            'password' => 'required|string|min:6|confirmed',
            'birth_date' => 'required|date',
            'last_name' => 'required|string|max:50',
            'first_name' => 'required|string|max:50',
            'middle_name' => 'nullable|string|max:50',
            'university_id' => 'required|exists:universities,id',
            'faculty' => 'required|string|max:255',
            'course' => 'required|integer|between:1,6',
            'group' => 'required|string|max:50',
            'specialization' => 'required|string|max:100',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'birth_date' => $request->birth_date,
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name ?? null,
            'is_verified' => true, // сразу подтверждаем
        ]);

        UsersEducation::create([
            'user_id' => $user->id,
            'university_id' => $request->university_id,
            'faculty' => $request->faculty,
            'course' => $request->course,
            'group' => $request->group,
            'specialization' => $request->specialization,
            'start_date' => now(),
            'is_current' => true,
        ]);

        $role = Role::where('name', 'student')->firstOrFail();
        $user->roles()->attach($role);

        return response()->json([
            'message' => 'Подтвержденный студент успешно зарегистрирован',
            'user' => $user->load('roles'),
        ], 201);
    }

}

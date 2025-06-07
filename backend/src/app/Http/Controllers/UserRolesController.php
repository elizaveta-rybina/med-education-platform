<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserRolesController extends Controller
{
    public function getTeachers(): JsonResponse
    {
        $teachers = User::whereHas('roles', function ($q) {
            $q->where('name', 'teacher');
        })
            ->with([
                'education.university',
                'courses'
            ])
            ->get()
            ->map(function ($user) {
                return [
                    'id' =>  $user->id,
                    'basic_info' => [
                        'name' => $user->full_name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'registration_date' => $user->created_at->format('Y-m-d'),
                    ],
                    'professional_info' => [
                        'university' => optional($user->education?->university)->name ?? '—',
                        'faculty' => $user->education?->faculty ?? '—',
                        'position' => $user->education?->position ?? '—',
                        'academic_degree' => $user->education?->academic_degree ?? '—',
                        'department' => $user->education?->department ?? '—',
                    ],
                    'access_control' => [
                        'role' => 'преподаватель',
                        'status' => $user->education?->is_current ? 'active' : 'inactive',
                        'assigned_courses' => $user->courses->pluck('id')->map(fn ($id) => "course_$id"),
                    ],
                ];
            });

        return response()->json($teachers);
    }

    public function getStudents(Request $request): JsonResponse
    {
        $isVerified = $request->query('verified', 'true') === 'true';

        $students = User::where(function ($q) use ($isVerified) {
            $q->whereHas('roles', function ($q) use ($isVerified) {
                if ($isVerified) {
                    $q->where('name', 'student'); // verified students
                } else {
                    $q->where('name', 'unverified_student'); // unverified students
                }
            });
        })
            ->where('is_verified', $isVerified)
            ->with(['education.university'])
            ->get()
            ->filter(fn($user) => $user->education && $user->education->isStudent())
            ->map(function ($user) {
                return [
                    'id' =>  $user->id,
                    'basic_info' => [
                        'name' => $user->full_name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'registration_date' => $user->created_at->format('Y-m-d'),
                        'group' => $user->education->group ?? '—',
                    ],
                    'academic_info' => [
                        'university' => optional($user->education?->university)->name ?? '—',
                        'specialization' => $user->education?->specialization ?? '—',
                    ],
                ];
            });

        return response()->json($students->values());
    }

    public function getAdmins(): JsonResponse
    {
        $admins = User::whereHas('roles', function ($q) {
            $q->where('name', 'admin');
        })
            ->with(['education.university'])
            ->get()
            ->map(function ($user) {
                return [
                    'id' =>  $user->id,
                    'basic_info' => [
                        'name' => $user->full_name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'registration_date' => $user->created_at->format('Y-m-d'),
                    ],
                    'professional_info' => [
                        'university' => optional($user->education?->university)->name ?? '—',
                        'faculty' => $user->education?->faculty ?? '—',
                        'position' => $user->education?->position ?? '—',
                        'academic_degree' => $user->education?->academic_degree ?? '—',
                        'department' => $user->education?->department ?? '—',
                    ],
                    'access_control' => [
                        'role' => 'администратор',
                        'status' => $user->is_verified ? 'active' : 'inactive'
                    ],
                ];
            });

        return response()->json($admins);
    }


}

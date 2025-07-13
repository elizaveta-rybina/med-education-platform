<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Role;
use App\Models\UsersEducation;

class UserRepository
{
    public function createStudent(array $data): User
    {
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'birth_date' => $data['birth_date'],
            'last_name' => $data['last_name'],
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'] ?? null,
            'is_verified' => false,
        ]);

        if (isset($data['university_id'])) {
            UsersEducation::create([
                'user_id' => $user->id,
                'university_id' => $data['university_id'],
                'faculty' => $data['faculty'],
                'course' => $data['course'],
                'group' => $data['group'],
                'specialization' => $data['specialization'],
                'start_date' => now(),
                'is_current' => true,
            ]);
        }

        $user->roles()->attach(Role::where('name', 'student')->first());

        return $user;
    }

    public function createStaff(array $data): User
    {
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'last_name' => $data['last_name'],
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'] ?? null,
            'is_verified' => true,
        ]);

        $user->roles()->attach(Role::where('name', $data['role'])->first());

        if ($data['role'] === 'teacher') {
            UsersEducation::create([
                'user_id' => $user->id,
                'university_id' => $data['university_id'],
                'faculty' => $data['faculty'],
                'department' => $data['department'],
                'position' => $data['position'],
                'academic_degree' => $data['academic_degree'] ?? null,
                'start_date' => now(),
                'is_current' => true,
            ]);
        }

        return $user;
    }

    public function findStudent(int $id): User
    {
        return User::with('education')->findOrFail($id);
    }

    public function verifyStudent(User $student): void
    {
        $student->roles()->detach(Role::where('name', 'unverified_student')->first());
        $student->roles()->attach(Role::where('name', 'student')->first());
        $student->update(['is_verified' => true]);
    }

    public function update(int $id, array $data): User
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function delete(int $id): void
    {
        $user = User::findOrFail($id);
        $user->delete();
    }

    public function filterByRoleAndVerification(?string $role, ?bool $isVerified, int $perPage = 15)
    {
        $query = User::query()->with(['roles', 'education']);

        if ($role) {
            $query->whereHas('roles', fn($q) => $q->where('name', $role));
        }

        if (!is_null($isVerified)) {
            $query->where('is_verified', $isVerified);
        }

        return $query->paginate($perPage);
    }
}

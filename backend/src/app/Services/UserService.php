<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;

class UserService
{
    public function __construct(protected UserRepository $userRepo) {}

    public function update(int $id, array $data): User
    {
        return $this->userRepo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->userRepo->delete($id);
    }

    public function getUsersByRoleAndVerification(?string $role, ?bool $isVerified, int $perPage = 15)
    {
        return $this->userRepo->filterByRoleAndVerification($role, $isVerified, $perPage);
    }
}


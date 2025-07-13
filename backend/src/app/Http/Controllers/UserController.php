<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\UserFilterRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function __construct(protected UserService $userService) {}

    public function me(): JsonResponse
    {
        $user = auth()->user()->load('roles', 'education');

        return response()->json(new UserResource($user));
    }

    public function update(UpdateUserRequest $request, int $id): JsonResponse
    {
        $user = $this->userService->update($id, $request->validated());

        return response()->json([
            'message' => 'Пользователь успешно обновлён',
            'data' => new UserResource($user),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->userService->delete($id);

        return response()->json([
            'message' => 'Пользователь успешно удалён',
        ]);
    }

    public function index(UserFilterRequest $request)
    {
        $users = $this->userService->getUsersByRoleAndVerification(
            $request->input('role'),
            $request->has('is_verified') ? (bool)$request->input('is_verified') : null,
            $request->input('per_page', 15)
        );

        return UserResource::collection($users);
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'middle_name' => $this->middle_name,
            'birth_date' => $this->birth_date?->format('Y-m-d'),
            'is_verified' => $this->is_verified,
            'status' => $this->is_verified ? 'verified' : 'unverified',
            'roles' => $this->whenLoaded('roles', fn () => $this->roles->pluck('name')),
            'education' => $this->whenLoaded('education', fn () => [
                'university_id' => $this->education->university_id,
                'faculty' => $this->education->faculty,
                'course' => $this->education->course,
                'group' => $this->education->group,
                'specialization' => $this->education->specialization,
                'department' => $this->education->department ?? null,
                'position' => $this->education->position ?? null,
                'academic_degree' => $this->education->academic_degree ?? null,
            ]),
        ];
    }
}

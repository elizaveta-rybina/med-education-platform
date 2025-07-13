<?php

namespace App\Http\Requests\Register;

use Illuminate\Foundation\Http\FormRequest;

class StaffRegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
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
        ];
    }
}

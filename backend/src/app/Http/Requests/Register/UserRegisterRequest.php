<?php

namespace App\Http\Requests\Register;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
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

        if ($this->filled('university_id')) {
            $rules += [
                'university_id' => 'required|exists:universities,id',
                'faculty' => 'required|string|max:255',
                'course' => 'required|integer|between:1,6',
                'group' => 'required|string|max:50',
                'specialization' => 'required|string|max:100',
            ];
        }

        return $rules;
    }
}

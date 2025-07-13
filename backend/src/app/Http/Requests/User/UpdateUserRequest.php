<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => 'sometimes|string|max:50',
            'last_name' => 'sometimes|string|max:50',
            'middle_name' => 'nullable|string|max:50',
            'birth_date' => 'sometimes|date',
            // добавить поля которые можно обновлять
        ];
    }
}

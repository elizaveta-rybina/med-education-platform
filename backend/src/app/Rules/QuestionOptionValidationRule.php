<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class QuestionOptionValidationRule implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        $validator = validator($value, [
            'text' => ['required', 'string'],
            'is_correct' => ['boolean'],
            'matching_data' => ['nullable', 'json'],
            'order' => ['required', 'integer', 'min:0'],
        ]);

        return !$validator->fails();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return 'The :attribute contains invalid option data.';
    }
}

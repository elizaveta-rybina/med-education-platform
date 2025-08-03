<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class QuestioneValidator
{
    public function validatores(): array
    {
        return [];
    }
}

class QuestionValidationRule implements Rule
{
    protected QuestioneValidator $questioneValidator;

    public function __construct(QuestioneValidator $questioneValidator)
    {
        $this->questioneValidator = $questioneValidator;
    }
    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        $myvalidatores = $this->questioneValidator->validatores();
        $validator = $myvalidatores;

        return !$validator->fails();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return 'The :attribute contains invalid question data.';
    }
}

<?php

namespace App\Services\Contracts;

use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\QuestionOption;

interface QuestionOptionServiceInterface
{
    public function syncOptions(Quiz $quiz, Question $question, array $optionsData): \Illuminate\Database\Eloquent\Collection;

    public function createMultipleOptions(Quiz $quiz, Question $question, array $optionsData): \Illuminate\Database\Eloquent\Collection;


}

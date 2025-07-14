<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class UserTextAnswer extends Model
{
    protected $fillable = ['answer_text'];

    public function userAnswers()
    {
        return $this->morphMany(UserAnswer::class, 'user_answerable');
    }
}

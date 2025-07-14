<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class UserChoiceAnswer extends Model
{
    protected $fillable = ['choice_answer_id'];

    public function userAnswers()
    {
        return $this->morphMany(UserAnswer::class, 'user_answerable');
    }

    public function choiceAnswer()
    {
        return $this->belongsTo(ChoiceAnswer::class);
    }
}

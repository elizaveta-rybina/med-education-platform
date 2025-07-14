<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{
    protected $fillable = ['quiz_attempt_id', 'question_id', 'user_answerable_type', 'user_answerable_id', 'score'];

    public function quizAttempt()
    {
        return $this->belongsTo(QuizAttempt::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function userAnswerable()
    {
        return $this->morphTo();
    }
}

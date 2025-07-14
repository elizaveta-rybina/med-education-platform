<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class UserMatchingAnswer extends Model
{
    protected $fillable = ['matching_answer_id', 'user_match_value'];

    public function userAnswers()
    {
        return $this->morphMany(UserAnswer::class, 'user_answerable');
    }

    public function matchingAnswer()
    {
        return $this->belongsTo(MatchingAnswer::class);
    }
}

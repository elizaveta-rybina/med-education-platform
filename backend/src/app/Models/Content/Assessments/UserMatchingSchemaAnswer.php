<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class UserMatchingSchemaAnswer extends Model
{
    protected $fillable = ['matching_schema_answer_id', 'user_schema_value'];

    public function userAnswers()
    {
        return $this->morphMany(UserAnswer::class, 'user_answerable');
    }

    public function matchingSchemaAnswer()
    {
        return $this->belongsTo(MatchingSchemaAnswer::class);
    }
}

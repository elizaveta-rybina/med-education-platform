<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class MatchingAnswer extends Model
{
    protected $fillable = ['match_key', 'match_value'];

    public function answers()
    {
        return $this->morphMany(Answer::class, 'answerable');
    }
}

<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class ChoiceAnswer extends Model
{
    protected $fillable = ['answer_text', 'is_correct'];

    public function answers()
    {
        return $this->morphMany(Answer::class, 'answerable');
    }
}

<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = ['question_id', 'answerable_type', 'answerable_id', 'order'];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function answerable()
    {
        return $this->morphTo();
    }
}

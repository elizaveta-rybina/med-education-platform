<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = ['question_id', 'answerable_id', 'answerable_type', 'order'];

    public function answerable()
    {
        return $this->morphTo();
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}

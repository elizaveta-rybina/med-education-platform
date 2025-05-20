<?php

namespace App\Models\Content;

use App\Models\Content\Assessments\Quiz;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    protected $fillable = [
        'topic_id',
        'title',
        'description'
    ];

    public function quizzes()
    {
        return $this->morphOne(Quiz::class, 'quizable');
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

}

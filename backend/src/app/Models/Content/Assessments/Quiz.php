<?php

namespace App\Models\Content\Assessments;

use App\Models\Content\Topic;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    //use HasFactory;

    protected $fillable = [
        'topic_id', 'title', 'description', 'quiz_type',
        'max_attempts', 'passing_score', 'time_limit_minutes', 'questions_count'
    ];

    protected $attributes = [
        'max_attempts' => 1,
        'passing_score' => 80,
    ];
    public function quizable()
    {
        return $this->morphTo();
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}

<?php

namespace App\Models\Content;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    //use HasFactory;

    protected $fillable = [
        'topic_id', 'title', 'description', 'quiz_type',
        'max_attempts', 'passing_score', 'time_limit_minutes', 'questions_count'
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

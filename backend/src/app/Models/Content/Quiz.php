<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    //use HasFactory;

    protected $fillable = [
        'topic_id', 'title', 'description', 'quiz_type',
        'max_attempts', 'passing_score', 'time_limit_minutes', 'created_by'
    ];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}

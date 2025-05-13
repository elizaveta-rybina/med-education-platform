<?php

namespace App\Models\Content;

use App\Models\Content\Assessments\Quiz;
use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    //use HasFactory;

    protected $fillable = [
        'topic_id', 'title', 'content', 'content_type',
        'order_number'
    ];

    public function quizzes()
    {
        return $this->morphOne(Quiz::class, 'quizable');
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function attachments()
    {
        return $this->hasMany(LectureAttachment::class);
    }
}

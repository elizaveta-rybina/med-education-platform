<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    //use HasFactory;

    protected $fillable = [
        'topic_id', 'title', 'content', 'content_type',
        'order_number', 'created_by'
    ];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function attachments()
    {
        return $this->hasMany(LectureAttachment::class);
    }
}

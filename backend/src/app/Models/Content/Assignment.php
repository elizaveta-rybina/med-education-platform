<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    protected $fillable = [
        'topic_id',
        'title',
        'description'
    ];

    public function quiz()
    {
        return $this->morphOne(Quiz::class, 'quizable');
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

}

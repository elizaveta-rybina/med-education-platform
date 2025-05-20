<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class LectureAttachment extends Model
{
    //use HasFactory;

    protected $fillable = [
        'lecture_id', 'file_name', 'file_path', 'file_type', 'file_size'
    ];

    public function lecture()
    {
        return $this->belongsTo(Lecture::class);
    }
}

<?php

namespace App\Models\Content;

use App\Models\Content\Assessments\Quiz;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    //use HasFactory;

    protected $fillable = ['course_id', 'title', 'description', 'order_number'];

    public function quizzes()
    {
        return $this->morphOne(Quiz::class, 'quizable');
    }
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function topics()
    {
        return $this->hasMany(Topic::class);
    }
}

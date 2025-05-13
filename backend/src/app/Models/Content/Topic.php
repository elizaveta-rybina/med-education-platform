<?php

namespace App\Models\Content;

use App\Models\Content\Assessments\Quiz;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    //use HasFactory;

    protected $fillable = ['module_id', 'title', 'description', 'order_number', 'is_published'];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function lectures()
    {
        return $this->hasMany(Lecture::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function items()
    {
        return $this->hasMany(TopicItem::class)->orderBy('order_number');
    }

}

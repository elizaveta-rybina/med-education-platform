<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    //use HasFactory;

    protected $fillable = ['module_id', 'title', 'description', 'order_number', 'created_by'];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
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

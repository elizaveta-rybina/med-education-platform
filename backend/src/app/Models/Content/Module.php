<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    //use HasFactory;

    protected $fillable = ['course_id', 'title', 'description', 'order_number'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function topics()
    {
        return $this->hasMany(Topic::class);
    }
}

<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    //use HasFactory;

    protected $fillable = ['title', 'description', 'skills'];

    protected $casts = [
        'skills' => 'array',
    ];

    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersEducation extends Model
{
    //use HasFactory;

    protected $fillable = [
        'user_id',
        'university_id',
        'faculty_code',
        'faculty_name',
        'course',
        'group_number',
    ];

    // Связь с моделью User (обратная связь, один ко многим)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Связь с моделью University (обратная связь, один ко многим)
    public function university()
    {
        return $this->belongsTo(University::class);
    }
}

<?php

namespace App\Models;

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    //use HasFactory;

    protected $fillable = [
        'name',
        'short_name',
    ];

    // Связь с моделью UsersEducation (один ко многим)
    public function usersEducation()
    {
        return $this->hasMany(UsersEducation::class);
    }
}

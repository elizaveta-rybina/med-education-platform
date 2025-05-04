<?php

// app/Models/User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    //use HasFactory, Notifiable;
    use Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'birth_date',
        'last_name',
        'first_name',
        'middle_name',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Связь с таблицей UsersEducation (один к одному)
    public function education()
    {
        return $this->hasOne(UsersEducation::class);
    }

    // Связь с таблицей Role (многие ко многим)
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    // Методы для JWT
    public function getJWTIdentifier()
    {
        return $this->getKey();  // Возвращает ID пользователя как уникальный идентификатор для токена
    }

    public function getJWTCustomClaims()
    {
        return [];  // Можешь добавить сюда дополнительные кастомные данные для токена, если нужно
    }
}

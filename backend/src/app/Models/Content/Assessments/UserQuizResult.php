<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class UserQuizResult extends Model
{
    protected $fillable = [
        'user_id',
        'quiz_id',
        'attempt_number',
        'score',
        'passed',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'passed' => 'boolean',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    /**
     * Связь с пользователем.
     */
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    /**
     * Связь с тестом.
     */
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}

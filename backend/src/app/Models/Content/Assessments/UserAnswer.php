<?php

namespace App\Models\Content\Assessments;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{
    //use HasFactory;

    protected $fillable = [
        'user_id',
        'question_id',
        'question_type',
        'attempt_number',
        'match_key',
        'answer_text',
        'answer_ids',
        'score',
    ];

    protected $casts = [
        'answer_ids' => 'array',  // автоматически преобразует JSON в массив и обратно
    ];

    /**
     * Связь с пользователем.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Связь с вопросом.
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}

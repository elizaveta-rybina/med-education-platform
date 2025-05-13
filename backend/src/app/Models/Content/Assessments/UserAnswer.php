<?php

namespace App\Models\Content\Assessments;

use App\Models\Content\User;
use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{
    //use HasFactory;

    protected $fillable = [
        'user_id',
        'question_id',
        'answer_text',
        'answer_ids',
        'score',
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

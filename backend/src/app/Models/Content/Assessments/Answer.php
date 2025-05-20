<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    //use HasFactory;

    protected $fillable = [
        'question_id',
        'answer_text',
        'is_correct',
        'match_key',
        'match_value',
        'order',
    ];

    /**
     * Связь с вопросом.
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}

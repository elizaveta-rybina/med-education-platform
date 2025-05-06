<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    //use HasFactory;

    protected $fillable = [
        'quiz_id', 'question_text', 'question_type',
        'points', 'order_number', 'explanation'
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

//    public function answerOptions()
//    {
//        return $this->hasMany(AnswerOption::class);
//    }
//
//    public function matchingPairs()
//    {
//        return $this->hasMany(MatchingPair::class);
//    }
}

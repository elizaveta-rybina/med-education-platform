<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class UserOrderingAnswer extends Model
{
    protected $fillable = ['ordering_answer_id', 'user_order'];

    public function userAnswers()
    {
        return $this->morphMany(UserAnswer::class, 'user_answerable');
    }

    public function orderingAnswer()
    {
        return $this->belongsTo(OrderingAnswer::class);
    }
}

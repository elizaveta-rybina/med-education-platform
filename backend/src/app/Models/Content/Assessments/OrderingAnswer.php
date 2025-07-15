<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class OrderingAnswer extends Model
{
    protected $fillable = ['answer_text', 'correct_order'];
}

<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class QuestionSchemaColumn extends Model
{
    protected $fillable = ['question_id', 'label', 'order'];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function cells()
    {
        return $this->hasMany(QuestionSchemaCell::class, 'column_id');
    }
}

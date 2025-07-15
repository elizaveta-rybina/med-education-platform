<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class UserOpenSchemaAnswer extends Model
{
    protected $fillable = ['open_schema_answer_id', 'user_schema_data'];

    public function userAnswers()
    {
        return $this->morphMany(UserAnswer::class, 'user_answerable');
    }

    public function openSchemaAnswer()
    {
        return $this->belongsTo(OpenSchemaAnswer::class);
    }
}

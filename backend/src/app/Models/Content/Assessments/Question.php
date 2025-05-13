<?php

namespace App\Models\Content\Assessments;

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
    public function schemaRows()
    {
        return $this->hasMany(QuestionSchemaRow::class);
    }

    public function schemaColumns()
    {
        return $this->hasMany(QuestionSchemaColumn::class);
    }

    public function schemaCells()
    {
        return $this->hasMany(QuestionSchemaCell::class);
    }

}

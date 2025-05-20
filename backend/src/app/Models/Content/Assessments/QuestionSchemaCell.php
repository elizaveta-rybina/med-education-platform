<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class QuestionSchemaCell extends Model
{
    protected $fillable = [
        'question_id',
        'row_id',
        'column_id',
        'cell_key',
        'static_content',
        'is_fillable',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function row()
    {
        return $this->belongsTo(QuestionSchemaRow::class);
    }

    public function column()
    {
        return $this->belongsTo(QuestionSchemaColumn::class);
    }
}

<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnswerKey extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'correct_answer',
        'is_case_sensitive',
    ];

    protected $casts = [
        'is_case_sensitive' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
}

<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'text',
        'question_type',
        'metadata',
        'is_auto_graded',
        'points',
        'max_length',
        'placeholder',
    ];

    protected $casts = [
        'question_type' => 'string',
        'metadata' => 'array',
        'is_auto_graded' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(QuestionOption::class);
    }


    public function userAnswers(): HasMany
    {
        return $this->hasMany(UserAnswer::class);
    }
}

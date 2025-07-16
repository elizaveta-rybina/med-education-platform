<?php

namespace App\Models\Content\Assessments;

use App\Models\Content\Topic;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'quiz_type',
        'max_attempts',
        'passing_score',
        'questions_count',
        'time_limit_minutes',
        'quizable_type',
        'quizable_id',
    ];

    protected $casts = [
        'quiz_type' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function quizable(): MorphTo
    {
        return $this->morphTo();
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function attempts(): HasMany
    {
        return $this->hasMany(QuizAttempt::class);
    }
}

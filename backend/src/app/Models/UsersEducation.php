<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class UsersEducation extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_education'; // Явное указание таблицы

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'university_id',
        'faculty',
        'department',
        'specialization',
        'course',
        'group',
        'position',
        'academic_degree',
        'start_date',
        'end_date',
        'is_current',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
        'course' => 'integer',
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'is_current' => true,
    ];

    /**
     * Get the user that owns the education record.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the university associated with the education record.
     */
    public function university()
    {
        return $this->belongsTo(University::class);
    }

    /**
     * Get the education period as a string.
     */
    public function getPeriodAttribute(): string
    {
        $end = $this->is_current ? 'н.в.' : $this->end_date?->format('Y');
        return "{$this->start_date->format('Y')} - {$end}";
    }

    /**
     * Check if this education is for a student.
     */
    public function isStudent(): bool
    {
        return !empty($this->course) || !empty($this->group);
    }

    /**
     * Check if this education is for a teacher.
     */
    public function isTeacher(): bool
    {
        return !empty($this->position) || !empty($this->academic_degree);
    }

    /**
     * Scope a query to only include current education records.
     */
    public function scopeCurrent($query)
    {
        return $query->where('is_current', true);
    }

    /**
     * Scope a query to only include student education records.
     */
    public function scopeStudents($query)
    {
        return $query->whereNotNull('course')->orWhereNotNull('group');
    }

    /**
     * Scope a query to only include teacher education records.
     */
    public function scopeTeachers($query)
    {
        return $query->whereNotNull('position')->orWhereNotNull('academic_degree');
    }
}

<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    //use HasFactory;

    protected $fillable = ['title', 'description', 'skills', 'description_modules'];

    protected $casts = [
        'skills' => 'array',
    ];

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    // Метод для получения всех данных курса (модули, темы, лекции и тесты)
    public function getCourseDetails()
    {
        return $this->with([
            'modules' => function ($query) {
                $query->with([
                    'topics' => function ($query) {
                        $query->with([
                            'lectures',
                            'quizzes'
                        ]);
                    }
                ]);
            }
        ])->find($this->id);
    }
    public function users()
    {
        return $this->belongsToMany(\App\Models\User::class, 'course_user')->withTimestamps();
    }

}

<?php

namespace Database\Factories;

use App\Models\UsersEducation;
use App\Models\University;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UsersEducationFactory extends Factory
{
    protected $model = UsersEducation::class;

    public function definition()
    {
        return [
            'university_id' => 1, // Привязываем к университету
            'faculty' => $this->faker->word,
            'department' => $this->faker->word,
            'specialization' => $this->faker->word,
            'course' => $this->faker->randomElement([1, 2, 3, 4, 5]),  // Для студентов
            'group' => $this->faker->word,
            'position' => null,
            'academic_degree' => null,
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->optional()->date(),
            'is_current' => true,
        ];
    }

    // Для студентов
    public function student()
    {
        return $this->state(function (array $attributes) {
            return [
                'course' => $this->faker->randomElement([1, 2, 3, 4, 5]),
                'group' => $this->faker->word,
                'position' => null,
                'academic_degree' => null,
            ];
        });
    }

    // Для преподавателей
    public function teacher()
    {
        return $this->state(function (array $attributes) {
            return [
                'course' => null,
                'group' => null,
                'position' => $this->faker->jobTitle,
                'academic_degree' => $this->faker->word,
            ];
        });
    }
}

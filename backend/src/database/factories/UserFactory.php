<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Role;
use App\Models\UsersEducation;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'username' => $this->faker->userName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('password'),
            'birth_date' => $this->faker->date,
            'last_name' => $this->faker->lastName,
            'first_name' => $this->faker->firstName,
            'middle_name' => $this->faker->firstName,
            'phone_number' => $this->faker->phoneNumber, // добавлен номер телефона
            'is_verified' => false, // по умолчанию пользователи не подтверждены
        ];
    }

    // Состояние для обычного пользователя
    public function normal()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_verified' => false, // обычный пользователь, не подтвержден
            ];
        })->afterCreating(function (User $user) {
            $user->roles()->attach(Role::where('name', 'user')->first()); // Привязка роли
        });
    }

    // Состояние для подтвержденного студента
    public function verifiedStudent()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_verified' => true, // подтвержденный студент
            ];
        })->afterCreating(function (User $user) {
            $user->roles()->attach(Role::where('name', 'student')->first()); // Привязка роли
            $user->education()->create(UsersEducation::factory()->student()->make()->toArray()); // Создание записи об образовании
        });
    }

    // Состояние для неподтвержденного студента
    public function unverifiedStudent()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_verified' => false, // неподтвержденный студент
            ];
        })->afterCreating(function (User $user) {
            $user->roles()->attach(Role::where('name', 'unverified_student')->first()); // Привязка роли
            $user->education()->create(UsersEducation::factory()->student()->make()->toArray()); // Создание записи об образовании
        });
    }

    // Состояние для преподавателя
    public function teacher()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_verified' => true, // преподаватель подтвержден
            ];
        })->afterCreating(function (User $user) {
            $user->roles()->attach(Role::where('name', 'teacher')->first()); // Привязка роли
            $user->education()->create(UsersEducation::factory()->teacher()->make()->toArray()); // Создание записи об образовании
        });
    }
}


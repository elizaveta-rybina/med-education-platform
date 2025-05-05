<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
        ]);

        User::factory()->normal()->count(5)->create();

        // Создаем неподтвержденных студентов
        User::factory()->unverifiedStudent()->count(3)->create();

        // Создаем подтвержденных студентов
        User::factory()->verifiedStudent()->count(3)->create();

        // Создаем преподавателей
        User::factory()->teacher()->count(2)->create();

    }
}

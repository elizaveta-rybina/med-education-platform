<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role; // Не забудь подключить модель Role
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Создаем пользователя (администратора)
        $admin = User::create([
            'username' => 'admin_user', // Логин
            'email' => 'admin@example.com', // Почта
            'password' => Hash::make('password'), // Пароль (не забудь хешировать)
            'is_verified' => true, // Статус подтверждения
            'birth_date' => '1990-01-01', // Дата рождения (пример)
            'phone_number' => '01234567890123',
            'last_name' => 'AdminLastName',
            'first_name' => 'AdminFirstName',
            'middle_name' => 'AdminMiddleName',
        ]);

        // Получаем роль "admin" по имени
        $adminRole = Role::where('name', 'admin')->first();

        // Привязываем роль к пользователю
        if ($adminRole) {
            $admin->roles()->attach($adminRole->id);
        }
    }
}

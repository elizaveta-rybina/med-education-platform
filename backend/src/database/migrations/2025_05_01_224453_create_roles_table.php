<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->string('description', 255)->nullable();
            $table->timestamps();
        });

        DB::table('roles')->insert([
            ['name' => 'admin', 'description' => 'Администратор системы'],
            ['name' => 'teacher', 'description' => 'Преподаватель'],
            ['name' => 'student', 'description' => 'Студент'],
            ['name' => 'unverified_student', 'description' => 'Неподтвержденный студент'],
            ['name' => 'user', 'description' => 'Обычный пользователь'],
        ]);
    }

    public function down(): void {
        Schema::dropIfExists('roles');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('user_education', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('university_id')->constrained();

            // Универсальные поля
            $table->string('faculty')->nullable(); // Название факультета
            $table->string('department')->nullable(); // Кафедра (для преподавателей)
            $table->string('specialization')->nullable(); // Специальность/направление

            // Для студентов
            $table->integer('course')->nullable(); // Курс
            $table->string('group')->nullable(); // Группа (string вместо number для групп типа "ИВБО-01-22")

            // Для преподавателей
            $table->string('position')->nullable(); // Должность: профессор, доцент и т.д.
            $table->string('academic_degree')->nullable(); // Ученая степень

            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('is_current')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_education');
    }

};

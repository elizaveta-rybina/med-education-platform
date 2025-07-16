<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_attempt_id')->constrained()->onDelete('cascade');
            $table->foreignId('question_id')->constrained()->onDelete('cascade');
            $table->json('answer_data'); // Хранит ответ: ID вариантов, текст, координаты таблицы и т.д.
            $table->integer('points_earned')->nullable(); // Баллы за ответ (заполняется после проверки)
            $table->boolean('is_correct')->nullable(); // Правильный ли ответ (для автопроверки)
            $table->text('teacher_feedback')->nullable(); // Обратная связь от преподавателя
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_answers');
    }
};

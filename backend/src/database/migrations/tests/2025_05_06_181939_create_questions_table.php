<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id')->constrained()->onDelete('cascade');
            $table->text('text'); // Текст вопроса
            $table->enum('question_type', [
                'single_choice',      // Один правильный ответ
                'multiple_choice',   // Несколько правильных ответов
                'text_input',        // Ввод текста
                'matching',          // Соотношение
                'ordering',          // Упорядочивание
                'table',             // Таблица с заполняемыми ячейками
            ]);
            $table->json('metadata')->nullable(); // Для хранения структуры таблицы или других специфичных данных
            $table->boolean('is_auto_graded')->default(true); // Автоматическая или ручная проверка
            $table->integer('points')->default(1); // Баллы за вопрос
            $table->integer('order')->default(0); // Порядок вопроса в тесте
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};

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
        Schema::create('user_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('question_id')->constrained()->onDelete('cascade');
            $table->integer('attempt_number')->default(1);  // Номер попытки
            $table->enum('question_type', ['single_choice', 'multiple_choice', 'open_answer', 'open_answer_reviewed', 'matching', 'ordering', 'open_schema', 'matching_schema']);
            $table->string('match_key')->nullable();     // Для ячеек таблиц (matching_schema)
            $table->text('answer_text')->nullable();     // Текстовый ответ
            $table->json('answer_ids')->nullable();      // Выбор вариантов (single/multiple choice)
            $table->integer('score')->nullable();        // Балл, если есть
            $table->timestampsTz();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_answers');
    }
};

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
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained('questions')->onDelete('cascade');

            // Поддержка разных типов ответов
            $table->text('answer_text')->nullable();        // Текст ответа (выбор, открытый)
            $table->boolean('is_correct')->nullable();      // Для single/multiple choice
            $table->string('match_key')->nullable();        // Для matching
            $table->string('match_value')->nullable();      // Для matching
            $table->integer('order')->nullable();           // Для ordering

            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('answers');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('answer_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained()->onDelete('cascade');
            $table->text('correct_answer'); // Правильный ответ (например, строка или регулярное выражение)
            $table->boolean('is_case_sensitive')->default(false); // Чувствительность к регистру
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('answers');
    }
};

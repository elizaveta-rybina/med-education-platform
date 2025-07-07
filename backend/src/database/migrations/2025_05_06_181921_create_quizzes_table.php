<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->nullableMorphs('quizable'); // создаёт quizable_id и quizable_type

            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('quiz_type', ['topic_final', 'additional', 'embedded', 'module_final'])->default('additional');
            $table->integer('max_attempts')->default(1);
            $table->integer('passing_score')->default(80);
            $table->integer('questions_count')->nullable(); // если null — значит все вопросы
            $table->integer('time_limit_minutes')->nullable();
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};


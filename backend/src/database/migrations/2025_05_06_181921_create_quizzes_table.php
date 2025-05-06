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
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('topic_id')->constrained('topics')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('quiz_type', ['module', 'topic_final', 'additional']);
            $table->integer('max_attempts')->default(1);
            $table->integer('passing_score')->default(80);
            $table->integer('time_limit_minutes')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->timestampsTz();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};

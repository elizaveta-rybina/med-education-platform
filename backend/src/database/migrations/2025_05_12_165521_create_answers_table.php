<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained('questions')->onDelete('cascade');
            $table->morphs('answerable'); // Полиморфное отношение (answerable_type, answerable_id)
            $table->integer('order')->nullable(); // Для ordering или сортировки
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('answers');
    }
};

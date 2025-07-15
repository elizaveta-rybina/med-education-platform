<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ordering_answers', function (Blueprint $table) {
            $table->id();
            $table->text('answer_text'); // Текст элемента для упорядочивания
            $table->integer('correct_order')->nullable(); // Правильный порядок
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ordering_answers');
    }
};

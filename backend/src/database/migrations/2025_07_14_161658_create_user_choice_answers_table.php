<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_choice_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('choice_answer_id')->constrained('choice_answers')->onDelete('cascade');
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_choice_answers');
    }
};

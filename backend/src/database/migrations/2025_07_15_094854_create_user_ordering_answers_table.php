<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_ordering_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ordering_answer_id')->constrained('ordering_answers')->onDelete('cascade');
            $table->integer('user_order'); // Порядок, заданный пользователем
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_ordering_answers');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_matching_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('matching_answer_id')->constrained('matching_answers')->onDelete('cascade');
            $table->string('user_match_value');
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_matching_answers');
    }
};

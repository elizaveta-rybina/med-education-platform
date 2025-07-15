<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_matching_schema_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('matching_schema_answer_id')->constrained('matching_schema_answers')->onDelete('cascade');
            $table->json('user_schema_value'); // JSON-значение, отправленное пользователем
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_matching_schema_answers');
    }
};

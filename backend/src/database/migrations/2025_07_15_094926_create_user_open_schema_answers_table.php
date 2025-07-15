<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_open_schema_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('open_schema_answer_id')->constrained('open_schema_answers')->onDelete('cascade');
            $table->json('user_schema_data'); // JSON-схема, отправленная пользователем
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_open_schema_answers');
    }
};

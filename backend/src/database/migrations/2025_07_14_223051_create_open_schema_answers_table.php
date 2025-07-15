<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('open_schema_answers', function (Blueprint $table) {
            $table->id();
            $table->json('schema_data')->nullable(); // JSON для хранения структуры схемы
            $table->text('description')->nullable(); // Описание ожидаемого ответа
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('open_schema_answers');
    }
};

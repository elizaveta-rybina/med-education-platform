<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matching_schema_answers', function (Blueprint $table) {
            $table->id();
            $table->string('match_key'); // Ключ для соответствия
            $table->json('schema_value')->nullable(); // Значение в формате JSON (для схемы)
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matching_schema_answers');
    }
};

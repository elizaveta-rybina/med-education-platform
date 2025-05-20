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
        Schema::create('question_schema_cells', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained('questions')->onDelete('cascade');
            $table->foreignId('row_id')->constrained('question_schema_rows')->onDelete('cascade');
            $table->foreignId('column_id')->constrained('question_schema_columns')->onDelete('cascade');

            $table->text('content')->nullable(); // Текст внутри ячейки (если фиксирован)
            $table->boolean('is_fillable')->default(false); // Студент будет заполнять?
            $table->string('cell_key')->nullable(); // Например: row_1_col_3 (для связи с answers.match_key)

            $table->timestampsTz();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_schema_cells');
    }
};

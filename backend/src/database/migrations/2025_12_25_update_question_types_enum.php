<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Обновляем enum question_type для добавления 'free-input' и 'input_answer'
        DB::statement("ALTER TABLE questions MODIFY COLUMN question_type ENUM('single_choice', 'multiple_choice', 'text_input', 'matching', 'ordering', 'table', 'interactive_experience', 'input_answer', 'free-input') NOT NULL");
    }

    public function down(): void
    {
        // Восстанавливаем исходный enum без новых типов
        DB::statement("ALTER TABLE questions MODIFY COLUMN question_type ENUM('single_choice', 'multiple_choice', 'text_input', 'matching', 'ordering', 'table') NOT NULL");
    }
};

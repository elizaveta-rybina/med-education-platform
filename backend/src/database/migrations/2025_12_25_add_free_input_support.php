<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Обновляем enum quiz_type для добавления 'free-input'
        Schema::table('quizzes', function (Blueprint $table) {
            // Меняем тип column для добавления 'free-input' значения
            // Используем raw SQL для изменения enum
            DB::statement("ALTER TABLE quizzes MODIFY COLUMN quiz_type ENUM('topic_final', 'additional', 'embedded', 'module_final', 'standard', 'table', 'interactive', 'input', 'free-input') DEFAULT 'additional'");
        });

        // Добавляем поле time_limit_seconds в таблицу quizzes для fine-grained control
        Schema::table('quizzes', function (Blueprint $table) {
            // Добавляем поле для времени ограничения в секундах, если его нет
            if (!Schema::hasColumn('quizzes', 'time_limit_seconds')) {
                $table->integer('time_limit_seconds')->nullable()->after('time_limit_minutes');
            }
        });

        // Обновляем таблицу questions для добавления max_length
        Schema::table('questions', function (Blueprint $table) {
            if (!Schema::hasColumn('questions', 'max_length')) {
                $table->integer('max_length')->nullable()->after('points')->comment('Maximum character length for free-input responses');
            }

            if (!Schema::hasColumn('questions', 'placeholder')) {
                $table->string('placeholder')->nullable()->after('max_length')->comment('Placeholder text for input field');
            }
        });
    }

    public function down(): void
    {
        Schema::table('quizzes', function (Blueprint $table) {
            // Восстанавливаем исходный enum без 'free-input'
            DB::statement("ALTER TABLE quizzes MODIFY COLUMN quiz_type ENUM('topic_final', 'additional', 'embedded', 'module_final', 'standard', 'table', 'interactive', 'input') DEFAULT 'additional'");
        });

        Schema::table('quizzes', function (Blueprint $table) {
            if (Schema::hasColumn('quizzes', 'time_limit_seconds')) {
                $table->dropColumn('time_limit_seconds');
            }
        });

        Schema::table('questions', function (Blueprint $table) {
            if (Schema::hasColumn('questions', 'max_length')) {
                $table->dropColumn('max_length');
            }
            if (Schema::hasColumn('questions', 'placeholder')) {
                $table->dropColumn('placeholder');
            }
        });
    }
};

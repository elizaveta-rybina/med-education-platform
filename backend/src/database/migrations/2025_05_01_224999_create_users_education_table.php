<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('users_education', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('university_id')->nullable()->constrained('universities')->nullOnDelete();
            $table->string('faculty_code', 50)->nullable();
            $table->string('faculty_name', 100)->nullable();
            $table->unsignedTinyInteger('course')->nullable(); // 1–6
            $table->unsignedInteger('group_number')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('users_education');
    }
};

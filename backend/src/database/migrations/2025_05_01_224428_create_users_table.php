<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username', 50)->unique();
            $table->string('email', 100)->unique();
            $table->string('password', 255);
            $table->date('birth_date')->nullable();
            $table->string('phone_number', 20)->nullable();
            $table->string('last_name', 50);
            $table->string('first_name', 50);
            $table->string('middle_name', 50)->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();

            $table->index(['last_name', 'first_name']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('users');
    }
};

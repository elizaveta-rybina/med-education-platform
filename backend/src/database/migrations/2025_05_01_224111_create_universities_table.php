<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('universities', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('short_name', 50)->nullable();
            $table->timestamps();
        });

        DB::table('universities')->insert([
            ['name' => 'Национальный исследовательский Мордовский государственный университет имени Н. П. Огарёва', 'short_name' => 'МГУ им. Н. П. Огарёва'],
        ]);
    }

    public function down(): void {
        Schema::dropIfExists('universities');
    }
};

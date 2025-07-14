
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matching_answers', function (Blueprint $table) {
            $table->id();
            $table->string('match_key');
            $table->string('match_value');
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matching_answers');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTokensTable extends Migration
{
    public function up()
    {
        Schema::create('tokens', function (Blueprint $table) {
            $table->id();
            $table->text('token')->unique();
            $table->enum('type', ['access', 'refresh']);
            $table->unsignedBigInteger('user_id');
            $table->timestamp('expires_at');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['token', 'type']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('tokens');
    }
}

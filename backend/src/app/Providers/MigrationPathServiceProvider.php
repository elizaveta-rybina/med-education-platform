<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class MigrationPathServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom([
            database_path('migrations/users'),
            database_path('migrations/courses'),
            database_path('migrations/tests'),
        ]);
    }
}

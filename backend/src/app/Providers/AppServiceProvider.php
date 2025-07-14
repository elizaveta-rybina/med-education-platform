<?php

namespace App\Providers;

use App\Repositories\QuizRepository;
use App\Services\Content\Assessments\QuizService;
use App\Services\TokenService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(TokenService::class, function ($app) {
            return new TokenService();
        });

        $this->app->bind(QuizRepository::class, function ($app) {
            return new QuizRepository();
        });

        $this->app->bind(QuizService::class, function ($app) {
            return new QuizService(
                $app->make(QuizRepository::class)
            );
        });
    }

    public function boot(): void
    {
        //
    }
}

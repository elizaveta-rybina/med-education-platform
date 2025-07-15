<?php

namespace App\Providers;

use App\Repositories\QuestionRepository;
use App\Repositories\QuizRepository;
use App\Services\Content\Assessments\QuestionService;
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

        // Привязка QuizService с передачей QuizRepository и QuestionService
        $this->app->bind(QuizService::class, function ($app) {
            return new QuizService(
                $app->make(QuizRepository::class),
                $app->make(QuestionService::class)
            );
        });

        // Привязка QuestionService (если еще не настроена)
        $this->app->bind(QuestionService::class, function ($app) {
            return new QuestionService(
                $app->make(QuestionRepository::class),
                $app->make(\App\Services\Content\Assessments\AnswerService::class)
            );
        });

        $this->app->bind(\App\Services\Content\Assessments\UserAnswerService::class, function ($app) {
            return new \App\Services\Content\Assessments\UserAnswerService(
                $app->make(\App\Repositories\UserAnswerRepository::class)
            );
        });
    }

    public function boot(): void
    {
        //
    }
}

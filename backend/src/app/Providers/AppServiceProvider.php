<?php

namespace App\Providers;

use App\Repositories\Contracts\QuestionOptionRepositoryInterface;
use App\Repositories\Contracts\QuestionRepositoryInterface;
use App\Repositories\Contracts\QuizRepositoryInterface;
use App\Repositories\QuestionOptionRepository;
use App\Repositories\QuestionRepository;
use App\Repositories\QuizRepository;
use App\Rules\QuestioneValidator;
use App\Services\Content\Assessments\QuizService;
use App\Services\Contracts\QuizServiceInterface;
use App\Services\Content\Assessments\QuestionService;
use App\Services\Contracts\QuestionServiceInterface;
use App\Services\Content\Assessments\QuestionOptionService;
use App\Services\Contracts\QuestionOptionServiceInterface;
use App\Services\TokenService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
        $this->app->bind(TokenService::class, function ($app) {
            return new TokenService();
        });

        $this->app->bind(QuizServiceInterface::class, QuizService::class);
        $this->app->bind(QuizRepositoryInterface::class, QuizRepository::class);
        $this->app->bind(QuestionServiceInterface::class, QuestionService::class);
        $this->app->bind(QuestionRepositoryInterface::class, QuestionRepository::class);
        $this->app->bind(QuestionOptionServiceInterface::class, QuestionOptionService::class);
        $this->app->bind(QuestionOptionRepositoryInterface::class, QuestionOptionRepository::class);
//        // Привязка QuestionService (если еще не настроена)
//        $this->app->bind(QuestionService::class, function ($app) {
//            return new QuestionService(
//                $app->make(QuestionRepository::class),
//                $app->make(\App\Services\Content\Assessments\AnswerService::class)
//            );
//        });
//
//        $this->app->bind(\App\Services\Content\Assessments\UserAnswerService::class, function ($app) {
//            return new \App\Services\Content\Assessments\UserAnswerService(
//                $app->make(\App\Repositories\UserAnswerRepository::class)
//            );
//        });
    }


    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

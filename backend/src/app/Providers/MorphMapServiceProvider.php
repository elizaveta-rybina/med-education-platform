<?php

namespace App\Providers;

use App\Models\Content\Assignment;
use App\Models\Content\Lecture;
use App\Models\Content\Module;
use App\Models\Content\Topic;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class MorphMapServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Relation::enforceMorphMap([
            'module' => Module::class,
            'topic' => Topic::class,
            'lecture' => Lecture::class,
            'assignment' => Assignment::class,
        ]);
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class ClearAllTokens extends Command
{
    protected $signature = 'token:clear';
    protected $description = 'Удаляет все access и refresh токены из Redis';

    public function handle()
    {
        $deleted = 0;

        foreach (['access_token:*', 'refresh_token:*'] as $pattern) {
            $keys = Redis::keys($pattern);
            if (!empty($keys)) {
                Redis::del(...$keys);
                $deleted += count($keys);
            }
        }

        $this->info("Удалено $deleted токенов.");
    }
}

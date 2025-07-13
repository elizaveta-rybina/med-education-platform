<?php

namespace App\Services;

use Illuminate\Support\Facades\Redis;

class RedisTokenService
{
    protected const PREFIX_ACCESS = 'access_token:';
    protected const PREFIX_REFRESH = 'refresh_token:';

    // ====== STORE ======

    public function storeAccessToken(string $token, int $ttl): void
    {
        Redis::setex(self::PREFIX_ACCESS . $token, $ttl, 'valid');
    }

    public function storeRefreshToken(string $token, int $ttl): void
    {
        Redis::setex(self::PREFIX_REFRESH . $token, $ttl, 'valid');
    }

    // ====== CHECK (explicit) ======

    public function hasAccessToken(string $token): bool
    {
        return Redis::exists(self::PREFIX_ACCESS . $token) === 1;
    }

    public function hasRefreshToken(string $token): bool
    {
        return Redis::exists(self::PREFIX_REFRESH . $token) === 1;
    }

    // ====== REVOKE (explicit) ======

    public function revokeAccessToken(string $token): void
    {
        Redis::del(self::PREFIX_ACCESS . $token);
    }

    public function revokeRefreshToken(string $token): void
    {
        Redis::del(self::PREFIX_REFRESH . $token);
    }

    // ====== UNIVERSAL (optional fallback) ======

    public function hasToken(string $token): bool
    {
        return $this->hasAccessToken($token) || $this->hasRefreshToken($token);
    }

    public function revokeToken(string $token): void
    {
        if ($this->hasAccessToken($token)) {
            $this->revokeAccessToken($token);
        }

        if ($this->hasRefreshToken($token)) {
            $this->revokeRefreshToken($token);
        }
    }
}

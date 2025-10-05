<?php

namespace App\Services;

use App\Models\Token;
use Illuminate\Support\Facades\Log;

class TokenService
{
    public function storeAccessToken(string $token, int $ttl, int $userId): void
    {
        try {
            Token::create([
                'token' => $token,
                'type' => 'access',
                'user_id' => $userId,
                'expires_at' => now()->addMinutes($ttl),
            ]);
        } catch (\Exception $e) {
            Log::error('Ошибка сохранения access token: ' . $e->getMessage());
            throw $e;
        }
    }

    public function storeRefreshToken(string $token, int $ttl, int $userId): void
    {
        try {
            Token::create([
                'token' => $token,
                'type' => 'refresh',
                'user_id' => $userId,
                'expires_at' => now()->addMinutes($ttl),
            ]);
        } catch (\Exception $e) {
            Log::error('Ошибка сохранения refresh token: ' . $e->getMessage());
            throw $e;
        }
    }

    public function hasAccessToken(string $token): bool
    {
        try {
            return Token::where('token', $token)
                ->where('type', 'access')
                ->where('expires_at', '>', now())
                ->exists();
        } catch (\Exception $e) {
            Log::error('Ошибка проверки access token: ' . $e->getMessage());
            return false;
        }
    }

    public function hasRefreshToken(string $token): bool
    {
        try {
            return Token::where('token', $token)
                ->where('type', 'refresh')
                ->where('expires_at', '>', now())
                ->exists();
        } catch (\Exception $e) {
            Log::error('Ошибка проверки refresh token: ' . $e->getMessage());
            return false;
        }
    }

    public function revokeAccessToken(string $token): void
    {
        try {
            Token::where('token', $token)
                ->where('type', 'access')
                ->delete();
        } catch (\Exception $e) {
            Log::error('Ошибка отзыва access token: ' . $e->getMessage());
        }
    }

    public function revokeRefreshToken(string $token): void
    {
        try {
            Token::where('token', $token)
                ->where('type', 'refresh')
                ->delete();
        } catch (\Exception $e) {
            Log::error('Ошибка отзыва refresh token: ' . $e->getMessage());
        }
    }

    public function hasToken(string $token): bool
    {
        return $this->hasAccessToken($token) || $this->hasRefreshToken($token);
    }

    public function revokeToken(string $token): void
    {
        $this->revokeAccessToken($token);
        $this->revokeRefreshToken($token);
    }
}

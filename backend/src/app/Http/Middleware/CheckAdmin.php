<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();

        if (!$user || !$user->roles()->where('name', 'admin')->exists()) {
            return response()->json(['error' => 'Доступ запрещен'], 403);
        }

        return $next($request);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DebugTestController extends Controller
{
    public function test()
    {
        $message = "Xdebug работает!";
        $numbers = [1, 2, 3, 4, 5];

        // 🔴 Поставь здесь точку останова
        $sum = $this->calculateSum($numbers);

        return response()->json([
            'message' => $message,
            'sum' => $sum,
        ]);
    }

    private function calculateSum(array $numbers): int
    {
        $total = 0;
        foreach ($numbers as $number) {
            $total += $number;
        }
        return $total;
    }
}

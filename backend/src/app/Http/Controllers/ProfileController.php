<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function me()
    {
        return response()->json(auth()->user()->load('education', 'roles'));
    }
}

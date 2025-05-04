<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\University;

class UniversityController extends Controller
{
    public function index()
    {
        $universities = University::select('id', 'name', 'short_name')->orderBy('name')->get();

        return response()->json($universities);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:universities,name|max:255',
            'short_name' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $university = University::create([
            'name' => $request->name,
            'short_name' => $request->short_name,
        ]);

        return response()->json([
            'message' => 'Университет успешно создан',
            'university' => $university,
        ], 201);
    }
}

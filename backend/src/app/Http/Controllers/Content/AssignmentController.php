<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function store(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Задание успешно создано',
            'data' => $request->all()
        ]);
    }

    public function update(Request $request, $id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Задание успешно обновлено',
            'data' => $request->all()
        ]);
    }

    public function destroy($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Задание успешно удалено'
        ]);
    }
}

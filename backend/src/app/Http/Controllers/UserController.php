<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function update(Request $request, $id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Пользователь успешно обновлен',
            'data' => $request->all()
        ]);
    }

    public function destroy($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Пользователь успешно удален'
        ]);
    }
}

<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Services\Content\AssignmentService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AssignmentController extends Controller
{
    protected AssignmentService $assignmentService;

    public function __construct(AssignmentService $assignmentService)
    {
        $this->assignmentService = $assignmentService;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order_number' => 'nullable|integer',
        ]);

        $assignment = $this->assignmentService->create($data);

        return response()->json([
            'success' => true,
            'message' => 'Задание успешно создано',
            'data' => $assignment
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'topic_id' => 'sometimes|exists:topics,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'order_number' => 'nullable|integer',
        ]);

        $assignment = $this->assignmentService->update($id, $data);

        return response()->json([
            'success' => true,
            'message' => 'Задание успешно обновлено',
            'data' => $assignment
        ]);
    }

    public function destroy($id)
    {
        $this->assignmentService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Задание успешно удалено'
        ]);
    }
}

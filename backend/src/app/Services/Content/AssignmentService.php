<?php

namespace App\Services\Content;

use App\Models\Content\Assignment;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AssignmentService
{
    public function create(array $data): Assignment
    {
        return Assignment::create([
            'topic_id' => $data['topic_id'],
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'order_number' => $data['order_number'] ?? 0,
        ]);
    }

    public function update(int $id, array $data): Assignment
    {
        $assignment = Assignment::findOrFail($id);

        $assignment->update([
            'topic_id' => $data['topic_id'] ?? $assignment->topic_id,
            'title' => $data['title'] ?? $assignment->title,
            'description' => $data['description'] ?? $assignment->description,
            'order_number' => $data['order_number'] ?? $assignment->order_number,
        ]);

        return $assignment;
    }

    public function delete(int $id): void
    {
        $assignment = Assignment::findOrFail($id);
        $assignment->delete();
    }
}

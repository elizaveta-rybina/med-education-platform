<?php

namespace App\Services\Content;

use App\Models\Content\Assignment;

class AssignmentService
{
    public function create(array $data): Assignment
    {
        return Assignment::create([
            'topic_id' => $data['topic_id'],
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'order_number' => $data['order_number'],
        ]);
    }
}

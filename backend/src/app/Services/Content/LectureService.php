<?php

namespace App\Services\Content;

use App\Models\Content\Lecture;

class LectureService
{
    public function create(array $data): Lecture
    {
        return Lecture::create([
            'topic_id' => $data['topic_id'],
            'title' => $data['title'],
            'content' => $data['content'] ?? null, // по умолчанию пусто
            'content_type' => $data['content_type'] ?? 'markdown',
            'order_number' => $data['order_number'],
        ]);
    }
}

<?php

namespace App\Services\Content;

use App\Models\Content\TopicItem;

class TopicItemService
{
    public function create(array $data): TopicItem
    {
        return TopicItem::create([
            'topic_id' => $data['topic_id'],
            'item_type' => $data['item_type'],
            'item_id' => $data['item_id'],
            'order_number' => $data['order_number'],
            'is_published' => $data['is_published'],
        ]);
    }
}

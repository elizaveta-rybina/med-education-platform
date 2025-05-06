<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Content\Lecture;
use App\Models\Content\Quiz;

class TopicItem extends Model
{
    //use HasFactory;

    protected $table = 'topic_items'; // на всякий случай

    protected $fillable = ['topic_id', 'item_type', 'item_id', 'order_number'];

    public function lecture()
    {
        return $this->belongsTo(Lecture::class, 'item_id')
            ->where('item_type', 'lecture');
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class, 'item_id')
            ->where('item_type', 'quiz');
    }

    // Универсальный доступ к реальному объекту
    public function getItemAttribute()
    {
        return match ($this->item_type) {
            'lecture' => $this->lecture,
            'quiz'    => $this->quiz,
            default   => null,
        };
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
}

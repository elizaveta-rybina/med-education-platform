<?php

namespace App\Models\Content;

use App\Models\Content\Assessments\Quiz;
use Illuminate\Database\Eloquent\Model;

class TopicItem extends Model
{
    //use HasFactory;

    protected $table = 'topic_items'; // на всякий случай

    protected $fillable = ['topic_id', 'item_type', 'item_id', 'order_number', 'is_published'];

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

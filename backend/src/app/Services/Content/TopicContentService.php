<?php

namespace App\Services\Content;

use App\Models\Content\Assignment;
use App\Models\Content\Lecture;
use App\Services\Content\Assessments\QuizService;
use Illuminate\Support\Facades\DB;

class TopicContentService
{
    public function __construct(
        protected LectureService $lectureService,
        protected AssignmentService $assignmentService,
        protected QuizService $quizService,
        protected TopicItemService $topicItemService,
    ) {}

    public function store(array $validated): array
    {
        $savedItems = [];
        DB::beginTransaction();

        try {
            foreach ($validated['items'] as $itemData) {
                $type = $itemData['type'];
                $order = $itemData['order_number'] * 10;
                $topicId = $validated['topic_id'];

                if ($type === 'lecture' || $type === 'assignment') {
                    $service = $type === 'lecture' ? $this->lectureService : $this->assignmentService;

                    $item = $service->create([
                        'topic_id' => $topicId,
                        'title' => $itemData['title'],
                        'order_number' => $order,
                    ]);

                    $savedItems[] = $this->topicItemService->create([
                        'topic_id' => $topicId,
                        'item_type' => $type,
                        'item_id' => $item->id,
                        'order_number' => $order,
                        'is_published' => $itemData['is_published'],
                    ]);
                }

                // Самостоятельный тест
                if ($type === 'quiz') {
                    $quiz = $this->quizService->create([
                        'topic_id' => $topicId,
                        'title' => $itemData['title'],
                        'quiz_type' => $itemData['quiz_type'],
                        'order_number' => $order,
                        'max_attempts' => $itemData['max_attempts'] ?? 1, // Добавляем с fallback на default
                        'passing_score' => $itemData['passing_score'] ?? 80,
                        'time_limit_minutes' => $itemData['time_limit_minutes'] ?? null,
                    ]);

                    $savedItems[] = $this->topicItemService->create([
                        'topic_id' => $topicId,
                        'item_type' => 'quiz',
                        'item_id' => $quiz->id,
                        'order_number' => $order,
                        'is_published' => $itemData['is_published'],
                    ]);
                }
            }

            // Теперь обрабатываем прикрепленные тесты
            foreach ($validated['items'] as $itemData) {
                if (
                    ($itemData['type'] === 'lecture' || $itemData['type'] === 'assignment')
                    && !empty($itemData['attached_quiz'])
                ) {
                    $parentOrder = $itemData['order_number'] * 10;
                    $quizOrder = $parentOrder + 5;
                    $quizData = $itemData['attached_quiz'];
                    $type = $itemData['type'];

                    // Находим родительский TopicItem
                    $parentItem = collect($savedItems)->first(function ($item) use ($type, $parentOrder) {
                        return $item->item_type === $type && $item->order_number === $parentOrder;
                    });

                    if ($parentItem) {
                        // Находим модель родителя
                        $parentModel = $type === 'lecture'
                            ? Lecture::find($parentItem->item_id)
                            : Assignment::find($parentItem->item_id);

                        $quiz = $this->quizService->create([
                            'topic_id' => $validated['topic_id'],
                            'title' => $quizData['title'],
                            'quiz_type' => 'embedded',
                            'order_number' => $quizOrder,
                            'max_attempts' => $quizData['max_attempts'] ?? 1, // Добавляем с fallback
                            'passing_score' => $quizData['passing_score'] ?? 80,
                            'time_limit_minutes' => $quizData['time_limit_minutes'] ?? null,
                        ], $parentModel);

                        $savedItems[] = $this->topicItemService->create([
                            'topic_id' => $validated['topic_id'],
                            'item_type' => 'quiz',
                            'item_id' => $quiz->id,
                            'order_number' => $quizOrder,
                            'is_published' => $itemData['is_published'],
                        ]);
                    }
                }
            }

            DB::commit();
            return $savedItems;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }


}


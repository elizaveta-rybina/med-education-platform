<?php

namespace App\Services\Content;

use Illuminate\Support\Facades\DB;
use App\Models\Content\Lecture;
use App\Models\Content\Assignment;

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
            // Сначала создаем все основные элементы
            foreach ($validated['items'] as $itemData) {
                $type = $itemData['type'];
                $order = $itemData['order_number'] * 10; // Умножаем на 10 для "промежуточных" позиций
                $topicId = $validated['topic_id'];

                if ($type === 'lecture' || $type === 'assignment') {
                    // Создание лекции/задания
                    $service = $type === 'lecture'
                        ? $this->lectureService
                        : $this->assignmentService;

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
                } elseif ($type === 'quiz') {
                    // Создание самостоятельного теста
                    $quiz = $this->quizService->create([
                        'topic_id' => $topicId,
                        'title' => $itemData['title'],
                        'quiz_type' => $itemData['quiz_type'],
                        'order_number' => $order,
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

            // Затем создаем прикрепленные тесты
            foreach ($validated['items'] as $itemData) {
                if (($itemData['type'] === 'lecture' || $itemData['type'] === 'assignment')
                    && !empty($itemData['attached_quiz'])) {

                    $parentOrder = $itemData['order_number'] * 10;
                    $quizOrder = $parentOrder + 5; // +5 чтобы был после родителя, но перед следующим элементом

                    $quizData = $itemData['attached_quiz'];
                    $type = $itemData['type'];

                    // Находим родительский элемент
                    $parentItem = null;
                    foreach ($savedItems as $item) {
                        if ($item->item_type === $type && $item->order_number === $parentOrder) {
                            $parentItem = $item;
                            break;
                        }
                    }

                    if ($parentItem) {
                        $quiz = $this->quizService->create([
                            'topic_id' => $validated['topic_id'],
                            $type.'_id' => $parentItem->item_id,
                            'title' => $quizData['title'],
                            'quiz_type' => 'embedded',
                            'order_number' => $quizOrder,
                        ]);

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


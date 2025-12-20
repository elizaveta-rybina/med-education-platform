<?php

namespace App\Services\Content;

use App\Models\Content\Assignment;
use App\Models\Content\Lecture;
use App\Models\Content\Topic;
use App\Services\Content\TopicItemService;
use App\Services\Content\Assessments\QuizService;
use Illuminate\Support\Facades\DB;

class TopicContentService
{
    private const ITEM_SERVICE_MAP = [
        'lecture' => 'lectureService',
        'assignment' => 'assignmentService',
        'quiz' => 'quizService',
    ];

    private const ITEM_MODEL_MAP = [
        'lecture' => Lecture::class,
        'assignment' => Assignment::class,
    ];

    public function __construct(
        protected LectureService $lectureService,
        protected AssignmentService $assignmentService,
        protected QuizService $quizService,
        protected TopicItemService $topicItemService,
    ) {}

    public function getByTopic(int $topicId): array
    {
        $lectures = Lecture::where('topic_id', $topicId)
            ->orderBy('order_number')
            ->get();

        return [
            'lectures' => $lectures,
            'quizzes' => [],
            'assignments' => [],
        ];
    }

    public function store(array $validated): array
    {
        $savedItems = [];
        DB::beginTransaction();

        try {
            // Обрабатываем основные элементы
            foreach ($validated['items'] as $itemData) {
                $savedItems[] = $this->processMainItem($validated['topic_id'], $itemData);
            }

            // Обрабатываем прикрепленные тесты
            foreach ($validated['items'] as $itemData) {
                if ($this->hasAttachedQuiz($itemData)) {
                    $savedItems[] = $this->processAttachedQuiz($validated['topic_id'], $itemData, $savedItems);
                }
            }

            DB::commit();
            return $savedItems;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    protected function processMainItem(int $topicId, array $itemData): mixed
    {
        $type = $itemData['type'];
        $order = $itemData['order_number'] * 10;

        if ($type === 'quiz') {
            return $this->createQuizItem($topicId, $itemData, $order);
        }

        return $this->createServiceBasedItem($topicId, $itemData, $type, $order);
    }

    protected function createServiceBasedItem(int $topicId, array $itemData, string $type, int $order): mixed
    {
        if (!array_key_exists($type, self::ITEM_SERVICE_MAP)) {
            throw new \InvalidArgumentException("Unsupported item type: {$type}");
        }

        $service = $this->{self::ITEM_SERVICE_MAP[$type]};
        $item = $service->create([
            'topic_id' => $topicId,
            'title' => $itemData['title'],
            'order_number' => $order,
        ]);

        return $this->createTopicItem($topicId, $type, $item->id, $order, $itemData['is_published']);
    }

    protected function createQuizItem(int $topicId, array $itemData, int $order): mixed
    {
        $topic = Topic::findOrFail($topicId);

        $quiz = $this->quizService->create([
            'title' => $itemData['title'],
            'quiz_type' => $itemData['quiz_type'],
            'order_number' => $order,
            'max_attempts' => $itemData['max_attempts'] ?? 1,
            'passing_score' => $itemData['passing_score'] ?? 80,
            'time_limit_minutes' => $itemData['time_limit_minutes'] ?? null,
        ], $topic);

        return $this->createTopicItem($topicId, 'quiz', $quiz->id, $order, $itemData['is_published']);
    }

    protected function processAttachedQuiz(int $topicId, array $itemData, array $savedItems): mixed
    {
        $parentOrder = $itemData['order_number'] * 10;
        $quizOrder = $parentOrder + 5;
        $quizData = $itemData['attached_quiz'];
        $type = $itemData['type'];

        $parentItem = $this->findParentItem($savedItems, $type, $parentOrder);
        if (!$parentItem) {
            return null;
        }

        $parentModel = $this->getParentModel($type, $parentItem->item_id);
        if (!$parentModel) {
            return null;
        }

        $quiz = $this->quizService->create([
            'topic_id' => $topicId,
            'title' => $quizData['title'],
            'quiz_type' => 'embedded',
            'order_number' => $quizOrder,
            'max_attempts' => $quizData['max_attempts'] ?? 1,
            'passing_score' => $quizData['passing_score'] ?? 80,
            'time_limit_minutes' => $quizData['time_limit_minutes'] ?? null,
        ], $parentModel);

        return $this->createTopicItem($topicId, 'quiz', $quiz->id, $quizOrder, $itemData['is_published']);
    }

    protected function hasAttachedQuiz(array $itemData): bool
    {
        return in_array($itemData['type'], ['lecture', 'assignment'])
            && !empty($itemData['attached_quiz']);
    }

    protected function findParentItem(array $savedItems, string $type, int $order): ?object
    {
        return collect($savedItems)->first(
            fn($item) => $item->item_type === $type && $item->order_number === $order
        );
    }

    protected function getParentModel(string $type, int $itemId): ?object
    {
        if (!array_key_exists($type, self::ITEM_MODEL_MAP)) {
            return null;
        }

        return self::ITEM_MODEL_MAP[$type]::find($itemId);
    }

    protected function createTopicItem(int $topicId, string $type, int $itemId, int $order, bool $isPublished): mixed
    {
        return $this->topicItemService->create([
            'topic_id' => $topicId,
            'item_type' => $type,
            'item_id' => $itemId,
            'order_number' => $order,
            'is_published' => $isPublished,
        ]);
    }
}

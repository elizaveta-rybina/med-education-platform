<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\Question;
use App\Repositories\Contracts\QuizRepositoryInterface;
use App\Services\Contracts\QuestionServiceInterface;
use App\Services\Contracts\QuizServiceInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class QuizService implements QuizServiceInterface
{
    protected QuizRepositoryInterface $quizRepository;
    protected QuestionServiceInterface $questionService;

    public function __construct(
        QuizRepositoryInterface $quizRepository,
        QuestionServiceInterface $questionService
    ) {
        $this->quizRepository = $quizRepository;
        $this->questionService = $questionService;
    }

    public function getAllQuizzes()
    {
        return $this->quizRepository->getAllWithRelations(['quizable', 'questions', 'questions.options']);
    }

    public function getQuizById(int $id): Quiz
    {
        return $this->quizRepository->findWithRelations($id, ['quizable', 'questions', 'questions.options']);
    }

    public function getQuizForStudent(int $id): Quiz
    {
        $quiz = $this->getQuizById($id);
        $user = auth()->user();
        if ($quiz->max_attempts && $quiz->attempts()->where('user_id', $user->id)->count() >= $quiz->max_attempts) {
            throw new Exception('Maximum attempts exceeded', 403);
        }
        return $quiz;
    }

    public function createQuiz(array $data): Quiz
    {
        return $this->executeTransaction(function () use ($data) {
            $quizData = $this->prepareQuizData($data);
            $quiz = $this->quizRepository->create($quizData);

            if (!empty($data['questions'])) {
                foreach ($data['questions'] as $questionData) {
                    $this->questionService->createQuestion($quiz, $questionData);
                }
            }

            return $this->getQuizById($quiz->id);
        }, 'create quiz', ['data' => $data]);
    }

    public function updateQuiz(Quiz $quiz, array $data): Quiz
    {
        return $this->executeTransaction(function () use ($quiz, $data) {
            $quizData = $this->prepareQuizData($data, $quiz);
            $this->quizRepository->update($quiz, $quizData);

            if (!empty($data['questions'])) {
                $this->syncQuestions($quiz, $data['questions']);
            }

            return $this->getQuizById($quiz->id);
        }, 'update quiz', ['quiz_id' => $quiz->id, 'data' => $data]);
    }

    public function deleteQuiz(Quiz $quiz): void
    {
        $this->executeTransaction(function () use ($quiz) {
            $this->quizRepository->delete($quiz);
        }, 'delete quiz', ['quiz_id' => $quiz->id]);
    }

    public function addQuestionToQuiz(Quiz $quiz, array $data): Question
    {
        return $this->executeTransaction(function () use ($quiz, $data) {
            $question = $this->questionService->createQuestion($quiz, $data);
            $quiz->update(['questions_count' => $quiz->questions()->count()]);
            return $question;
        }, 'add question', ['quiz_id' => $quiz->id, 'data' => $data]);
    }

    public function updateQuestionInQuiz(Quiz $quiz, int $questionId, array $data): Question
    {
        return $this->executeTransaction(function () use ($quiz, $questionId, $data) {
            $question = $quiz->questions()->findOrFail($questionId);
            return $this->questionService->updateQuestion($quiz, $question, $data);
        }, 'update question', ['quiz_id' => $quiz->id, 'question_id' => $questionId, 'data' => $data]);
    }

    public function deleteQuestionFromQuiz(Quiz $quiz, int $questionId): void
    {
        $this->executeTransaction(function () use ($quiz, $questionId) {
            $question = $quiz->questions()->findOrFail($questionId);
            $this->questionService->deleteQuestion($quiz, $question);
            $quiz->update(['questions_count' => $quiz->questions()->count()]);
        }, 'delete question', ['quiz_id' => $quiz->id, 'question_id' => $questionId]);
    }

    protected function prepareQuizData(array $data, ?Quiz $quiz = null): array
    {
        $entityType = $data['entity_type'] ?? $quiz?->quizable_type;
        $quizableId = $data['quizable_id'] ?? $quiz?->quizable_id;

        $modelClass = match ($entityType) {
            'module' => \App\Models\Content\Module::class,
            'topic' => \App\Models\Content\Topic::class,
            'lecture' => \App\Models\Content\Lecture::class,
            'assignment' => \App\Models\Content\Assignment::class,
            default => null,
        };

        if ($modelClass && $quizableId) {
            if (!class_exists($modelClass) || !$modelClass::find($quizableId)) {
                throw new Exception("Invalid {$entityType} with ID {$quizableId}", 404);
            }
        }

        $quizData = array_merge($data, [
            'questions_count' => count($data['questions'] ?? []),
            'quizable_type' => $modelClass,
            'quizable_id' => $quizableId,
        ]);

        unset($quizData['questions'], $quizData['entity_type']);
        return $quizData;
    }

    protected function syncQuestions(Quiz $quiz, array $questions): void
    {
        $existingIds = $quiz->questions()->pluck('id')->toArray();
        $providedIds = array_filter(array_column($questions, 'id') ?? []);

        $questionsToDelete = array_diff($existingIds, $providedIds);
        if ($questionsToDelete) {
            $quiz->questions()->whereIn('id', $questionsToDelete)->delete();
        }

        foreach ($questions as $questionData) {
            if (isset($questionData['id']) && in_array($questionData['id'], $existingIds)) {
                $question = $quiz->questions()->find($questionData['id']);
                if ($question) {
                    $this->questionService->updateQuestion($quiz, $question, $questionData);
                }
            } else {
                $this->questionService->createQuestion($quiz, $questionData);
            }
        }
    }

    protected function executeTransaction(callable $callback, string $action, array $logContext = []): mixed
    {
        try {
            Log::info("Starting {$action}", $logContext);
            return DB::transaction($callback);
        } catch (Exception $e) {
            Log::error("Failed to {$action}: {$e->getMessage()}", array_merge($logContext, [
                'trace' => $e->getTraceAsString()
            ]));
            throw new Exception("Failed to {$action}", 0, $e);
        }
    }
}

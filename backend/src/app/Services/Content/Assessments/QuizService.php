<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\QuizAttempt;
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

    /**
     * Get all quizzes with relations.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllQuizzes()
    {
        return $this->quizRepository->getAllWithRelations(['quizable', 'questions', 'questions.options']);
    }

    /**
     * Get quiz by ID with relations.
     *
     * @param int $id
     * @return Quiz
     * @throws Exception
     */
    public function getQuizById(int $id): Quiz
    {
        return $this->quizRepository->findWithRelations($id, ['quizable', 'questions', 'questions.options']);
    }

    /**
     * Get quiz by ID for students (with filtered data).
     *
     * @param int $id
     * @return Quiz
     * @throws Exception
     */
    public function getQuizForStudent(int $id): Quiz
    {
        $quiz = $this->quizRepository->findWithRelations($id, ['quizable', 'questions', 'questions.options']);
        $user = auth()->user();
        $attemptsCount = $quiz->attempts()->where('user_id', $user->id)->count();
        if ($quiz->max_attempts && $attemptsCount >= $quiz->max_attempts) {
            throw new Exception('Maximum attempts exceeded', 403);
        }
        return $quiz;
    }

    /**
     * Create a new quiz with questions and options.
     *
     * @param array $data
     * @return Quiz
     * @throws Exception
     */
    public function createQuiz(array $data): Quiz
    {
        return DB::transaction(function () use ($data) {
            try {
                Log::info('Creating quiz', ['data' => $data]);

                $questions = $data['questions'] ?? [];
                unset($data['questions']);
                unset($data['entity_type']);

                // Проверяем существование quizable_id
                $entityType = $data['quizable_type'] ?? null;
                $quizableId = $data['quizable_id'] ?? null;
                if ($entityType && $quizableId) {
                    $modelClass = match ($entityType) {
                        'module' => \App\Models\Content\Module::class,
                        'topic' => \App\Models\Content\Topic::class,
                        'lecture' => \App\Models\Content\Lecture::class,
                        'assignment' => \App\Models\Content\Assignment::class,
                        default => null,
                    };
                    if (!$modelClass || !$modelClass::find($quizableId)) {
                        throw new Exception("No {$entityType} found with ID {$quizableId}");
                    }
                }

                $quiz = $this->quizRepository->create($data);

                if (!empty($questions)) {
                    foreach ($questions as $index => $questionData) {
                        Log::debug('Creating question', ['index' => $index, 'data' => $questionData]);
                        $this->questionService->createQuestion($quiz, $questionData);
                    }
                }

                return $this->quizRepository->findWithRelations($quiz->id, ['quizable', 'questions', 'questions.options']);
            } catch (Exception $e) {
                Log::error('Failed to create quiz: ' . $e->getMessage(), [
                    'data' => $data,
                    'trace' => $e->getTraceAsString(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ]);
                throw new Exception('Failed to create quiz: ' . $e->getMessage(), $e->getCode(), $e);
            }
        });
    }

    /**
     * Update an existing quiz and optionally its questions.
     *
     * @param Quiz $quiz
     * @param array $data
     * @return Quiz
     * @throws Exception
     */
    public function updateQuiz(Quiz $quiz, array $data): Quiz
    {
        return DB::transaction(function () use ($quiz, $data) {
            try {
                Log::info('Updating quiz', ['quiz_id' => $quiz->id, 'data' => $data]);

                $questions = $data['questions'] ?? [];
                unset($data['questions']);
                unset($data['entity_type']);

                $this->quizRepository->update($quiz, $data);

                if (!empty($questions)) {
                    $this->syncQuestions($quiz, $questions);
                }

                return $this->quizRepository->findWithRelations($quiz->id, ['quizable', 'questions', 'questions.options']);
            } catch (Exception $e) {
                Log::error('Failed to update quiz: ' . $e->getMessage(), [
                    'quiz_id' => $quiz->id,
                    'data' => $data,
                    'trace' => $e->getTraceAsString()
                ]);
                throw new Exception('Failed to update quiz', 0, $e);
            }
        });
    }

    /**
     * Sync questions for a quiz (create, update, or delete).
     *
     * @param Quiz $quiz
     * @param array $questions
     * @return void
     * @throws Exception
     */
    protected function syncQuestions(Quiz $quiz, array $questions): void
    {
        $existingQuestionIds = $quiz->questions()->pluck('id')->toArray();
        $providedQuestionIds = array_filter(array_column($questions, 'id'), fn($id) => !is_null($id));

        $questionsToDelete = array_diff($existingQuestionIds, $providedQuestionIds);
        if (!empty($questionsToDelete)) {
            $quiz->questions()->whereIn('id', $questionsToDelete)->delete();
            Log::info('Deleted questions from quiz', ['quiz_id' => $quiz->id, 'question_ids' => $questionsToDelete]);
        }

        foreach ($questions as $questionData) {
            if (isset($questionData['id']) && in_array($questionData['id'], $existingQuestionIds)) {
                $question = $quiz->questions()->find($questionData['id']);
                if ($question) {
                    $this->questionService->updateQuestion($quiz, $question, $questionData);
                }
            } else {
                $this->questionService->createQuestion($quiz, $questionData);
            }
        }
    }

    /**
     * Delete a quiz and its questions/options.
     *
     * @param Quiz $quiz
     * @return void
     * @throws Exception
     */
    public function deleteQuiz(Quiz $quiz): void
    {
        DB::transaction(function () use ($quiz) {
            try {
                Log::info('Deleting quiz', ['quiz_id' => $quiz->id]);
                $this->quizRepository->delete($quiz);
            } catch (Exception $e) {
                Log::error('Failed to delete quiz: ' . $e->getMessage(), [
                    'quiz_id' => $quiz->id,
                    'trace' => $e->getTraceAsString()
                ]);
                throw new Exception('Failed to delete quiz', 0, $e);
            }
        });
    }

    /**
     * Add a new question to a quiz.
     *
     * @param Quiz $quiz
     * @param array $data
     * @return Question
     * @throws Exception
     */
    public function addQuestionToQuiz(Quiz $quiz, array $data): Question
    {
        return DB::transaction(function () use ($quiz, $data) {
            try {
                Log::info('Adding question to quiz', ['quiz_id' => $quiz->id, 'data' => $data]);
                return $this->questionService->createQuestion($quiz, $data);
            } catch (Exception $e) {
                Log::error('Failed to add question: ' . $e->getMessage(), [
                    'quiz_id' => $quiz->id,
                    'data' => $data,
                    'trace' => $e->getTraceAsString()
                ]);
                throw new Exception('Failed to add question', 0, $e);
            }
        });
    }

    /**
     * Update a specific question in a quiz.
     *
     * @param Quiz $quiz
     * @param int $questionId
     * @param array $data
     * @return Question
     * @throws Exception
     */
    public function updateQuestionInQuiz(Quiz $quiz, int $questionId, array $data): Question
    {
        return DB::transaction(function () use ($quiz, $questionId, $data) {
            try {
                Log::info('Updating question in quiz', ['quiz_id' => $quiz->id, 'question_id' => $questionId, 'data' => $data]);
                $question = $quiz->questions()->findOrFail($questionId);
                return $this->questionService->updateQuestion($quiz, $question, $data);
            } catch (Exception $e) {
                Log::error('Failed to update question: ' . $e->getMessage(), [
                    'quiz_id' => $quiz->id,
                    'question_id' => $questionId,
                    'data' => $data,
                    'trace' => $e->getTraceAsString()
                ]);
                throw new Exception('Failed to update question', 0, $e);
            }
        });
    }

    /**
     * Delete a specific question from a quiz.
     *
     * @param Quiz $quiz
     * @param int $questionId
     * @return void
     * @throws Exception
     */
    public function deleteQuestionFromQuiz(Quiz $quiz, int $questionId): void
    {
        DB::transaction(function () use ($quiz, $questionId) {
            try {
                Log::info('Deleting question from quiz', ['quiz_id' => $quiz->id, 'question_id' => $questionId]);
                $question = $quiz->questions()->findOrFail($questionId);
                $this->questionService->deleteQuestion($quiz, $question);
            } catch (Exception $e) {
                Log::error('Failed to delete question: ' . $e->getMessage(), [
                    'quiz_id' => $quiz->id,
                    'question_id' => $questionId,
                    'trace' => $e->getTraceAsString()
                ]);
                throw new Exception('Failed to delete question', 0, $e);
            }
        });
    }

    /**
     * Store and evaluate a student's answer for a quiz question.
     *
     * @param Quiz $quiz
     * @param \App\Models\User $user
     * @param array $data
     * @return Answer
     * @throws Exception
     */
//    public function storeStudentAnswer(Quiz $quiz, $user, array $data): Answer
//    {
//        return DB::transaction(function () use ($quiz, $user, $data) {
//            try {
//                Log::info('Storing student answer', [
//                    'quiz_id' => $quiz->id,
//                    'user_id' => $user->id,
//                    'question_id' => $data['question_id']
//                ]);
//
//                $question = $quiz->questions()->findOrFail($data['question_id']);
//                if ($question->question_type !== 'table') {
//                    throw new Exception('Only table questions are supported for this answer type', 400);
//                }
//
//                // Получаем попытку
//                $attempt = QuizAttempt::firstOrCreate([
//                    'quiz_id' => $quiz->id,
//                    'user_id' => $user->id,
//                    'attempt_number' => $quiz->attempts()->where('user_id', $user->id)->count() + 1
//                ]);
//
//                if ($quiz->max_attempts && $attempt->attempt_number > $quiz->max_attempts) {
//                    throw new Exception('Maximum attempts exceeded', 403);
//                }
//
//                // Проверяем ответ
//                $metadata = json_decode($question->metadata, true);
//                $correctRows = 0;
//                $totalRows = count($metadata['rows']);
//                $answerData = $data['answer'];
//
//                foreach ($metadata['rows'] as $rowIndex => $row) {
//                    $submitted = collect($answerData)->firstWhere('row', $rowIndex);
//                    if (!$submitted) {
//                        continue;
//                    }
//
//                    $submittedIds = array_map('intval', $submitted['option_ids']);
//                    $correctIds = $row['correct_option_ids'];
//                    sort($submittedIds);
//                    sort($correctIds);
//
//                    if ($submittedIds === $correctIds) {
//                        $correctRows++;
//                    }
//                }
//
//                $isCorrect = $correctRows === $totalRows;
//                $pointsEarned = ($correctRows / $totalRows) * $question->points;
//
//                // Сохраняем ответ
//                $answer = Answer::create([
//                    'quiz_id' => $quiz->id,
//                    'question_id' => $question->id,
//                    'user_id' => $user->id,
//                    'attempt_id' => $attempt->id,
//                    'answer' => $data['answer'],
//                    'is_correct' => $isCorrect,
//                    'points_earned' => $pointsEarned
//                ]);
//
//                return $answer;
//            } catch (Exception $e) {
//                Log::error('Failed to store answer: ' . $e->getMessage(), [
//                    'quiz_id' => $quiz->id,
//                    'user_id' => $user->id,
//                    'data' => $data,
//                    'trace' => $e->getTraceAsString()
//                ]);
//                throw new Exception('Failed to store answer', 0, $e);
//            }
//        });
//    }
}

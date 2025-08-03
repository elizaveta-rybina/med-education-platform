<?php

namespace App\Http\Controllers\Content\Assessments;

use App\Http\Controllers\Controller;
use App\Http\Requests\Content\Assessments\Question\StoreQuestionRequest;
use App\Http\Requests\Content\Assessments\Question\UpdateQuestionRequest;
use App\Http\Requests\Content\Assessments\Quiz\StoreQuizRequest;
use App\Http\Requests\Content\Assessments\Quiz\UpdateQuizRequest;
use App\Http\Requests\Content\Assessments\UserAnswer\StoreAnswerRequest;
use App\Http\Resources\QuestionResource;
use App\Http\Resources\QuizResource;
use App\Http\Resources\StudentQuizResource;
use App\Http\Resources\AnswerResource;
use App\Models\Content\Assessments\Quiz;
use App\Services\Contracts\QuizServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Exception;

class QuizController extends Controller
{
    protected QuizServiceInterface $quizService;

    public function __construct(QuizServiceInterface $quizService)
    {
        $this->quizService = $quizService;
    }

    /**
     * Display a listing of quizzes.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $quizzes = $this->quizService->getAllQuizzes();
            return QuizResource::collection($quizzes)->response();
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to retrieve quizzes: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created quiz with questions and options.
     *
     * @param StoreQuizRequest $request
     * @return JsonResponse
     */
    public function store(StoreQuizRequest $request): JsonResponse
    {
        try {
            $quiz = $this->quizService->createQuiz($request->validated());
            return (new QuizResource($quiz))->response()->setStatusCode(201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to create quiz: ' . $e->getMessage()], $e->getCode() ?: 500);
        }
    }

    /**
     * Display the specified quiz with questions and options.
     *
     * @param Quiz $quiz
     * @return JsonResponse
     */
    public function show(Quiz $quiz): JsonResponse
    {
        try {
            $quiz = $this->quizService->getQuizById($quiz->id);
            return (new QuizResource($quiz))->response();
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to retrieve quiz: ' . $e->getMessage()], $e->getCode() ?: 404);
        }
    }

    /**
     * Display the specified quiz for students (without answers).
     *
     * @param Quiz $quiz
     * @return JsonResponse
     */
    public function showForStudent(Quiz $quiz): JsonResponse
    {
        try {
            $quiz = $this->quizService->getQuizForStudent($quiz->id);
            return (new StudentQuizResource($quiz))->response();
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to retrieve quiz for student: ' . $e->getMessage()], $e->getCode() ?: 404);
        }
    }

    /**
     * Update the specified quiz and optionally its questions and options.
     *
     * @param UpdateQuizRequest $request
     * @param Quiz $quiz
     * @return JsonResponse
     */
    public function update(UpdateQuizRequest $request, Quiz $quiz): JsonResponse
    {
        try {
            $quiz = $this->quizService->updateQuiz($quiz, $request->validated());
            return (new QuizResource($quiz))->response();
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update quiz: ' . $e->getMessage()], $e->getCode() ?: 500);
        }
    }

    /**
     * Remove the specified quiz and its questions/options.
     *
     * @param Quiz $quiz
     * @return JsonResponse
     */
    public function destroy(Quiz $quiz): JsonResponse
    {
        try {
            $this->quizService->deleteQuiz($quiz);
            return response()->json(null, 204);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to delete quiz: ' . $e->getMessage()], $e->getCode() ?: 500);
        }
    }

    /**
     * Add a new question to an existing quiz.
     *
     * @param StoreQuestionRequest $request
     * @param Quiz $quiz
     * @return JsonResponse
     */
    public function storeQuestion(StoreQuestionRequest $request, Quiz $quiz): JsonResponse
    {
        try {
            $question = $this->quizService->addQuestionToQuiz($quiz, $request->validated());
            return (new QuestionResource($question))->response()->setStatusCode(201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to add question: ' . $e->getMessage()], $e->getCode() ?: 500);
        }
    }

    /**
     * Update a specific question in a quiz.
     *
     * @param UpdateQuestionRequest $request
     * @param Quiz $quiz
     * @param int $questionId
     * @return JsonResponse
     */
    public function updateQuestion(UpdateQuestionRequest $request, Quiz $quiz, int $questionId): JsonResponse
    {
        try {
            $question = $this->quizService->updateQuestionInQuiz($quiz, $questionId, $request->validated());
            return (new QuestionResource($question))->response();
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update question: ' . $e->getMessage()], $e->getCode() ?: 500);
        }
    }

    /**
     * Remove a specific question from a quiz.
     *
     * @param Quiz $quiz
     * @param int $questionId
     * @return JsonResponse
     */
    public function destroyQuestion(Quiz $quiz, int $questionId): JsonResponse
    {
        try {
            $this->quizService->deleteQuestionFromQuiz($quiz, $questionId);
            return response()->json(null, 204);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to delete question: ' . $e->getMessage()], $e->getCode() ?: 500);
        }
    }

    /**
     * Store a student's answer for a quiz question.
     *
     * @param StoreAnswerRequest $request
     * @param Quiz $quiz
     * @return JsonResponse
     */
    public function storeAnswer(StoreAnswerRequest $request, Quiz $quiz): JsonResponse
    {
        try {
            $answer = $this->quizService->storeStudentAnswer($quiz, auth()->user(), $request->validated());
            return (new AnswerResource($answer))->response()->setStatusCode(201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to store answer: ' . $e->getMessage()], $e->getCode() ?: 500);
        }
    }
}

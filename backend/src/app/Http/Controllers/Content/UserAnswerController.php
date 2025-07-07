<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Services\Content\Assessments\UserAnswerService;
use Illuminate\Http\Request;

class UserAnswerController extends Controller
{
    protected UserAnswerService $answerService;

    public function __construct(UserAnswerService $answerService)
    {
        $this->answerService = $answerService;
    }

    /**
     * Сохраняет ответы пользователя на вопросы теста.
     *
     * Ожидает в запросе массив answers:
     * [
     *   {
     *     "question_id": int,
     *     "question_type": string,
     *     "match_key": string|null,
     *     "answer_text": string|null,
     *     "answer_ids": array|null,
     *     "score": int|null
     *   },
     *   ...
     * ]
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $userId = $request->user()->id;

            $validated = $request->validate([
                'quiz_id' => 'required|integer|exists:quizzes,id',
                'answers' => 'required|array|min:1',
                'answers.*.question_id' => 'required|integer|exists:questions,id',
                'answers.*.question_type' => 'required|string|in:single_choice,multiple_choice,open_answer,open_answer_reviewed,matching,ordering,open_schema,matching_schema',
                'answers.*.match_key' => 'nullable|string',
                'answers.*.answer_text' => 'nullable|string',
                'answers.*.answer_ids' => 'nullable|array',
                'answers.*.answer_ids.*' => 'integer',
                'answers.*.score' => 'nullable|integer',
                'answers.*.table_answers' => 'nullable|array',
            ]);

            $quizId = $validated['quiz_id'];

            // Получаем номер новой попытки
            $attemptNumber = $this->answerService->getNextAttemptNumber($userId, $quizId);

            // Сохраняем ответы
            $this->answerService->saveUserAnswers($userId, $validated['answers'], $attemptNumber);

            // Пересчитываем и сохраняем результат
            $result = $this->answerService->calculateAndSaveResult($userId, $quizId, $attemptNumber);

            return response()->json([
                'message' => 'Ответы успешно сохранены'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(), // Только для разработки!
            ], 500);
        }
    }

}

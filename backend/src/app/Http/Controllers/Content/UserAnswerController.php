<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Requests\Content\Answer\StoreUserAnswerRequest;
use App\Http\Resources\UserAnswerResource;
use App\Models\Content\Assessments\QuizAttempt;
use App\Services\Content\Assessments\UserAnswerService;

class UserAnswerController extends Controller
{
    protected $userAnswerService;

    public function __construct(UserAnswerService $userAnswerService)
    {
        $this->userAnswerService = $userAnswerService;
    }

    public function store(StoreUserAnswerRequest $request, int $quizAttemptId, int $questionId)
    {
        QuizAttempt::findOrFail($quizAttemptId);
        $data = $request->validated();
        $userAnswers = $this->userAnswerService->create($data['answers'], $quizAttemptId, $questionId, $data['question_type']);
        return UserAnswerResource::collection($userAnswers);
    }
}

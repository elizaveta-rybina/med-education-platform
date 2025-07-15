<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Requests\Content\UserAnswer\UserAnswerRequest;
use App\Services\Content\Assessments\UserAnswerService;
use Illuminate\Support\Facades\Log;

class UserAnswerController extends Controller
{
    protected $userAnswerService;

    public function __construct(UserAnswerService $userAnswerService)
    {
        $this->userAnswerService = $userAnswerService;
    }

    public function submit(UserAnswerRequest $request)
    {
        try {
            $data = $request->validated();
            $this->userAnswerService->submitAnswers($data['quiz_attempt_id'], $data['answers']);
            return response()->json(['message' => 'Answers submitted successfully']);
        } catch (\Exception $e) {
            Log::error('UserAnswerController: Error in submit method', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}

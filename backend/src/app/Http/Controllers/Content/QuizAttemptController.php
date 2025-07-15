<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\QuizAttempt;
use Illuminate\Support\Facades\Log;

class QuizAttemptController extends Controller
{
    public function start(int $quizId)
    {
        try {
            $user = auth()->user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $quiz = Quiz::findOrFail($quizId);
            $attemptCount = QuizAttempt::where('user_id', $user->id)
                ->where('quiz_id', $quizId)
                ->count();

            if ($attemptCount >= $quiz->max_attempts) {
                return response()->json(['error' => 'Maximum attempts exceeded'], 403);
            }

            $attempt = QuizAttempt::create([
                'user_id' => $user->id,
                'quiz_id' => $quizId,
                'attempt_number' => $attemptCount + 1,
                'started_at' => now(),
            ]);

            Log::info('QuizAttemptController: Attempt started', [
                'quiz_attempt_id' => $attempt->id,
                'user_id' => $user->id,
                'quiz_id' => $quizId,
            ]);

            return response()->json([
                'quiz_attempt_id' => $attempt->id,
                'message' => 'Quiz attempt started',
            ]);
        } catch (\Exception $e) {
            Log::error('QuizAttemptController: Error in start method', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}

<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Assessments\UserAnswer;
use App\Models\Content\Assessments\QuizAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminUserAnswerController extends Controller
{
    public function updateScore(Request $request, int $userAnswerId)
    {
        $request->validate([
            'score' => 'required|integer|min:0',
        ]);

        try {
            $userAnswer = UserAnswer::findOrFail($userAnswerId);
            $question = $userAnswer->question;

            if (!in_array($question->question_type, ['open_answer_reviewed', 'open_schema'])) {
                return response()->json(['error' => 'Manual scoring not allowed for this question type'], 403);
            }

            $userAnswer->update(['score' => $request->score]);

            // Пересчитываем общий балл попытки
            $quizAttempt = $userAnswer->quizAttempt;
            $totalScore = $quizAttempt->userAnswers()->sum('score');
            $quizAttempt->update(['score' => $totalScore]);

            // Обновляем результат теста
            \App\Models\Content\Assessments\UserQuizResult::updateOrCreate(
                [
                    'user_id' => $quizAttempt->user_id,
                    'quiz_id' => $quizAttempt->quiz_id,
                    'attempt_number' => $quizAttempt->attempt_number,
                ],
                [
                    'score' => $totalScore,
                    'passed' => $totalScore >= $quizAttempt->quiz->passing_score,
                    'started_at' => $quizAttempt->started_at,
                    'completed_at' => $quizAttempt->completed_at,
                ]
            );

            Log::info('AdminUserAnswerController: Score updated', [
                'user_answer_id' => $userAnswerId,
                'score' => $request->score,
            ]);

            return response()->json(['message' => 'Score updated successfully']);
        } catch (\Exception $e) {
            Log::error('AdminUserAnswerController: Error in updateScore', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}

<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\UserAnswer;
use App\Models\Content\Assessments\UserQuizResult;
use Illuminate\Support\Facades\DB;

class UserAnswerService
{
    public function saveUserAnswers(int $userId, array $answers, int $attemptNumber): void
    {
        DB::transaction(function () use ($userId, $answers, $attemptNumber) {
            foreach ($answers as $answerData) {
                $this->processAnswer($userId, $answerData, $attemptNumber);
            }
        });
    }

    protected function processAnswer(int $userId, array $answerData, int $attemptNumber): void
    {
        $questionType = $answerData['question_type'];
        if ($questionType === 'matching') {
            if (isset($answerData['matches'])) {
                foreach ($answerData['matches'] as $match) {
                    $this->saveAnswer($userId, $answerData['question_id'], $questionType, [
                        'match_key' => $match['match_key'],
                        'answer_text' => $match['match_value'],
                    ], $attemptNumber);
                }
            }
            return;
        }
        elseif (isset($answerData['table_answers'])) {
            foreach ($answerData['table_answers'] as $matchKey => $answerText) {
                $this->saveAnswer($userId, $answerData['question_id'], $questionType, [
                    'match_key' => $matchKey,
                    'answer_text' => $answerText,
                ], $attemptNumber);
            }
            return;
        }

        // Обработка обычных ответов
        $this->saveAnswer($userId, $answerData['question_id'], $questionType, [
            'answer_text' => $answerData['answer_text'] ?? null,
            'answer_ids' => $answerData['answer_ids'] ?? null,
        ], $attemptNumber);
    }

    protected function saveAnswer(int $userId, int $questionId, string $questionType, array $answerFields, int $attemptNumber): void
    {
        $data = array_merge([
            'user_id' => $userId,
            'question_id' => $questionId,
            'question_type' => $questionType,
            'attempt_number' => $attemptNumber,
        ], $answerFields);

        // Добавляем score только если его нет в answerFields
        if (!isset($data['score'])) {
            $data['score'] = $this->evaluateAnswer([
                    'question_id' => $questionId,
                    'question_type' => $questionType,
                ] + $answerFields, $userId);
        }

        // Преобразуем answer_ids в JSON если он есть
        if (isset($data['answer_ids'])) {
            $data['answer_ids'] = json_encode($data['answer_ids']);
        }

        // Создаем новую запись вместо updateOrCreate
        UserAnswer::create($data);
    }

    public function calculateAndSaveResult(int $userId, int $quizId, int $attemptNumber): UserQuizResult
    {
        $quiz = Quiz::with('questions')->findOrFail($quizId);
        $totalScore = 0;
        $maxPossibleScore = $quiz->questions->sum('points');

        $userAnswers = UserAnswer::where('user_id', $userId)
            ->where('attempt_number', $attemptNumber)
            ->whereIn('question_id', $quiz->questions->pluck('id'))
            ->get();

        // Группируем ответы по question_id для обработки matching вопросов
        $groupedAnswers = $userAnswers->groupBy('question_id');

        foreach ($groupedAnswers as $questionId => $answers) {
            $question = $quiz->questions->firstWhere('id', $questionId);

            if ($question->question_type === 'matching') {
                // Для matching вопросов суммируем все баллы за отдельные matches
                $totalScore += $answers->sum('score');
            } else {
                // Для других типов вопросов берем первый ответ (они не должны дублироваться)
                $totalScore += $answers->first()->score ?? 0;
            }
        }

        $percentage = $maxPossibleScore > 0 ? round(($totalScore / $maxPossibleScore) * 100) : 0;
        $passed = $percentage >= $quiz->passing_score;

        return UserQuizResult::updateOrCreate(
            [
                'user_id' => $userId,
                'quiz_id' => $quizId,
                'attempt_number' => $attemptNumber,
            ],
            [
                'score' => $totalScore,
                'passed' => $passed,
                'completed_at' => now(),
            ]
        );
    }

    protected function evaluateAnswer(array $answerData, int $userId): int
    {
        $question = Question::with('answers')->findOrFail($answerData['question_id']);
        $questionType = $answerData['question_type'];

        switch ($questionType) {
            case 'single_choice':
                return $this->evaluateSingleChoice($question, $answerData);

            case 'multiple_choice':
                return $this->evaluateMultipleChoice($question, $answerData);

            case 'open_answer':
                return $this->evaluateOpenAnswer($question, $answerData);

            case 'open_answer_reviewed':
                return 0; // Оценивается преподавателем

            case 'matching':
                return $this->evaluateMatching($question, $answerData, $userId);

            case 'ordering':
                return $this->evaluateOrdering($question, $answerData);

            case 'open_schema':
                return $this->evaluateSchemaQuestion($question, $answerData, false);

            case 'matching_schema':
                return $this->evaluateSchemaQuestion($question, $answerData, true);

            default:
                return 0;
        }
    }

    protected function evaluateSingleChoice(Question $question, array $answerData): int
    {
        $correctAnswer = $question->answers->firstWhere('is_correct', true);
        $userAnswerId = $answerData['answer_ids'][0] ?? null;

        return ($correctAnswer && $userAnswerId == $correctAnswer->id) ? $question->points : 0;
    }

    protected function evaluateMultipleChoice(Question $question, array $answerData): int
    {
        $correctAnswers = $question->answers
            ->where('is_correct', true)
            ->pluck('id')
            ->sort()
            ->values()
            ->toArray();

        $userAnswers = collect($answerData['answer_ids'] ?? [])
            ->sort()
            ->values()
            ->toArray();

        return $correctAnswers === $userAnswers ? $question->points : 0;
    }

    protected function evaluateOpenAnswer(Question $question, array $answerData): int
    {
        $correctText = trim(mb_strtolower($question->answers[0]->answer_text ?? ''));
        $userText = trim(mb_strtolower($answerData['answer_text'] ?? ''));

        return $correctText === $userText ? $question->points : 0;
    }

    protected function evaluateMatching(Question $question, array $answerData, int $userId): int
    {
        $correctMatches = $question->answers
            ->mapWithKeys(fn ($item) => [
                $item['match_key'] => mb_strtolower(trim($item['match_value']))
            ]);

        // Если это вызов из saveAnswer (отдельный match)
        if (isset($answerData['match_key'])) {
            $userValue = mb_strtolower(trim($answerData['answer_text'] ?? ''));
            $correctValue = $correctMatches[$answerData['match_key']] ?? null;

            return $correctValue === $userValue
                ? intval(round($question->points / $correctMatches->count()))
                : 0;
        }

        return 0;
    }
    protected function evaluateOrdering(Question $question, array $answerData): int
    {
        $correctOrder = $question->answers
            ->sortBy('order')
            ->pluck('id')
            ->values()
            ->toArray();

        $userOrder = $answerData['answer_ids'] ?? [];

        if (count($correctOrder) !== count($userOrder)) {
            return 0;
        }

        $correctPositions = 0;
        foreach ($userOrder as $index => $id) {
            if ($correctOrder[$index] == $id) {
                $correctPositions++;
            }
        }

        return intval(round(($correctPositions / count($correctOrder)) * $question->points));
    }

    protected function evaluateSchemaQuestion(Question $question, array $answerData, bool $isMatching): int
    {
        $totalCells = count($question->table['rows'] ?? []);
        if ($totalCells === 0) return 0;

        $scorePerCell = $question->points / $totalCells;
        $totalScore = 0;

        foreach ($answerData['table_answers'] ?? [] as $cellKey => $userAnswer) {
            if ($isMatching) {
                $correctAnswer = $question->answers->firstWhere('match_key', $cellKey)->match_value ?? '';
                $isCorrect = trim(mb_strtolower($userAnswer)) === trim(mb_strtolower($correctAnswer));
            } else {
                $isCorrect = !empty(trim($userAnswer));
            }

            if ($isCorrect) {
                $totalScore += $scorePerCell;
            }
        }

        return min($question->points, $totalScore);
    }

    public function getNextAttemptNumber(int $userId, int $quizId): int
    {
        $lastAttempt = UserQuizResult::where('user_id', $userId)
            ->where('quiz_id', $quizId)
            ->orderByDesc('attempt_number')
            ->first();

        return ($lastAttempt ? $lastAttempt->attempt_number : 0) + 1;
    }
}

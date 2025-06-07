<?php

namespace App\Services\Content\Assessments;

use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\Quiz;
use App\Models\Content\Assessments\UserAnswer;
use App\Models\Content\Assessments\UserQuizResult;
use Illuminate\Support\Facades\DB;

/**
 * Class UserAnswerService.
 */
class UserAnswerService
{
    /**
     * Сохранить или обновить ответы пользователя по вопросам теста.
     *
     * @param int $userId
     * @param array $answers Массив с ответами, например:
     * [
     *   [
     *     'question_id' => 123,
     *     'question_type' => 'matching_schema',
     *     'match_key' => 'row1_col2',       // необязательно
     *     'answer_text' => 'текст ответа', // либо
     *     'answer_ids' => [1, 3],           // либо
     *     'score' => 5                     // необязательно
     *   ],
     *   ...
     * ]
     *
     * @return void
     */
    public function saveUserAnswers(int $userId, array $answers): void
    {
        DB::transaction(function () use ($userId, $answers) {
            foreach ($answers as $answerData) {
                $questionId = $answerData['question_id'];
                $questionType = $answerData['question_type'];

                // Обработка table_answers для схем
                if (in_array($questionType, ['open_schema', 'matching_schema'])) {
                foreach ($answerData['table_answers'] ?? [] as $matchKey => $answerText) {
                    $this->saveSingleAnswer($userId, [
                        'question_id' => $questionId,
                        'question_type' => $questionType,
                        'match_key' => $matchKey,
                        'answer_text' => $answerText,
                    ]);
                }
                continue;
            }

                $this->saveSingleAnswer($userId, $answerData);
            }
        });
    }

    protected function saveSingleAnswer(int $userId, array $answerData): void
    {
        $query = UserAnswer::where('user_id', $userId)
            ->where('question_id', $answerData['question_id'])
            ->where('question_type', $answerData['question_type']);

        if (!empty($answerData['match_key'])) {
            $query->where('match_key', $answerData['match_key']);
        } else {
            $query->whereNull('match_key');
        }

        $userAnswer = $query->first();

        $dataToSave = [
            'user_id' => $userId,
            'question_id' => $answerData['question_id'],
            'question_type' => $answerData['question_type'],
            'match_key' => $answerData['match_key'] ?? null,
            'answer_text' => $answerData['answer_text'] ?? null,
            'answer_ids' => isset($answerData['answer_ids']) ? json_encode($answerData['answer_ids']) : null,
            'score' => $answerData['score'] ?? $this->evaluateAnswer($answerData),
        ];

        if ($userAnswer) {
            $userAnswer->update($dataToSave);
        } else {
            UserAnswer::create($dataToSave);
        }
    }
    public function calculateAndSaveResult(int $userId, int $quizId, int $attemptNumber): UserQuizResult
    {
        $quiz = Quiz::findOrFail($quizId);

        // Получаем все вопросы теста
        $questionIds = $quiz->questions()->pluck('id')->toArray();

        // Получаем ответы пользователя на эти вопросы
        $userAnswers = UserAnswer::where('user_id', $userId)
            ->whereIn('question_id', $questionIds)
            ->get();

        // Подсчитываем общий score
        $totalScore = 0;
        foreach ($userAnswers as $answer) {
            $totalScore += $answer->score ?? 0;
        }

        // Вычисляем прошёл ли пользователь тест (по passing_score в процентах)
        $passed = $totalScore >= $quiz->passing_score;

        // Создаём или обновляем результат попытки
        $result = UserQuizResult::updateOrCreate(
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

        return $result;
    }

    public function getNextAttemptNumber(int $userId, int $quizId): int
    {
        $lastAttempt = UserQuizResult::where('user_id', $userId)
            ->where('quiz_id', $quizId)
            ->orderByDesc('attempt_number')
            ->first();

        return $lastAttempt ? $lastAttempt->attempt_number + 1 : 1;
    }

    protected function evaluateAnswer(array $answerData): int
    {
        $question = Question::findOrFail($answerData['question_id']);

        return match ($answerData['question_type']) {
            'single_choice' => $this->checkSingleChoice($question, $answerData),
            'multiple_choice' => $this->checkMultipleChoice($question, $answerData),
            'open_answer' => $this->checkOpenAnswer($question, $answerData),
            'matching' => $this->checkMatching($question, $answerData),
            'ordering' => $this->checkOrdering($question, $answerData),
            'open_schema' => $this->checkOpenSchema($question, $answerData),
            'matching_schema' => $this->checkMatchingSchema($question, $answerData),
            default => 0,
        };
    }
    protected function checkSingleChoice(Question $question, array $answerData): int
    {
        $correctId = $question->answers->firstWhere('is_correct', true)?->id;

        return in_array($correctId, $answerData['answer_ids'] ?? [], true) ? $question->max_score : 0;
    }

    protected function checkMultipleChoice(Question $question, array $answerData): int
    {
        $correct = $question->answers->where('is_correct', true)->pluck('id')->sort()->values();
        $user = collect($answerData['answer_ids'] ?? [])->sort()->values();

        return $correct->equals($user) ? $question->max_score : 0;
    }

    protected function checkOpenAnswer(Question $question, array $answerData): int
    {
        $correct = trim(mb_strtolower($question->correct_text ?? ''));
        $user = trim(mb_strtolower($answerData['answer_text'] ?? ''));

        return $correct === $user ? $question->max_score : 0;
    }

    protected function checkMatching(Question $question, array $answerData): int
    {
        // Предполагается: match_key = "left1", answer_text = "right2"
        $correctMatches = $question->matchingPairs ?? []; // ['left1' => 'right1', ...]
        $userKey = $answerData['match_key'] ?? null;
        $userValue = trim(mb_strtolower($answerData['answer_text'] ?? ''));

        if (!$userKey || !isset($correctMatches[$userKey])) return 0;

        return trim(mb_strtolower($correctMatches[$userKey])) === $userValue
            ? intval(round($question->max_score / count($correctMatches)))
            : 0;
    }

    protected function checkOrdering(Question $question, array $answerData): int
    {
        $correctOrder = $question->orderingAnswers ?? []; // ['id1', 'id2', ...]
        $userOrder = $answerData['answer_ids'] ?? [];

        if (empty($correctOrder) || empty($userOrder)) return 0;

        $correctCount = count($correctOrder);
        $matched = 0;

        foreach ($userOrder as $i => $id) {
            if (isset($correctOrder[$i]) && $correctOrder[$i] == $id) {
                $matched++;
            }
        }

        return intval(round(($matched / $correctCount) * $question->max_score));
    }

    protected function checkOpenSchema(Question $question, array $answerData): int
    {
        // Предполагается: match_key = cell_key, answer_text = значение ячейки
        $correctSchema = $question->schemaCells ?? []; // ['row1_col2' => 'value']
        $cellKey = $answerData['match_key'] ?? null;
        $userValue = trim(mb_strtolower($answerData['answer_text'] ?? ''));

        if (!$cellKey || !isset($correctSchema[$cellKey])) return 0;

        return trim(mb_strtolower($correctSchema[$cellKey])) === $userValue
            ? intval(round($question->max_score / count($correctSchema)))
            : 0;
    }

    protected function checkMatchingSchema(Question $question, array $answerData): int
    {
        // Аналогично open_schema, но данные задаются по ID ячеек с ответами
        $correctMatches = $question->matchingSchemaCells ?? []; // ['cell_key' => correct_value]
        $cellKey = $answerData['match_key'] ?? null;
        $userValue = trim(mb_strtolower($answerData['answer_text'] ?? ''));

        if (!$cellKey || !isset($correctMatches[$cellKey])) return 0;

        return trim(mb_strtolower($correctMatches[$cellKey])) === $userValue
            ? intval(round($question->max_score / count($correctMatches)))
            : 0;
    }

}

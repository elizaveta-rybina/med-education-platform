<?php

namespace App\Repositories;

use App\Models\Content\Assessments\Question;
use App\Models\Content\Assessments\UserAnswer;
use Illuminate\Support\Facades\Log;

class UserAnswerRepository
{
    public function create(array $data, int $quizAttemptId): ?int
    {
        try {
            $question = Question::findOrFail($data['question_id']);

            // Проверка соответствия question_type
            if ($question->question_type !== $data['question_type']) {
                throw new \Exception("Question type mismatch: expected {$question->question_type}, got {$data['question_type']}");
            }

            // Проверка, что ответ уже не отправлен для этого вопроса в рамках попытки
            if (UserAnswer::where('quiz_attempt_id', $quizAttemptId)
                ->where('question_id', $data['question_id'])
                ->exists()) {
                throw new \Exception("Answer for question {$data['question_id']} already submitted");
            }

            // Сохраняем ответ как JSON
            $answerData = $data['answer'] ?? $data; // Предполагаем, что 'answer' - ключ для данных ответа
            $userAnswer = UserAnswer::create([
                'quiz_attempt_id' => $quizAttemptId,
                'question_id' => $data['question_id'],
                'answer_data' => json_encode($answerData, JSON_UNESCAPED_UNICODE),
                'points_earned' => null,
                'is_correct' => null,
            ]);

            // Рассчитываем баллы и правильность, если вопрос автооцениваемый
            $score = null;
            $isCorrect = null;
            if ($question->is_auto_graded) {
                $score = $this->calculateScore($question, $answerData);
                $isCorrect = $score === $question->points;
            }

            $userAnswer->update([
                'points_earned' => $score,
                'is_correct' => $isCorrect,
            ]);

            Log::info('UserAnswerRepository: Answer created', [
                'question_id' => $data['question_id'],
                'question_type' => $question->question_type,
                'score' => $score,
            ]);

            return $score;
        } catch (\Exception $e) {
            Log::error('UserAnswerRepository: Error in create', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    protected function calculateScore(Question $question, array $userAnswerData): int
    {
        // Исправляем: metadata может быть уже массивом (из-за casts в модели Question)
        $metadata = $question->metadata;

        if (is_string($metadata)) {
            $metadata = json_decode($metadata, true) ?? [];
        } elseif (!is_array($metadata)) {
            $metadata = [];
        }

        return match ($question->question_type) {
            'single_choice' => $this->calculateSingleChoiceScore($question, $userAnswerData, $metadata),
            'multiple_choice' => $this->calculateMultipleChoiceScore($question, $userAnswerData, $metadata),
            'text_input' => 0,
            'matching' => $this->calculateMatchingScore($question, $userAnswerData, $metadata),
            'ordering' => $this->calculateOrderingScore($question, $userAnswerData, $metadata),
            'table' => $this->calculateTableScore($question, $userAnswerData, $metadata),
            default => 0,
        };
    }

    protected function calculateSingleChoiceScore(Question $question, array $data, array $metadata): int
    {
        $selectedId = $data['option_id'] ?? null;
        $correctOption = $question->options()->where('is_correct', true)->first();

        return ($correctOption && $correctOption->id == $selectedId) ? $question->points : 0;
    }

    protected function calculateMultipleChoiceScore(Question $question, array $data, array $metadata): int
    {
        $userIds = collect($data['option_ids'] ?? [])->sort()->values()->all();
        $correctIds = $question->options()->where('is_correct', true)->pluck('id')->sort()->values()->all();

        return $userIds === $correctIds ? $question->points : 0;
    }

    protected function calculateMatchingScore(Question $question, array $data, array $metadata): int
    {
        $pairs = $metadata['pairs'] ?? [];
        if (empty($pairs)) {
            return 0;
        }

        $userMatches = collect($data['matches'] ?? [])->keyBy(function ($match) {
            return $match['left'];
        });

        $correctCount = 0;
        foreach ($pairs as $pair) {
            $left = $pair[0];
            $correctRight = $pair[1];
            $userRight = $userMatches->get($left)['right'] ?? null;

            // Находим ID опции по тексту (предполагаем, что right - текст опции)
            $correctOptionId = $question->options()->where('text', $correctRight)->value('id');
            $userOptionId = $question->options()->where('text', $userRight)->value('id');

            if ($correctOptionId == $userOptionId) {
                $correctCount++;
            }
        }

        // Частичные баллы
        return (int) round(($correctCount / count($pairs)) * $question->points);
    }

    protected function calculateOrderingScore(Question $question, array $data, array $metadata): int
    {
        $userOrder = collect($data['orders'] ?? [])->sortBy('order')->pluck('option_id')->all();
        $correctOrder = $question->options()->orderBy('order')->pluck('id')->all();

        return $userOrder === $correctOrder ? $question->points : 0;
    }

    protected function calculateTableScore(Question $question, array $data, array $metadata): int
    {
        $rows = $metadata['rows'] ?? [];
        if (empty($rows)) {
            return 0;
        }

        $userRows = collect($data ?? [])->keyBy('row');
        $correctCount = 0;

        foreach ($rows as $index => $row) {
            $correctIds = collect($row['correct_option_ids'] ?? [])->sort()->values()->all();
            $userIds = collect($userRows->get($index)['option_ids'] ?? [])->sort()->values()->all();

            if ($correctIds === $userIds) {
                $correctCount++;
            }
        }

        // Частичные баллы
        return (int) round(($correctCount / count($rows)) * $question->points);
    }
}

<?php

namespace App\Repositories;

use App\Models\Content\Assessments\UserAnswer;
use App\Models\Content\Assessments\UserChoiceAnswer;
use App\Models\Content\Assessments\UserTextAnswer;
use App\Models\Content\Assessments\UserMatchingAnswer;
use App\Models\Content\Assessments\UserOrderingAnswer;
use App\Models\Content\Assessments\UserOpenSchemaAnswer;
use App\Models\Content\Assessments\UserMatchingSchemaAnswer;
use Illuminate\Support\Facades\Log;

class UserAnswerRepository
{
    public function create(array $data, int $quizAttemptId): ?int
    {
        try {
            $question = \App\Models\Content\Assessments\Question::findOrFail($data['question_id']);

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

            $score = null;
            $userAnswerable = match ($data['question_type']) {
                'single_choice' => $this->createSingleChoiceAnswer($data),
                'multiple_choice' => $this->createMultipleChoiceAnswer($data),
                'open_answer', 'open_answer_reviewed' => $this->createTextAnswer($data),
                'matching' => $this->createMatchingAnswer($data),
                'ordering' => $this->createOrderingAnswer($data),
                'open_schema' => $this->createOpenSchemaAnswer($data),
                'matching_schema' => $this->createMatchingSchemaAnswer($data),
                default => throw new \InvalidArgumentException("Unsupported question type: {$data['question_type']}"),
            };

            if ($userAnswerable) {
                $userAnswer = UserAnswer::create([
                    'quiz_attempt_id' => $quizAttemptId,
                    'question_id' => $data['question_id'],
                    'user_answerable_id' => $userAnswerable->id,
                    'user_answerable_type' => get_class($userAnswerable),
                    'score' => $score,
                ]);

                // Рассчитываем баллы
                $score = $this->calculateScore($data, $userAnswer, $question);
                $userAnswer->update(['score' => $score]);

                Log::info('UserAnswerRepository: Answer created', [
                    'question_id' => $data['question_id'],
                    'user_answerable_type' => get_class($userAnswerable),
                ]);
            }

            return $score;
        } catch (\Exception $e) {
            Log::error('UserAnswerRepository: Error in create', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    protected function createSingleChoiceAnswer(array $data): ?UserChoiceAnswer
    {
        return UserChoiceAnswer::create([
            'choice_answer_id' => $data['choice_answer_id'],
        ]);
    }

    protected function createMultipleChoiceAnswer(array $data): ?UserChoiceAnswer
    {
        $userAnswerable = null;
        foreach ($data['choice_answer_ids'] as $choiceAnswerId) {
            $userAnswerable = UserChoiceAnswer::create([
                'choice_answer_id' => $choiceAnswerId,
            ]);
        }
        return $userAnswerable;
    }

    protected function createTextAnswer(array $data): ?UserTextAnswer
    {
        return UserTextAnswer::create([
            'answer_text' => $data['answer_text'],
        ]);
    }

    protected function createMatchingAnswer(array $data): ?UserMatchingAnswer
    {
        $userAnswerable = null;
        foreach ($data['matching_answers'] as $matchingAnswer) {
            $userAnswerable = UserMatchingAnswer::create([
                'matching_answer_id' => $matchingAnswer['matching_answer_id'],
                'user_match_value' => $matchingAnswer['user_match_value'],
            ]);
        }
        return $userAnswerable;
    }

    protected function createOrderingAnswer(array $data): ?UserOrderingAnswer
    {
        $userAnswerable = null;
        foreach ($data['ordering_answers'] as $orderingAnswer) {
            $userAnswerable = UserOrderingAnswer::create([
                'ordering_answer_id' => $orderingAnswer['ordering_answer_id'],
                'user_order' => $orderingAnswer['user_order'],
            ]);
        }
        return $userAnswerable;
    }

    protected function createOpenSchemaAnswer(array $data): ?UserOpenSchemaAnswer
    {
        return UserOpenSchemaAnswer::create([
            'open_schema_answer_id' => $data['open_schema_answer_id'],
            'user_schema_data' => $data['user_schema_data'],
        ]);
    }

    protected function createMatchingSchemaAnswer(array $data): ?UserMatchingSchemaAnswer
    {
        $userAnswerable = null;
        foreach ($data['matching_schema_answers'] as $matchingSchemaAnswer) {
            $userAnswerable = UserMatchingSchemaAnswer::create([
                'matching_schema_answer_id' => $matchingSchemaAnswer['matching_schema_answer_id'],
                'user_schema_value' => $matchingSchemaAnswer['user_schema_value'],
            ]);
        }
        return $userAnswerable;
    }

    protected function calculateScore(array $data, UserAnswer $userAnswer, $question): ?int
    {
        return match ($data['question_type']) {
            'single_choice' => $this->calculateSingleChoiceScore($data, $userAnswer, $question),
            'multiple_choice' => $this->calculateMultipleChoiceScore($data, $userAnswer, $question),
            'open_answer', 'open_answer_reviewed' => null, // Оценка вручную
            'matching' => $this->calculateMatchingScore($data, $userAnswer, $question),
            'ordering' => $this->calculateOrderingScore($data, $userAnswer, $question),
            'open_schema' => null, // Оценка вручную
            'matching_schema' => $this->calculateMatchingSchemaScore($data, $userAnswer, $question),
            default => 0,
        };
    }

    protected function calculateSingleChoiceScore(array $data, UserAnswer $userAnswer, $question): int
    {
        $answer = \App\Models\Content\Assessments\Answer::where('answerable_id', $data['choice_answer_id'])
            ->where('answerable_type', \App\Models\Content\Assessments\ChoiceAnswer::class)
            ->where('question_id', $question->id)
            ->first();

        if (!$answer) {
            Log::warning('SingleChoice: Invalid choice_answer_id', [
                'choice_answer_id' => $data['choice_answer_id'],
                'question_id' => $question->id,
            ]);
            return 0;
        }

        $choiceAnswer = $answer->answerable;
        return $choiceAnswer && $choiceAnswer->is_correct ? $question->points : 0;
    }

    protected function calculateMultipleChoiceScore(array $data, UserAnswer $userAnswer, $question): int
    {
        $correctAnswerIds = \App\Models\Content\Assessments\Answer::where('question_id', $question->id)
            ->where('answerable_type', \App\Models\Content\Assessments\ChoiceAnswer::class)
            ->whereHas('answerable', function ($query) {
                $query->where('is_correct', true);
            })
            ->pluck('answerable_id')
            ->toArray();

        Log::debug('MultipleChoice: Correct answer IDs', [
            'question_id' => $question->id,
            'correct_answer_ids' => $correctAnswerIds,
            'user_answer_ids' => $data['choice_answer_ids'],
        ]);

        $userAnswerIds = $data['choice_answer_ids'];
        $allCorrect = empty(array_diff($correctAnswerIds, $userAnswerIds)) && empty(array_diff($userAnswerIds, $correctAnswerIds));
        return $allCorrect ? $question->points : 0;
    }

    protected function calculateMatchingScore(array $data, UserAnswer $userAnswer, $question): int
    {
        $allCorrect = true;
        foreach ($data['matching_answers'] as $matchingAnswer) {
            $correctAnswer = \App\Models\Content\Assessments\MatchingAnswer::find($matchingAnswer['matching_answer_id']);
            if (!$correctAnswer || $correctAnswer->match_value !== $matchingAnswer['user_match_value']) {
                $allCorrect = false;
                break;
            }
        }
        return $allCorrect ? $question->points : 0;
    }

    protected function calculateOrderingScore(array $data, UserAnswer $userAnswer, $question): int
    {
        $allCorrect = true;
        foreach ($data['ordering_answers'] as $orderingAnswer) {
            $correctAnswer = \App\Models\Content\Assessments\OrderingAnswer::find($orderingAnswer['ordering_answer_id']);
            if (!$correctAnswer || $correctAnswer->correct_order !== $orderingAnswer['user_order']) {
                $allCorrect = false;
                break;
            }
        }
        return $allCorrect ? $question->points : 0;
    }

    protected function calculateMatchingSchemaScore(array $data, UserAnswer $userAnswer, $question): int
    {
        $allCorrect = true;
        foreach ($data['matching_schema_answers'] as $matchingSchemaAnswer) {
            $correctAnswer = \App\Models\Content\Assessments\MatchingSchemaAnswer::find($matchingSchemaAnswer['matching_schema_answer_id']);
            if (!$correctAnswer || $correctAnswer->schema_value !== $matchingSchemaAnswer['user_schema_value']) {
                $allCorrect = false;
                break;
            }
        }
        return $allCorrect ? $question->points : 0;
    }
}

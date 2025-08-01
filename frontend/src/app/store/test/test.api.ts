export interface Answer {
	questionId: string
	selectedOptionIds: string[]
}

export interface TestResult {
	totalCorrect: number
	totalQuestions: number
}

export const submitTestAnswers = async (
	answers: Answer[]
): Promise<TestResult> => {
	// TODO: Заменить на реальный API вызов для проврки ответов
	const response = await fetch('/api/test/submit', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ answers })
	})
	if (!response.ok) {
		throw new Error('Failed to submit test answers')
	}
	return response.json()
}

import { useEffect, useState } from 'react'

export type QuizResult = {
	id: string
	title?: string
	quizType?: string
	correct: number
	total: number
}

export const useResults = () => {
	const [correctAnswers, setCorrectAnswers] = useState(0)
	const [totalAnswers, setTotalAnswers] = useState(0)
	const [quizResults, setQuizResults] = useState<QuizResult[]>([])

	const calculateResults = () => {
		let total = 0
		let correct = 0
		const perQuiz: QuizResult[] = []

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)
			if (!key || !key.startsWith('quizResults_')) continue
			try {
				const stored = JSON.parse(localStorage.getItem(key) || '{}') as {
					quizScore?: { correct?: number; total?: number }
					title?: string
					quizType?: string
				}
				const quizId = key.replace('quizResults_', '')
				const quizCorrect = stored.quizScore?.correct ?? 0
				const quizTotal = stored.quizScore?.total ?? 0
				perQuiz.push({
					id: quizId,
					title: stored.title,
					quizType: stored.quizType,
					correct: quizCorrect,
					total: quizTotal
				})
				correct += quizCorrect
				total += quizTotal
			} catch (error) {
				console.error(
					'useResults: Error parsing quizResults entry:',
					key,
					error
				)
			}
		}

		perQuiz.sort((a, b) => a.id.localeCompare(b.id))
		setQuizResults(perQuiz)
		setTotalAnswers(total)
		setCorrectAnswers(correct)
	}

	useEffect(() => {
		calculateResults()
		window.addEventListener('resultsUpdated', calculateResults)
		return () => window.removeEventListener('resultsUpdated', calculateResults)
	}, []) // Без зависимости от course

	return { correctAnswers, totalAnswers, quizResults }
}

import { useEffect, useState } from 'react'

export const useResults = () => {
	const [correctAnswers, setCorrectAnswers] = useState(0)
	const [totalAnswers, setTotalAnswers] = useState(0)

	const calculateResults = () => {
		const testResults = localStorage.getItem('testResults')
		const ddtAnswers = localStorage.getItem('ddtAnswers')
		const dndResults = localStorage.getItem('dndResults')

		console.log('useResults: testResults:', testResults)
		console.log('useResults: ddtAnswers:', ddtAnswers)
		console.log('useResults: dndResults:', dndResults)

		let total = 0
		let correct = 0

		// Process testResults
		if (testResults) {
			try {
				const results = JSON.parse(testResults) as Record<
					string,
					{ totalCorrect: number; totalQuestions: number }
				>
				Object.values(results).forEach(({ totalCorrect, totalQuestions }) => {
					total += totalQuestions
					correct += totalCorrect
				})
			} catch (error) {
				console.error('useResults: Error parsing testResults:', error)
			}
		}

		// Process ddtAnswers
		if (ddtAnswers) {
			try {
				const results = JSON.parse(ddtAnswers) as Record<
					string,
					| { answers: Record<string, string>; isCorrect?: boolean }
					| Record<string, string>
				>
				Object.values(results).forEach(block => {
					if ('answers' in block && 'isCorrect' in block) {
						total += 1 // Count each block as one question
						correct += block.isCorrect ? 1 : 0
					} else if (Object.values(block).every(val => val === '')) {
						console.warn(
							'useResults: ddtAnswers contains empty strings, skipping'
						)
					} else {
						console.warn('useResults: ddtAnswers format not supported')
					}
				})
			} catch (error) {
				console.error('useResults: Error parsing ddtAnswers:', error)
			}
		}

		// Process dndResults
		if (dndResults) {
			try {
				const results = JSON.parse(dndResults) as Record<
					string,
					{
						correctCount?: number
						isLocked?: boolean
						errors?: Record<string, boolean>
						isCompleted?: boolean
					}
				>
				Object.values(results).forEach(block => {
					if (block.correctCount !== undefined) {
						total += 1
						correct += block.correctCount > 0 ? 1 : 0
					} else if (block.errors && typeof block.errors === 'object') {
						total += 1
						correct += Object.values(block.errors).every(err => !err) ? 1 : 0
					}
				})
			} catch (error) {
				console.error('useResults: Error parsing dndResults:', error)
			}
		}

		console.log('useResults: total:', total, 'correct:', correct)
		setTotalAnswers(total)
		setCorrectAnswers(correct)
	}

	useEffect(() => {
		calculateResults()
		window.addEventListener('resultsUpdated', calculateResults)
		return () => window.removeEventListener('resultsUpdated', calculateResults)
	}, [])

	return { correctAnswers, totalAnswers }
}

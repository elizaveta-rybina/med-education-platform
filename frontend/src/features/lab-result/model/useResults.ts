import { useEffect, useState } from 'react'

export const useResults = () => {
	const [correctAnswers, setCorrectAnswers] = useState(0)
	const [totalAnswers, setTotalAnswers] = useState(0)

	useEffect(() => {
		// Собираем результаты из localStorage
		const testResults = localStorage.getItem('testResults')
		const ddtAnswers = localStorage.getItem('ddtAnswers')
		const dndResults = localStorage.getItem('dndResults')

		let total = 0
		let correct = 0

		// Обработка testResults
		if (testResults) {
			const results = JSON.parse(testResults) as Record<string, boolean>
			total += Object.keys(results).length
			correct += Object.values(results).filter(result => result === true).length
		}

		// Обработка ddtAnswers (предполагаем, что это { [questionId]: boolean })
		if (ddtAnswers) {
			const results = JSON.parse(ddtAnswers) as Record<string, boolean>
			total += Object.keys(results).length
			correct += Object.values(results).filter(result => result === true).length
		}

		// Обработка dndResults (предполагаем, что это { [questionId]: boolean })
		if (dndResults) {
			const results = JSON.parse(dndResults) as Record<string, boolean>
			total += Object.keys(results).length
			correct += Object.values(results).filter(result => result === true).length
		}

		setTotalAnswers(total)
		setCorrectAnswers(correct)
	}, [])

	return { correctAnswers, totalAnswers }
}

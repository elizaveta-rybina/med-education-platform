import { useCourse } from '@/hooks/useCourse'
import { useEffect, useState } from 'react'

export const useResults = () => {
	const [correctAnswers, setCorrectAnswers] = useState(0)
	const [totalAnswers, setTotalAnswers] = useState(0)
	const { course } = useCourse()

	const calculateResults = () => {
		const testResults = localStorage.getItem('testResults')
		const ddtAnswers = localStorage.getItem('ddtAnswers')
		const dndResults = localStorage.getItem('dndResults')

		console.log('useResults: testResults:', testResults)
		console.log('useResults: ddtAnswers:', ddtAnswers)
		console.log('useResults: dndResults:', dndResults)

		let total = 0
		let correct = 0

		// Process testResults (для question-блоков)
		if (testResults) {
			try {
				const results = JSON.parse(testResults) as Record<
					string,
					{ totalCorrect: number; totalQuestions: number }
				>
				Object.values(results).forEach(({ totalCorrect, totalQuestions }) => {
					total += totalQuestions // Учитываем все вопросы из testResults
					correct += totalCorrect // Учитываем только правильные ответы
				})
			} catch (error) {
				console.error('useResults: Error parsing testResults:', error)
			}
		}

		// Process ddtAnswers (предполагаемый dropdown-table)
		if (ddtAnswers) {
			try {
				const results = JSON.parse(ddtAnswers) as Record<
					string,
					| { answers: Record<string, string>; isCorrect?: boolean }
					| Record<string, string>
				>
				Object.values(results).forEach(block => {
					if ('answers' in block) {
						// Учитываем все ячейки (кроме col0) как вопросы
						const questionCount = Object.keys(block.answers).filter(
							key => !key.endsWith('-col0')
						).length
						total += questionCount
						// Если isCorrect есть и равно true, добавляем все ячейки в correct
						if ('isCorrect' in block && block.isCorrect) {
							correct += questionCount
						}
					} else {
						// Учитываем все ячейки (кроме col0) как вопросы
						const questionCount = Object.keys(block).filter(
							key => !key.endsWith('-col0')
						).length
						total += questionCount
					}
				})
			} catch (error) {
				console.error('useResults: Error parsing ddtAnswers:', error)
			}
		}

		// Process dndResults (для drag-drop-table)
		if (dndResults) {
			try {
				const results = JSON.parse(dndResults) as Record<
					string,
					{
						correctCount?: number
						isLocked?: boolean
						errors?: Record<string, boolean>
						isCompleted?: boolean
						assigned?: Record<string, string[]>
					}
				>
				Object.values(results).forEach(block => {
					if (block.correctCount !== undefined && block.assigned) {
						// Считаем количество строк из assigned
						const rowCount = Object.keys(block.assigned).length
						total += rowCount // Каждая строка — один вопрос
						correct += block.correctCount // Учитываем правильные ответы
					} else if (block.errors && typeof block.errors === 'object') {
						// Считаем количество строк из errors
						const rowCount = Object.keys(block.errors).length
						total += rowCount
						correct += Object.values(block.errors).every(err => !err)
							? rowCount
							: 0
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
	}, []) // Без зависимости от course

	return { correctAnswers, totalAnswers }
}

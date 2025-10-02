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

		// Подсчет всех вопросов из структуры курса
		if (course) {
			course.modules.forEach(module => {
				module.chapters.forEach(chapter => {
					chapter.blocks.forEach(block => {
						if (block.type === 'question') {
							total += 1 // Каждый question-блок — один вопрос
						} else if (block.type === 'drag-drop-table') {
							// Предполагаем, что каждая строка — один вопрос
							total += block.rows?.length || 0
						}
						// Предполагаем, что ddtAnswers относится к таблицам, аналогичным drag-drop-table
						// Если ddtAnswers относится к dropdown-table, нужно знать структуру блока
					})
				})
			})
		} else {
			console.warn('useResults: Course data not available')
		}

		// Process testResults (для question-блоков)
		if (testResults) {
			try {
				const results = JSON.parse(testResults) as Record<
					string,
					{ totalCorrect: number; totalQuestions: number }
				>
				Object.values(results).forEach(({ totalCorrect }) => {
					correct += totalCorrect // Учитываем только правильные ответы
				})
			} catch (error) {
				console.error('useResults: Error parsing testResults:', error)
			}
		}

		// Process ddtAnswers (предполагаем, что это dropdown-table)
		if (ddtAnswers) {
			try {
				const results = JSON.parse(ddtAnswers) as Record<
					string,
					| { answers: Record<string, string>; isCorrect?: boolean }
					| Record<string, string>
				>
				Object.values(results).forEach(block => {
					if (
						'answers' in block &&
						'isCorrect' in block &&
						block.isCorrect !== undefined
					) {
						total += Object.keys(block.answers).filter(
							key => !key.endsWith('-col0')
						).length // Учитываем все ячейки, кроме col0
						correct += block.isCorrect
							? Object.keys(block.answers).filter(key => !key.endsWith('-col0'))
									.length
							: 0
					} else if ('answers' in block) {
						// Учитываем все ячейки (кроме col0) как вопросы, даже если isCorrect отсутствует
						total += Object.keys(block.answers).filter(
							key => !key.endsWith('-col0')
						).length
						// Пустые ответы или неправильные не добавляются в correct
					} else {
						// Учитываем все ячейки (кроме col0) как вопросы
						total += Object.keys(block).filter(
							key => !key.endsWith('-col0')
						).length
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
					}
				>
				Object.values(results).forEach(block => {
					if (block.correctCount !== undefined) {
						total += 1 // Каждая строка — один вопрос
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
	}, [course]) // Зависимость от course

	return { correctAnswers, totalAnswers }
}

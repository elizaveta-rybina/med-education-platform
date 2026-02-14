import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { DragDropTableBlock } from '../types'

export const useDragDropTable = (
	block: DragDropTableBlock,
	onComplete: (
		isCorrect: boolean,
		stats?: { correct: number; total: number }
	) => void
) => {
	const [assigned, setAssigned] = useState<Record<string, string[]>>({})
	const [availableAnswers, setAvailableAnswers] = useState(block.answers)
	const [activeAnswer, setActiveAnswer] = useState<{
		id: string
		content: string | React.ReactNode
	} | null>(null)
	const [errors, setErrors] = useState<Record<string, boolean>>({})
	const [isCompleted, setIsCompleted] = useState(false)
	const [attempts, setAttempts] = useState(0)
	const [isLocked, setIsLocked] = useState(false)
	const [correctCount, setCorrectCount] = useState(0)

	// Ключ для localStorage
	const storageKey = 'dndResults'
	const blockKey = block.id

	// Загрузка состояния из localStorage при инициализации
	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem(storageKey) || '{}')
		const blockData = savedData[blockKey] || {}

		// Инициализация assigned только для droppable колонки (effects)
		const initialAssigned = Object.fromEntries(
			block.rows.map(row => [`${row.id}_effects`, []])
		)

		setAssigned(blockData.assigned || initialAssigned)
		setAvailableAnswers(
			blockData.assigned
				? block.answers.filter(
						a => !Object.values(blockData.assigned).flat().includes(a.id)
					)
				: block.answers
		)
		setErrors(
			blockData.errors ||
				Object.fromEntries(block.rows.map(row => [`${row.id}_effects`, false]))
		)
		setIsCompleted(blockData.isCompleted || false)
		setAttempts(blockData.attempts || 0)
		setIsLocked(blockData.isLocked || false)
		setCorrectCount(blockData.correctCount || 0)
	}, [block])

	// Сохранение состояния в localStorage
	const saveToStorage = () => {
		const savedData = JSON.parse(localStorage.getItem(storageKey) || '{}')
		savedData[blockKey] = {
			assigned,
			attempts,
			isLocked,
			isCompleted,
			errors,
			correctCount
		}
		localStorage.setItem(storageKey, JSON.stringify(savedData))
	}

	// Сохранение после каждого изменения
	useEffect(() => {
		if (Object.keys(assigned).length > 0) {
			saveToStorage()
		}
	}, [assigned, attempts, isLocked, isCompleted, errors, correctCount])

	const handleDragStart = (event: DragStartEvent) => {
		if (isLocked) return
		const { active } = event
		const answer = block.answers.find(a => a.id === active.id)
		if (answer) setActiveAnswer(answer)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		if (isLocked) return
		const { active, over } = event
		setActiveAnswer(null)

		if (over?.id) {
			const cellId = String(over.id) // Формат: rowId_effects
			const answerId = String(active.id)

			setAssigned(prev => ({
				...prev,
				[cellId]: [...(prev[cellId] || []), answerId]
			}))

			setAvailableAnswers(prev => prev.filter(a => a.id !== answerId))
		}
	}

	const checkAnswers = () => {
		if (isLocked || attempts >= 2) return

		const newErrors: Record<string, boolean> = {}
		let localCorrectCount = 0
		let allCorrect = true

		console.log('=== CHECKING ANSWERS ===')
		console.log('block.answers:', block.answers)
		console.log('block.correctAnswers:', block.correctAnswers)
		console.log('assigned:', assigned)

		// Создаем маппинг DB ID -> индекс
		const dbIdToIndex: Record<number | string, number> = {}
		block.answers.forEach((ans, idx) => {
			dbIdToIndex[(ans as any).id] = idx
		})

		block.rows.forEach(row => {
			const cellId = `${row.id}_effects`
			const userAnswers = (assigned[cellId] || []).map(String)
			const correctValue = block.correctAnswers[cellId]

			let isCorrect = false

			if (correctValue) {
				if (Array.isArray(correctValue)) {
					// correctValue содержит индексы (0, 1, 2...), конвертируем их в ID ответов
					const correctAnswerIds = correctValue.map(index => {
						// Если это число (индекс), берем ID из block.answers[index]
						if (typeof index === 'number' && block.answers[index]) {
							return String(block.answers[index].id)
						}
						// Если это уже ID, используем как есть
						return String(index)
					})

					console.log('correctAnswerIds (после конвертации):', correctAnswerIds)

					isCorrect =
						userAnswers.length === correctAnswerIds.length &&
						correctAnswerIds.every(id => userAnswers.includes(id)) &&
						userAnswers.every(id => correctAnswerIds.includes(id))

					console.log('Сравнение:', {
						'длины совпадают': userAnswers.length === correctAnswerIds.length,
						'все правильные есть в ответах': correctAnswerIds.every(id =>
							userAnswers.includes(id)
						),
						'нет лишних ответов': userAnswers.every(id =>
							correctAnswerIds.includes(id)
						),
						isCorrect
					})
				} else if ('anyOf' in correctValue) {
					const anyOfIds = (correctValue as any).anyOf.map(
						(index: any): string => {
							if (typeof index === 'number' && block.answers[index]) {
								return String(block.answers[index].id)
							}
							return String(index)
						}
					)
					isCorrect = anyOfIds.some((id: string) => userAnswers.includes(id))
					console.log(
						'anyOf mode - anyOfIds:',
						anyOfIds,
						'isCorrect:',
						isCorrect
					)
				}
			} else {
				console.log('correctValue не найден!')
			}

			console.log('Результат:', isCorrect ? '✓ ПРАВИЛЬНО' : '✗ НЕПРАВИЛЬНО')

			newErrors[cellId] = !isCorrect
			if (!isCorrect) allCorrect = false
			if (isCorrect) localCorrectCount++
		})

		console.log('\n=== ИТОГО ===')
		console.log(
			'Правильно ответено строк:',
			localCorrectCount,
			'из',
			block.rows.length
		)
		console.log('allCorrect:', allCorrect)

		setErrors(newErrors)
		setIsCompleted(true)
		setCorrectCount(localCorrectCount)
		setAttempts(prev => prev + 1)
		const newIsLocked = attempts + 1 >= 2
		setIsLocked(newIsLocked)
		onComplete(allCorrect, {
			correct: localCorrectCount,
			total: block.rows.length
		})
	}

	const resetAnswers = () => {
		if (isLocked) return
		setAssigned(
			Object.fromEntries(block.rows.map(row => [`${row.id}_effects`, []]))
		)
		setAvailableAnswers(block.answers)
		setErrors(
			Object.fromEntries(block.rows.map(row => [`${row.id}_effects`, false]))
		)
		setIsCompleted(false)
		setCorrectCount(0)
	}

	const removeAnswer = (cellId: string, answerId: string) => {
		if (isLocked) return
		setAssigned(prev => ({
			...prev,
			[cellId]: prev[cellId].filter(id => id !== answerId)
		}))
		setAvailableAnswers(prev => [
			...prev,
			block.answers.find(a => a.id === answerId)!
		])
		setIsCompleted(false)
	}

	return {
		assigned,
		availableAnswers,
		activeAnswer,
		errors,
		isCompleted,
		attempts,
		isLocked,
		correctCount,
		handleDragStart,
		handleDragEnd,
		checkAnswers,
		resetAnswers,
		removeAnswer
	}
}

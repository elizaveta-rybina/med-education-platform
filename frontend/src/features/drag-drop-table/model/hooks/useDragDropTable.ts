import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { DragDropTableBlock } from '../types'

export const useDragDropTable = (
	block: DragDropTableBlock,
	onComplete: (isCorrect: boolean) => void
) => {
	const [assigned, setAssigned] = useState<Record<string, string[]>>({})
	const [availableAnswers, setAvailableAnswers] = useState(block.answers)
	const [activeAnswer, setActiveAnswer] = useState<{
		id: string
		content: React.ReactNode
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
		setAssigned(
			blockData.assigned ||
				Object.fromEntries(block.rows.map(row => [row.id, []]))
		)
		setAvailableAnswers(
			blockData.assigned
				? block.answers.filter(
						a => !Object.values(blockData.assigned).flat().includes(a.id)
				  )
				: block.answers
		)
		setErrors(
			blockData.errors ||
				Object.fromEntries(block.rows.map(row => [row.id, false]))
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

	// Сохранение после каждого изменения assigned, attempts, isLocked и т.д.
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
			const rowId = String(over.id)
			const answerId = String(active.id)

			setAssigned(prev => ({
				...prev,
				[rowId]: [...(prev[rowId] || []), answerId]
			}))

			setAvailableAnswers(prev => prev.filter(a => a.id !== answerId))
		}
	}

	const checkAnswers = () => {
		if (isLocked || attempts >= 2) return

		const newErrors: Record<string, boolean> = {}
		let localCorrectCount = 0
		let allCorrect = true

		block.rows.forEach(row => {
			const userAnswers = assigned[row.id] || []
			const correctAnswers = block.correctAnswers[row.id] || []

			const isCorrect =
				userAnswers.length === correctAnswers.length &&
				correctAnswers.every(id => userAnswers.includes(id)) &&
				userAnswers.every(id => correctAnswers.includes(id))

			newErrors[row.id] = !isCorrect
			if (!isCorrect) allCorrect = false
			if (isCorrect) localCorrectCount++
		})

		setErrors(newErrors)
		setIsCompleted(true)
		setCorrectCount(localCorrectCount)
		setAttempts(prev => prev + 1)
		const newIsLocked = attempts + 1 >= 2
		setIsLocked(newIsLocked)
		onComplete(allCorrect)
	}

	const resetAnswers = () => {
		if (isLocked) return
		setAssigned(Object.fromEntries(block.rows.map(row => [row.id, []])))
		setAvailableAnswers(block.answers)
		setErrors({})
		setIsCompleted(false)
		setCorrectCount(0)
	}

	const removeAnswer = (rowId: string, answerId: string) => {
		if (isLocked) return
		setAssigned(prev => ({
			...prev,
			[rowId]: prev[rowId].filter(id => id !== answerId)
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

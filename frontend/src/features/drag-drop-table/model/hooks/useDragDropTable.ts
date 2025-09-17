// features/dragDropTable/lib/useDragDropTable.ts
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
	const [hasInteracted, setHasInteracted] = useState(false)

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event
		const answer = block.answers.find(a => a.id === active.id)
		if (answer) setActiveAnswer(answer)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		setActiveAnswer(null)

		if (over?.id) {
			const rowId = String(over.id)
			const answerId = String(active.id)

			setAssigned(prev => ({
				...prev,
				[rowId]: [...prev[rowId], answerId]
			}))

			setAvailableAnswers(prev => prev.filter(a => a.id !== answerId))
		}
	}

	const checkAnswers = () => {
		const newErrors: Record<string, boolean> = {}
		let allCorrect = true

		block.rows.forEach(row => {
			const userAnswers = assigned[row.id] || []
			const correctAnswers = block.correctAnswers[row.id] || []

			const isCorrect =
				userAnswers.length === 0 && correctAnswers.length > 0
					? false
					: correctAnswers.every(id => userAnswers.includes(id)) &&
					  userAnswers.every(id => correctAnswers.includes(id))

			newErrors[row.id] = !isCorrect
			if (!isCorrect) allCorrect = false
		})

		setErrors(newErrors)
		setIsCompleted(true)
		onComplete(allCorrect)
	}

	const resetAnswers = () => {
		setAssigned(Object.fromEntries(block.rows.map(row => [row.id, []])))
		setAvailableAnswers(block.answers)
		setErrors({})
		setIsCompleted(false)
		setHasInteracted(false)
	}

	const removeAnswer = (rowId: string, answerId: string) => {
		setAssigned(prev => ({
			...prev,
			[rowId]: prev[rowId].filter(id => id !== answerId)
		}))
		setAvailableAnswers(prev => [
			...prev,
			block.answers.find(a => a.id === answerId)!
		])
		setIsCompleted(false)
		setHasInteracted(true)
	}

	useEffect(() => {
		setAssigned(Object.fromEntries(block.rows.map(row => [row.id, []])))
		setAvailableAnswers(block.answers)
		setErrors(Object.fromEntries(block.rows.map(row => [row.id, false])))
		setIsCompleted(false)
	}, [block])

	return {
		assigned,
		availableAnswers,
		activeAnswer,
		errors,
		isCompleted,
		hasInteracted,
		handleDragStart,
		handleDragEnd,
		checkAnswers,
		resetAnswers,
		removeAnswer
	}
}

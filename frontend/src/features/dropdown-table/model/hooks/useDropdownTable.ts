import { useEffect, useState } from 'react'
import { DropdownTableBlock } from '../types'

interface DropdownTableProps {
	block: DropdownTableBlock
	onComplete?: (isCorrect: boolean) => void
}

export const useDropdownTable = ({
	block,
	onComplete = () => {}
}: DropdownTableProps) => {
	const [selectedAnswers, setSelectedAnswers] = useState<
		Record<string, string>
	>({})
	const [errors, setErrors] = useState<Record<string, boolean>>({})
	const [isCompleted, setIsCompleted] = useState(false)

	// Initialize selected answers when block changes
	useEffect(() => {
		const initialAnswers = block.rows.reduce((acc, row) => {
			row.values.forEach((_, index) => {
				const cellId = `${row.id}-col${index}`
				acc[cellId] = ''
			})
			return acc
		}, {} as Record<string, string>)
		setSelectedAnswers(initialAnswers)
		setErrors({})
		setIsCompleted(false)
	}, [block])

	// Handle selection change
	const handleSelectChange = (
		rowId: string,
		colIndex: number,
		value: string
	) => {
		const cellId = `${rowId}-col${colIndex}`
		setSelectedAnswers(prev => ({
			...prev,
			[cellId]: value
		}))
		setIsCompleted(false)
	}

	// Check answers
	const checkAnswers = () => {
		const newErrors: Record<string, boolean> = {}
		let allCorrect = true

		block.rows.forEach(row => {
			row.values.forEach((_, index) => {
				const cellId = `${row.id}-col${index}`
				const userAnswer = selectedAnswers[cellId] || ''
				const correctAnswerKey = `${row.id}-col${index}`
				const correctAnswerId = block.correctAnswers[correctAnswerKey] || ''

				if (index > 0 && correctAnswerId) {
					if (userAnswer !== correctAnswerId) {
						newErrors[cellId] = true
						allCorrect = false
					} else {
						newErrors[cellId] = false
					}
				} else {
					newErrors[cellId] = false
				}
			})
		})

		setErrors(newErrors)
		setIsCompleted(true)
		onComplete(allCorrect)
	}

	// Reset answers
	const resetAnswers = () => {
		const initialAnswers = block.rows.reduce((acc, row) => {
			row.values.forEach((_, index) => {
				const cellId = `${row.id}-col${index}`
				acc[cellId] = ''
			})
			return acc
		}, {} as Record<string, string>)
		setSelectedAnswers(initialAnswers)
		setErrors({})
		setIsCompleted(false)
	}

	return {
		selectedAnswers,
		errors,
		isCompleted,
		handleSelectChange,
		checkAnswers,
		resetAnswers
	}
}

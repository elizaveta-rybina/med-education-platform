import { useTest } from '@/hooks/tests/useTest'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TestBlockProps } from '../types'

export const useTestBlock = ({
	block,
	moduleId,
	chapterId,
	questionIndex,
	totalQuestions,
	onNext
}: TestBlockProps) => {
	const { t } = useTranslation('courseInner')
	const { testResults, testError, submitTest, resetTestForChapter } =
		useTest(chapterId)

	const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set())
	const [isTestCompleted, setIsTestCompleted] = useState(!!testResults)
	const [localAnswers, setLocalAnswers] = useState<
		{ questionId: string; selectedOptionIds: string[] }[]
	>([])
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		setSelectedOptions(new Set())
	}, [moduleId, chapterId, questionIndex])

	const handleOptionChange = useCallback((optionId: string) => {
		setSelectedOptions(prev => {
			const newSet = new Set(prev)
			if (newSet.has(optionId)) newSet.delete(optionId)
			else newSet.add(optionId)
			return newSet
		})
	}, [])

	const handleDragDropChange = useCallback(
		(rowId: string, answerId: string) => {
			const optionId = `${rowId}:${answerId}`
			setSelectedOptions(prev => {
				const newSet = new Set(prev)
				if (newSet.has(optionId)) newSet.delete(optionId)
				else newSet.add(optionId)
				return newSet
			})
		},
		[]
	)

	const handleNext = useCallback(async () => {
		if (selectedOptions.size === 0) {
			console.warn(`No options selected for question ${block.id}`)
			onNext()
			return
		}

		setIsSubmitting(true)
		try {
			const newAnswer = {
				questionId: block.id,
				selectedOptionIds: Array.from(selectedOptions)
			}

			const updatedAnswers = (() => {
				const existingIndex = localAnswers.findIndex(
					answer => answer.questionId === block.id
				)
				if (existingIndex >= 0) {
					const copy = [...localAnswers]
					copy[existingIndex] = newAnswer
					return copy
				}
				return [...localAnswers, newAnswer]
			})()

			setLocalAnswers(updatedAnswers)

			if (questionIndex === totalQuestions - 1) {
				console.log(`Completing test for chapter ${chapterId}`, updatedAnswers)
				setIsTestCompleted(true)
				await submitTest(updatedAnswers)
			} else {
				onNext()
			}
		} catch (err) {
			console.error(`Error in handleNext for chapter ${chapterId}:`, err)
		} finally {
			setIsSubmitting(false)
		}
	}, [
		block.id,
		questionIndex,
		totalQuestions,
		selectedOptions,
		localAnswers,
		onNext,
		submitTest,
		chapterId
	])

	const handleReset = useCallback(() => {
		setIsTestCompleted(false)
		setLocalAnswers([])
		setSelectedOptions(new Set())
		resetTestForChapter()
	}, [resetTestForChapter])

	const selectedOptionsArray = useMemo(
		() => Array.from(selectedOptions),
		[selectedOptions]
	)

	return {
		t,
		testResults,
		testError,
		isTestCompleted,
		isSubmitting,
		selectedOptions: selectedOptionsArray,
		handleOptionChange,
		handleDragDropChange,
		handleNext,
		handleReset
	}
}

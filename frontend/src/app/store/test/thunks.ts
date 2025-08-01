import { courseData } from '@/data/content'
import { DragDropTableBlock, QuestionBlock } from '@/data/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Answer, TestState } from './slice'

export const submitTestAnswers = createAsyncThunk<
	{ totalCorrect: number; totalQuestions: number },
	{ answers: Answer[]; chapterId: string },
	{ rejectValue: string; state: { test: TestState } }
>(
	'test/submitTestAnswers',
	async ({ answers, chapterId }, { rejectWithValue }) => {
		try {
			const chapter = courseData.modules
				.flatMap(module => module.chapters)
				.find(chapter => chapter.id === chapterId)
			if (!chapter) {
				throw new Error(`Chapter with ID ${chapterId} not found`)
			}

			const questions = chapter.blocks.filter(
				(block): block is QuestionBlock | DragDropTableBlock =>
					block.type === 'question' || block.type === 'drag-drop-table'
			)
			const totalQuestions = questions.length
			let totalCorrect = 0

			for (const answer of answers) {
				const question = questions.find(q => q.id === answer.questionId)
				if (!question) {
					throw new Error(`Question with ID ${answer.questionId} not found`)
				}

				if (question.type === 'question') {
					const correctOptionIds = question.options
						.filter(option => option.isCorrect)
						.map(option => option.id)
					const userOptionIds = answer.selectedOptionIds

					const isCorrect =
						correctOptionIds.length === userOptionIds.length &&
						correctOptionIds.every(id => userOptionIds.includes(id)) &&
						userOptionIds.every(id => correctOptionIds.includes(id))

					if (isCorrect) {
						totalCorrect += 1
					}
				} else if (question.type === 'drag-drop-table') {
					const correctAnswers = question.correctAnswers
					const userAnswers = answer.selectedOptionIds

					const isCorrect = Object.entries(correctAnswers).every(
						([rowId, correctIds]) => {
							const userRowAnswers = userAnswers.filter(id =>
								id.startsWith(`${rowId}:`)
							)
							const normalizedUserAnswers = userRowAnswers.map(
								id => id.split(':')[1]
							)
							return (
								correctIds.length === normalizedUserAnswers.length &&
								correctIds.every(id => normalizedUserAnswers.includes(id)) &&
								normalizedUserAnswers.every(id => correctIds.includes(id))
							)
						}
					)

					if (isCorrect) {
						totalCorrect += 1
					}
				}
			}

			return { totalCorrect, totalQuestions }
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			return rejectWithValue(message)
		}
	}
)

import { DragDropTableBlock } from '@/features/drag-drop-table/model/types'
import { QuestionBlock } from '@/features/test-block/model/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Answer, TestState } from './slice'

export const submitTestAnswers = createAsyncThunk<
	{ totalCorrect: number; totalQuestions: number },
	{ answers: Answer[]; chapterId: string; courseId: string; language: string },
	{ rejectValue: string; state: { test: TestState } }
>(
	'test/submitTestAnswers',
	async ({ answers, chapterId, courseId, language }, { rejectWithValue }) => {
		try {
			const langSuffix = language === 'en' ? '.en' : ''
			const module = await import(
				`@/data/semester_one/${courseId}/content${langSuffix}.ts`
			)
			const courseData = module.courseData

			const chapters = courseData.modules.flatMap(
				(module: { chapters: any }) => module.chapters
			)

			const chapter = chapters.find(
				(chapter: { id: string }) => chapter.id === chapterId
			)
			if (!chapter) {
				throw new Error(`Chapter with ID ${chapterId} not found`)
			}

			const questions = chapter.blocks.filter(
				(block: {
					type: string
				}): block is QuestionBlock | DragDropTableBlock =>
					block.type === 'question' || block.type === 'drag-drop-table'
			)

			const totalQuestions = questions.length
			let totalCorrect = 0

			for (const answer of answers) {
				const question = questions.find(
					(q: { id: string }) => q.id === answer.questionId
				)
				if (!question) {
					throw new Error(`Question with ID ${answer.questionId} not found`)
				}

				if (question.type === 'question') {
					const correctOptionIds = question.options
						.filter((option: { isCorrect: any }) => option.isCorrect)
						.map((option: { id: any }) => option.id)
					const userOptionIds = answer.selectedOptionIds

					const isCorrect =
						correctOptionIds.length === userOptionIds.length &&
						correctOptionIds.every((id: string) =>
							userOptionIds.includes(id)
						) &&
						userOptionIds.every(id => correctOptionIds.includes(id))

					if (isCorrect) totalCorrect += 1
				} else if (question.type === 'drag-drop-table') {
					const correctAnswers = question.correctAnswers as Record<
						string,
						string[]
					>
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
								correctIds.every((id: string) =>
									normalizedUserAnswers.includes(id)
								) &&
								normalizedUserAnswers.every(id =>
									(correctIds as string[]).includes(id)
								)
							)
						}
					)

					if (isCorrect) totalCorrect += 1
				}
			}

			return { totalCorrect, totalQuestions }
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			return rejectWithValue(message)
		}
	}
)

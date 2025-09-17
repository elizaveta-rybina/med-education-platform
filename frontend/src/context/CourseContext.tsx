import {
	createContext,
	ReactNode,
	useCallback,
	useEffect,
	useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Course, QuestionBlock } from '../data/types'

interface CourseContextType {
	course: Course | null
	markChapterAsRead: (moduleId: string, chapterId: string) => void
	answerQuestion: (
		moduleId: string,
		chapterId: string,
		questionId: string,
		answerId: string
	) => boolean
	getTestResults: (
		moduleId: string,
		chapterId: string
	) => { correct: number; total: number }
	completeChapterTest: (moduleId: string, chapterId: string) => void
}

export const CourseContext = createContext<CourseContextType | undefined>(
	undefined
)

export const CourseProvider = ({ children }: { children: ReactNode }) => {
	const { i18n } = useTranslation()
	const { courseId } = useParams<{ courseId: string }>()
	const [course, setCourse] = useState<Course | null>(null)

	const mergeCourseData = (
		newCourseData: Course,
		oldCourseData: Course
	): Course => {
		return {
			...newCourseData,
			modules: newCourseData.modules.map(newModule => {
				const oldModule = oldCourseData.modules.find(m => m.id === newModule.id)
				if (!oldModule) return newModule
				return {
					...newModule,
					chapters: newModule.chapters.map(newChapter => {
						const oldChapter = oldModule.chapters.find(
							c => c.id === newChapter.id
						)
						if (!oldChapter) return newChapter
						return {
							...newChapter,
							isRead: oldChapter.isRead || false,
							testPassed: oldChapter.testPassed || false,
							blocks: newChapter.blocks.map(newBlock => {
								const oldBlock = oldChapter.blocks.find(
									b => b.id === newBlock.id
								)
								if (!oldBlock || newBlock.type !== 'question') return newBlock
								return {
									...newBlock,
									userAnswer:
										(oldBlock as QuestionBlock).userAnswer || undefined,
									isCorrect: (oldBlock as QuestionBlock).isCorrect || undefined
								}
							})
						}
					})
				}
			})
		}
	}

	useEffect(() => {
		const loadCourseData = async () => {
			if (!courseId) return
			try {
				const langSuffix = i18n.language === 'en' ? '.en' : ''
				const module = await import(
					`@/data/semester_one/${courseId}/content${langSuffix}.ts`
				)
				const newData: Course = module.courseData
				setCourse(prev => (prev ? mergeCourseData(newData, prev) : newData))
			} catch (e) {
				console.error('Ошибка загрузки курса:', e)
				setCourse(null)
			}
		}

		loadCourseData()
	}, [courseId, i18n.language])

	const markChapterAsRead = useCallback(
		(moduleId: string, chapterId: string) => {
			setCourse(prev =>
				prev
					? {
							...prev,
							modules: prev.modules.map(module =>
								module.id === moduleId
									? {
											...module,
											chapters: module.chapters.map(chapter =>
												chapter.id === chapterId
													? { ...chapter, isRead: true }
													: chapter
											)
									  }
									: module
							)
					  }
					: prev
			)
		},
		[]
	)

	const answerQuestion = useCallback(
		(
			moduleId: string,
			chapterId: string,
			questionId: string,
			answerId: string
		) => {
			let isCorrectAnswer = false

			setCourse(prev => {
				if (!prev) return prev

				const updatedModules = prev.modules.map(module => {
					if (module.id !== moduleId) return module

					const updatedChapters = module.chapters.map(chapter => {
						if (chapter.id !== chapterId) return chapter

						const updatedBlocks = chapter.blocks.map(block => {
							if (block.type !== 'question' || block.id !== questionId)
								return block

							const isCorrect = block.options.some(
								opt => opt.id === answerId && opt.isCorrect
							)
							if (isCorrect) isCorrectAnswer = true

							return { ...block, userAnswer: answerId, isCorrect }
						})

						return { ...chapter, blocks: updatedBlocks }
					})

					return { ...module, chapters: updatedChapters }
				})

				return { ...prev, modules: updatedModules }
			})

			return isCorrectAnswer
		},
		[]
	)

	const getTestResults = useCallback(
		(moduleId: string, chapterId: string) => {
			if (!course) return { correct: 0, total: 0 }

			const chapter = course.modules
				.find(m => m.id === moduleId)
				?.chapters.find(c => c.id === chapterId)

			if (!chapter) return { correct: 0, total: 0 }

			const questions = chapter.blocks.filter(
				b => b.type === 'question'
			) as QuestionBlock[]
			const total = questions.length
			const correct = questions.filter(q => q.isCorrect).length

			return { correct, total }
		},
		[course]
	)

	const completeChapterTest = useCallback(
		(moduleId: string, chapterId: string) => {
			setCourse(prev =>
				prev
					? {
							...prev,
							modules: prev.modules.map(module =>
								module.id === moduleId
									? {
											...module,
											chapters: module.chapters.map(chapter =>
												chapter.id === chapterId
													? { ...chapter, testPassed: true }
													: chapter
											)
									  }
									: module
							)
					  }
					: prev
			)
		},
		[]
	)

	return (
		<CourseContext.Provider
			value={{
				course,
				markChapterAsRead,
				answerQuestion,
				getTestResults,
				completeChapterTest
			}}
		>
			{children}
		</CourseContext.Provider>
	)
}

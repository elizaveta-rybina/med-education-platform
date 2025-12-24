import { lecturesApi } from '@/app/api/lectures/lectures.api'
import type { Lecture } from '@/app/api/lectures/lectures.types'
import { quizzesApi } from '@/app/api/quizzes/quizzes.api'
import type { Quiz } from '@/app/api/quizzes/quizzes.types'
import { topicsApi } from '@/app/api/topics/topics.api'
import type { Topic } from '@/app/api/topics/topics.types'
import { ChapterHeader } from '@/components/courseInner/ChapterHeader'
import { MarkAsReadButton } from '@/components/courseInner/MarkAsReadButton'
import { DragDropTableManager } from '@/features/drag-drop-table'
import type { DragDropTableBlock } from '@/features/drag-drop-table/model/types'
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LectureContent } from './dynamic/LectureContent'
import { LectureNavigation } from './dynamic/LectureNavigation'
import { QuizView } from './dynamic/QuizView'
import { ResultsButton } from './dynamic/ResultsButton'

const DynamicTopicContent: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const topicIdParam = searchParams.get('topic')
	const lectureIdParam = searchParams.get('lecture')
	const assignmentIdParam = searchParams.get('assignment')
	const [topic, setTopic] = useState<Topic | null>(null)
	const [lectures, setLectures] = useState<Lecture[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [lectureReadStatus, setLectureReadStatus] = useState<
		Record<string, boolean>
	>({})
	const [quizzes, setQuizzes] = useState<Quiz[]>([])
	const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
	const [assignmentQuiz, setAssignmentQuiz] = useState<Quiz | null>(null)
	const [currentTableIndex, setCurrentTableIndex] = useState(0)
	const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({})
	const [showResults, setShowResults] = useState(false)
	const [_quizScore, setQuizScore] = useState<{
		correct: number
		total: number
	} | null>(null)

	// Фильтруем только markdown лекции (всегда одинаковый порядок хуков)
	const markdownLectures = lectures.filter(
		l => (l.content_type || '').toLowerCase() === 'markdown'
	)

	// Выбор текущей лекции по параметру URL или первая доступная
	const selectedLecture = lectureIdParam
		? markdownLectures.find(l => String(l.id) === String(lectureIdParam)) ||
		  markdownLectures[0]
		: markdownLectures[0]

	const isSelectedRead = useMemo(() => {
		if (!selectedLecture?.id) return false
		return !!lectureReadStatus[String(selectedLecture.id)]
	}, [lectureReadStatus, selectedLecture])

	useEffect(() => {
		const load = async () => {
			const topicId = Number(topicIdParam)
			if (!topicId) {
				setError('Тема не указана')
				setLoading(false)
				return
			}
			try {
				setLoading(true)
				setError(null)
				const topicResp = await topicsApi.getById(topicId)
				const topicData =
					(topicResp as any).data || (topicResp as any).topic || topicResp
				setTopic(topicData as Topic)

				const contentsResp = await lecturesApi.getByTopicId(topicId)
				const lecturesData = (contentsResp as any).data?.lectures || []
				setLectures(lecturesData as Lecture[])

				// Загружаем тесты для темы
				try {
					const quizzesResponse = await quizzesApi.getAll()
					const quizzesData =
						(quizzesResponse as { data?: Quiz[] }).data ||
						(quizzesResponse as Quiz[])
					const topicQuizzes = (quizzesData || []).filter(
						q => q.topic_id === topicId || q.quizable_id === topicId
					) as Quiz[]
					setQuizzes(topicQuizzes)
				} catch (e) {
					console.warn('Не удалось загрузить тесты:', e)
					setQuizzes([])
				}
			} catch (e) {
				console.error('Failed to load topic contents', e)
				setError('Не удалось загрузить содержание темы')
			} finally {
				setLoading(false)
			}
		}
		void load()
	}, [topicIdParam])

	useEffect(() => {
		const saved = localStorage.getItem('lectureReadStatus')
		setLectureReadStatus(saved ? JSON.parse(saved) : {})
		const handler = () => {
			const refreshed = localStorage.getItem('lectureReadStatus')
			setLectureReadStatus(refreshed ? JSON.parse(refreshed) : {})
		}
		window.addEventListener('lectureReadStatusUpdated', handler)
		return () => window.removeEventListener('lectureReadStatusUpdated', handler)
	}, [])

	// Загружаем задание по assignmentId из URL
	useEffect(() => {
		const loadAssignment = async () => {
			const assignmentId = Number(assignmentIdParam)
			if (!assignmentId) {
				setAssignmentQuiz(null)
				setCurrentTableIndex(0)
				return
			}
			try {
				const quizResp = await quizzesApi.getById(assignmentId)
				const quizData =
					(quizResp as any).data || (quizResp as any).quiz || quizResp
				setAssignmentQuiz(quizData as Quiz)
				setCurrentTableIndex(0)
			} catch (e) {
				console.error('Failed to load assignment quiz:', e)
				setAssignmentQuiz(null)
				setCurrentTableIndex(0)
			}
		}
		void loadAssignment()
	}, [assignmentIdParam])

	// Загружаем результаты теста при изменении activeQuiz
	useEffect(() => {
		if (!activeQuiz?.id) return
		const savedResults = localStorage.getItem(`quizResults_${activeQuiz.id}`)
		if (savedResults) {
			const parsed = JSON.parse(savedResults)
			setUserAnswers(parsed.userAnswers || {})
			setQuizScore(parsed.quizScore || null)
			setShowResults(parsed.showResults || false)
		}
	}, [activeQuiz?.id])

	if (loading) {
		return <div className='p-6 text-center text-gray-500'>Загрузка...</div>
	}

	if (error) {
		return <div className='p-6 text-center text-red-600'>{error}</div>
	}

	if (!topic) {
		return <div className='p-6 text-center text-gray-500'>Тема не найдена</div>
	}

	const handleMarkAsRead = () => {
		if (!selectedLecture?.id) return
		const key = 'lectureReadStatus'
		const saved = localStorage.getItem(key)
		const status = saved ? JSON.parse(saved) : {}
		status[String(selectedLecture.id)] = true
		localStorage.setItem(key, JSON.stringify(status))
		setLectureReadStatus(status)
		window.dispatchEvent(new Event('lectureReadStatusUpdated'))

		// Ищем тест с таким же названием и активируем его
		const matchingQuiz = quizzes.find(
			q => q.title?.toLowerCase() === selectedLecture.title?.toLowerCase()
		)
		if (matchingQuiz) {
			setActiveQuiz(matchingQuiz)
			setUserAnswers({})
			setShowResults(false)
			setQuizScore(null)
		}
	}

	const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
		if (showResults) return

		const question = activeQuiz?.questions?.[questionIndex]
		if (!question) return

		setUserAnswers(prev => {
			const current = prev[questionIndex] || []

			if (question.question_type === 'single_choice') {
				// Для single choice - заменяем ответ
				return { ...prev, [questionIndex]: [optionIndex] }
			} else {
				// Для multiple choice - добавляем/удаляем
				if (current.includes(optionIndex)) {
					return {
						...prev,
						[questionIndex]: current.filter(i => i !== optionIndex)
					}
				} else {
					return { ...prev, [questionIndex]: [...current, optionIndex] }
				}
			}
		})
	}

	const handleSubmitQuiz = () => {
		if (!activeQuiz?.questions) return

		let correct = 0
		activeQuiz.questions.forEach((q, idx) => {
			const userAnswer = userAnswers[idx] || []
			const correctIndices = (q.options || [])
				.map((opt, i) => (opt.is_correct ? i : -1))
				.filter(i => i !== -1)

			// Проверяем, что все правильные ответы выбраны и нет лишних
			const isCorrect =
				userAnswer.length === correctIndices.length &&
				userAnswer.every(a => correctIndices.includes(a))

			if (isCorrect) correct++
		})

		const score = { correct, total: activeQuiz.questions.length }
		setQuizScore(score)
		setShowResults(true)

		// Сохраняем результаты в localStorage
		if (activeQuiz.id) {
			localStorage.setItem(
				`quizResults_${activeQuiz.id}`,
				JSON.stringify({
					userAnswers,
					quizScore: score,
					showResults: true
				})
			)
		}
	}

	const navigateLecture = (direction: 'prev' | 'next') => {
		if (!selectedLecture) return
		const idx = markdownLectures.findIndex(l => l.id === selectedLecture.id)
		if (idx < 0) return
		const nextIdx = direction === 'prev' ? idx - 1 : idx + 1
		if (nextIdx < 0 || nextIdx >= markdownLectures.length) return
		const nextLecture = markdownLectures[nextIdx]
		const nextParams = new URLSearchParams(searchParams)
		nextParams.set('lecture', String(nextLecture.id))
		setSearchParams(nextParams)
	}

	// Определяем тип отображаемого задания
	const getAssignmentType = (
		quiz: Quiz
	): 'table' | 'interactive' | 'input' | 'standard' | null => {
		// Сначала проверяем тип вопроса - это более надежный индикатор
		if (quiz.questions?.some(q => q.question_type === 'table')) return 'table'
		if (quiz.questions?.some(q => q.question_type === 'input_answer'))
			return 'input'
		// Затем проверяем quiz_type
		if (quiz.quiz_type === 'additional') return 'interactive'
		return 'standard'
	}

	// Конвертируем quiz с table вопросами в DragDropTableBlock
	const convertQuizToTableBlocks = (quiz: Quiz): DragDropTableBlock[] => {
		if (!quiz.questions) return []
		return quiz.questions
			.filter(q => q.question_type === 'table' && q.metadata)
			.map((q, idx) => {
				const rawMeta = q.metadata as any
				const metadata =
					typeof rawMeta === 'string' ? JSON.parse(rawMeta) : rawMeta

				// Преобразуем correct_option_ids и answer_mode в correctAnswers
				// correct_option_ids содержат ИНДЕКСЫ (0, 1, 2, 3...), нужно маппить на answer ID (ans_0, ans_1...)
				const correctAnswers: Record<string, string[] | { anyOf: string[] }> =
					{}
				;(metadata.rows || []).forEach((row: any, rowIdx: number) => {
					const cellId = `row_${rowIdx}_effects`
					const correctOptionIds = row.correct_option_ids || []
					const answerMode = row.answer_mode || 'all'

					// Преобразуем индексы в answer ID
					const correctAnswerIds = correctOptionIds.map(
						(idx: number) => `ans_${idx}`
					)

					if (answerMode === 'any') {
						correctAnswers[cellId] = { anyOf: correctAnswerIds }
					} else {
						correctAnswers[cellId] = correctAnswerIds
					}
				})

				return {
					id: `table_${quiz.id}_${idx}`,
					type: 'drag-drop-table' as const,
					title: q.text || 'Таблица',
					tableTitle: q.text || '',
					columns: (metadata.columns || []).map((col: any, i: number) => ({
						id: `col_${i}`,
						title: col.name || `Колонка ${i + 1}`,
						width: col.width
					})),
					rows: (metadata.rows || []).map((row: any, i: number) => ({
						id: `row_${i}`,
						title: row.cells?.[0] || '',
						characteristic: row.cells?.[1] || ''
					})),
					answers: (metadata.answers || q.options || []).map(
						(ans: any, i: number) => ({
							id: `ans_${i}`,
							content: ans.text || ans.content || ''
						})
					),
					correctAnswers
				}
			})
	}

	const displayedQuiz = assignmentQuiz || activeQuiz
	const assignmentType = displayedQuiz ? getAssignmentType(displayedQuiz) : null
	const tableBlocks =
		assignmentType === 'table' && displayedQuiz
			? convertQuizToTableBlocks(displayedQuiz)
			: []

	return (
		<div className='flex-1 p-4 sm:p-6 min-h-screen border-t-1'>
			<div className='max-w-9xl mx-auto pb-20'>
				<ChapterHeader
					title={assignmentQuiz?.title || selectedLecture?.title || topic.title}
					isRead={false}
				/>
				{/* Лекция */}
				{!displayedQuiz && selectedLecture?.content ? (
					<LectureContent lecture={selectedLecture} />
				) : null}

				{/* DND Таблица */}
				{assignmentType === 'table' && tableBlocks.length > 0 && (
					<div className='mt-4'>
						<div className='mb-4'>
							<div className='flex items-center justify-between'>
								<h3 className='text-xl font-semibold text-gray-800'>
									Таблица {currentTableIndex + 1} из {tableBlocks.length}
								</h3>
								{tableBlocks.length > 1 && (
									<div className='flex gap-2'>
										<button
											onClick={() =>
												setCurrentTableIndex(prev => Math.max(0, prev - 1))
											}
											disabled={currentTableIndex === 0}
											className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
										>
											← Предыдущая
										</button>
										<button
											onClick={() =>
												setCurrentTableIndex(prev =>
													Math.min(tableBlocks.length - 1, prev + 1)
												)
											}
											disabled={currentTableIndex === tableBlocks.length - 1}
											className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
										>
											Следующая →
										</button>
									</div>
								)}
							</div>
						</div>
						<DragDropTableManager
							blocks={[tableBlocks[currentTableIndex]]}
							chapterHash={
								displayedQuiz?.id ? `quiz_${displayedQuiz.id}` : undefined
							}
							onComplete={isCorrect => {
								if (displayedQuiz?.id) {
									localStorage.setItem(
										`quizResults_${displayedQuiz.id}`,
										JSON.stringify({
											userAnswers: {},
											quizScore: { correct: isCorrect ? 1 : 0, total: 1 },
											showResults: true
										})
									)
								}
							}}
						/>
					</div>
				)}

				{/* Интерактивное задание (игра) */}
				{assignmentType === 'interactive' && displayedQuiz && (
					<div className='mt-4'>
						<div className='p-6 bg-gray-50 rounded-lg'>
							<h3 className='text-lg font-medium mb-4'>
								Интерактивное задание
							</h3>
							{displayedQuiz.file_name && displayedQuiz.game_path && (
								<div className='space-y-2'>
									<p>
										<strong>Игра:</strong> {displayedQuiz.file_name}
									</p>
									<p>
										<strong>Путь:</strong> {displayedQuiz.game_path}
									</p>
									<iframe
										src={displayedQuiz.game_path}
										className='w-full h-[600px] border border-gray-300 rounded-lg mt-4'
										title={displayedQuiz.file_name}
									/>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Задание с вводом ответа */}
				{assignmentType === 'input' && displayedQuiz && (
					<div className='mt-4'>
						<div className='p-6 bg-gray-50 rounded-lg'>
							<h3 className='text-lg font-medium mb-4'>
								Задание с вводом ответа
							</h3>
							<p className='text-gray-600'>
								Компонент для ввода ответа будет добавлен позже
							</p>
						</div>
					</div>
				)}

				{/* Стандартный тест (прикреплен к лекции) */}
				{assignmentType === 'standard' && activeQuiz && (
					<div className='mt-4'>
						<QuizView
							quiz={activeQuiz}
							showResults={showResults}
							userAnswers={userAnswers}
							onSelect={handleAnswerSelect}
							onSubmit={handleSubmitQuiz}
						/>
						{/* Кнопка возврата к лекции после завершения теста */}
						{showResults && (
							<div className='mt-6 pt-4 border-t border-gray-200'>
								<button
									onClick={() => {
										setActiveQuiz(null)
										setShowResults(false)
										setUserAnswers({})
										setQuizScore(null)
									}}
									className='px-6 py-2 bg-gray-600 text-white rounded-xl shadow-sm hover:bg-gray-700 transition-colors'
								>
									Вернуться к лекции
								</button>
							</div>
						)}
					</div>
				)}
				{!displayedQuiz && !selectedLecture?.content && (
					<div className='text-gray-500'>
						Для темы пока нет лекций в формате markdown.
					</div>
				)}
				{/* Кнопки только для лекций (не для заданий) */}
				{selectedLecture && !activeQuiz && !assignmentQuiz && (
					<div className='mt-6 pt-4 border-t border-gray-200 flex items-center gap-3'>
						<MarkAsReadButton
							isRead={isSelectedRead}
							onMark={handleMarkAsRead}
						/>
						<ResultsButton
							selectedLecture={selectedLecture || null}
							quizzes={quizzes}
							onOpenResults={quiz => setActiveQuiz(quiz)}
						/>
						<LectureNavigation
							onPrev={() => navigateLecture('prev')}
							onNext={() => navigateLecture('next')}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default DynamicTopicContent

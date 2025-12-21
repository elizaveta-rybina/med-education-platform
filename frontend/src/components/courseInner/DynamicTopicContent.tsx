import { lecturesApi } from '@/app/api/lectures/lectures.api'
import type { Lecture } from '@/app/api/lectures/lectures.types'
import { quizzesApi } from '@/app/api/quizzes/quizzes.api'
import type { Quiz } from '@/app/api/quizzes/quizzes.types'
import { topicsApi } from '@/app/api/topics/topics.api'
import type { Topic } from '@/app/api/topics/topics.types'
import { ChapterHeader } from '@/components/courseInner/ChapterHeader'
import { MarkAsReadButton } from '@/components/courseInner/MarkAsReadButton'
import React, { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSearchParams } from 'react-router-dom'

const DynamicTopicContent: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const topicIdParam = searchParams.get('topic')
	const lectureIdParam = searchParams.get('lecture')
	const [topic, setTopic] = useState<Topic | null>(null)
	const [lectures, setLectures] = useState<Lecture[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [lectureReadStatus, setLectureReadStatus] = useState<
		Record<string, boolean>
	>({})
	const [quizzes, setQuizzes] = useState<Quiz[]>([])
	const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
	const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({})
	const [showResults, setShowResults] = useState(false)
	const [quizScore, setQuizScore] = useState<{
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

			console.log(`Вопрос ${idx + 1}:`, {
				userAnswer,
				correctIndices,
				isCorrect,
				options: q.options
			})

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

	return (
		<div className='flex-1 p-4 sm:p-6 min-h-screen border-t-1'>
			<div className='max-w-9xl mx-auto pb-20'>
				<ChapterHeader
					title={selectedLecture?.title || topic.title}
					isRead={false}
				/>
				{!activeQuiz && selectedLecture?.content ? (
					<div className='prose max-w-none'>
						<ReactMarkdown>{selectedLecture.content}</ReactMarkdown>
					</div>
				) : null}
				{activeQuiz && (
					<div className='mt-4'>
						{showResults ? (
							<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6'>
								<h3 className='text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2'>
									Результаты теста
								</h3>
								<p className='text-blue-800 dark:text-blue-200 text-lg'>
									Правильных ответов: {quizScore?.correct} из {quizScore?.total}
								</p>
								<p className='text-blue-700 dark:text-blue-300 mt-1'>
									Процент:{' '}
									{quizScore
										? Math.round((quizScore.correct / quizScore.total) * 100)
										: 0}
									%
								</p>
							</div>
						) : (
							<div>
								{(activeQuiz.questions || []).length === 0 ? (
									<div className='text-gray-500'>Вопросы отсутствуют</div>
								) : (
									<div className='space-y-6'>
										{(activeQuiz.questions || []).map((q, idx) => (
											<div key={idx}>
												<div className='font-medium text-lg text-gray-800 dark:text-gray-200 mb-3'>
													Вопрос {idx + 1}: {q.text}
												</div>

												<div className='space-y-2'>
													{(q.options || []).map((opt, oIdx) => {
														const isSelected = (
															userAnswers[idx] || []
														).includes(oIdx)
														const questionType = q.question_type

														return (
															<label
																key={oIdx}
																className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
																	isSelected
																		? 'border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-900/20'
																		: 'border-gray-200 dark:border-gray-700 hover:border-fuchsia-300 dark:hover:border-fuchsia-700'
																}`}
															>
																<input
																	type={
																		questionType === 'single_choice'
																			? 'radio'
																			: 'checkbox'
																	}
																	name={`question-${idx}`}
																	checked={isSelected}
																	onChange={() => handleAnswerSelect(idx, oIdx)}
																	className='w-4 h-4 text-fuchsia-600'
																/>
																<span className='text-gray-700 dark:text-gray-300'>
																	{opt.text}
																</span>
															</label>
														)
													})}
												</div>
											</div>
										))}

										<button
											onClick={handleSubmitQuiz}
											disabled={
												Object.keys(userAnswers).length !==
												activeQuiz.questions?.length
											}
											className='w-full mt-6 px-6 py-3 bg-fuchsia-700 text-white rounded-xl shadow-sm hover:bg-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed'
										>
											Закончить тест
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				)}
				{!activeQuiz && !selectedLecture?.content && (
					<div className='text-gray-500'>
						Для темы пока нет лекций в формате markdown.
					</div>
				)}
				{selectedLecture && (
					<div className='mt-6 pt-4 border-t border-gray-200 flex items-center gap-3'>
						<MarkAsReadButton
							isRead={isSelectedRead}
							onMark={handleMarkAsRead}
						/>
						{quizzes.find(
							q =>
								q.title?.toLowerCase() === selectedLecture.title?.toLowerCase()
						) &&
							localStorage.getItem(
								`quizResults_${
									quizzes.find(
										q =>
											q.title?.toLowerCase() ===
											selectedLecture.title?.toLowerCase()
									)?.id
								}`
							) && (
								<button
									onClick={() => {
										const matchingQuiz = quizzes.find(
											q =>
												q.title?.toLowerCase() ===
												selectedLecture.title?.toLowerCase()
										)
										if (matchingQuiz) {
											setActiveQuiz(matchingQuiz)
										}
									}}
									className='px-4 py-2 bg-blue-200 text-black rounded-xl shadow-sm hover:bg-blue-300'
								>
									Посмотреть результаты теста
								</button>
							)}
						<div className='ml-auto flex gap-2'>
							<button
								onClick={() => navigateLecture('prev')}
								className='px-4 py-2 bg-gray-800 text-white rounded-xl shadow-sm hover:bg-gray-700'
							>
								Предыдущая лекция
							</button>
							<button
								onClick={() => navigateLecture('next')}
								className='px-4 py-2 bg-fuchsia-700 text-white rounded-xl shadow-sm hover:bg-fuchsia-500'
							>
								Следующая лекция
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default DynamicTopicContent

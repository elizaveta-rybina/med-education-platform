import { lecturesApi } from '@/app/api/lectures/lectures.api'
import type { Lecture } from '@/app/api/lectures/lectures.types'
import { quizzesApi } from '@/app/api/quizzes/quizzes.api'
import type { Quiz } from '@/app/api/quizzes/quizzes.types'
import { topicsApi } from '@/app/api/topics/topics.api'
import type { Topic } from '@/app/api/topics/topics.types'
import { ChapterHeader } from '@/components/courseInner/ChapterHeader'
import { MarkAsReadButton } from '@/components/courseInner/MarkAsReadButton'
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
					<LectureContent lecture={selectedLecture} />
				) : null}
				{activeQuiz && (
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
				{!activeQuiz && !selectedLecture?.content && (
					<div className='text-gray-500'>
						Для темы пока нет лекций в формате markdown.
					</div>
				)}
				{selectedLecture && !activeQuiz && (
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

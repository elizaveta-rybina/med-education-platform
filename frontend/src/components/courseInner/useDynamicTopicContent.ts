import { lecturesApi } from '@/app/api/lectures/lectures.api'
import type { Lecture } from '@/app/api/lectures/lectures.types'
import { quizzesApi } from '@/app/api/quizzes/quizzes.api'
import type { Quiz } from '@/app/api/quizzes/quizzes.types'
import { topicsApi } from '@/app/api/topics/topics.api'
import type { Topic } from '@/app/api/topics/topics.types'
import { DragDropTableBlock } from '@/features/drag-drop-table/model/types'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useDynamicTopicContent = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const topicIdParam = searchParams.get('topic')
	const lectureIdParam = searchParams.get('lecture')
	const assignmentIdParam = searchParams.get('assignment')

	// --- State ---
	const [topic, setTopic] = useState<Topic | null>(null)
	const [lectures, setLectures] = useState<Lecture[]>([])
	const [quizzes, setQuizzes] = useState<Quiz[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const [lectureReadStatus, setLectureReadStatus] = useState<
		Record<string, boolean>
	>({})

	const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null) // Стандартный тест
	const [assignmentQuiz, setAssignmentQuiz] = useState<Quiz | null>(null) // Задание из меню

	const [currentTableIndex, setCurrentTableIndex] = useState(0)
	const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({})
	const [showResults, setShowResults] = useState(false)
	const [_quizScore, setQuizScore] = useState<{
		correct: number
		total: number
	} | null>(null)

	// --- Derived State ---
	const markdownLectures = useMemo(
		() =>
			lectures.filter(l => (l.content_type || '').toLowerCase() === 'markdown'),
		[lectures]
	)

	const selectedLecture = useMemo(() => {
		if (lectureIdParam) {
			return (
				markdownLectures.find(l => String(l.id) === String(lectureIdParam)) ||
				markdownLectures[0]
			)
		}
		return markdownLectures[0]
	}, [lectureIdParam, markdownLectures])

	const isSelectedRead = useMemo(() => {
		if (!selectedLecture?.id) return false
		return !!lectureReadStatus[String(selectedLecture.id)]
	}, [lectureReadStatus, selectedLecture])

	const displayedQuiz = assignmentQuiz || activeQuiz

	// --- Helpers ---

	const getAssignmentType = (quiz: Quiz) => {
		// Dropdown / ordering таблицы тоже считаем интерактивными, чтобы рендерить под iframe
		if (quiz.file_name || quiz.game_path) return 'interactive'
		if (quiz.questions?.some(q => q.question_type === 'ordering'))
			return 'interactive'
		if (quiz.questions?.some(q => q.question_type === 'table')) return 'table'
		if (quiz.questions?.some(q => q.question_type === 'free-input'))
			return 'free-input'
		if (quiz.questions?.some(q => q.question_type === 'input_answer'))
			return 'input'
		return 'standard'
	}

	const assignmentType = displayedQuiz ? getAssignmentType(displayedQuiz) : null

	// Собираем таблицы для DND (старый формат)
	const dndTableBlocks = useMemo(() => {
		if (assignmentType !== 'table' || !displayedQuiz?.questions) return []

		// Вспомогательная функция
		const getCellValue = (cell: any) =>
			typeof cell === 'object' && cell !== null && 'value' in cell
				? String(cell.value)
				: String(cell || '')

		return displayedQuiz.questions
			.filter(q => q.question_type === 'table' && q.metadata)
			.map((q, idx) => {
				const rawMeta = q.metadata as any
				const metadata =
					typeof rawMeta === 'string' ? JSON.parse(rawMeta) : rawMeta
				// Опции приходят с id из БД, но в типах они без id, поэтому приводим к any[]
				const options = (q.options as any[]) || []

				const correctAnswers: Record<string, string[] | { anyOf: string[] }> =
					{}
				;(metadata.rows || []).forEach((row: any, rowIdx: number) => {
					const cellId = `row_${rowIdx}_effects`
					const correctOptionIds = row.correct_option_ids || []
					const answerMode = row.answer_mode || 'all'

					// correct_option_ids могут быть как индексами (0,1,2...), так и DB ID опций.
					// answers.id сейчас формата ans_<dbId>. Пробуем найти по DB ID, иначе по индексу.
					const correctAnswerIds = correctOptionIds.map((value: number) => {
						// Поиск по DB ID
						const byDbId = options.find(opt => opt?.id === value)
						if (byDbId?.id) return `ans_${byDbId.id}`

						// По индексу (старый формат)
						const byIndex = options[value]
						if (byIndex?.id) return `ans_${byIndex.id}`

						// Фоллбек
						return `ans_${value}`
					})

					console.log('  correctAnswerIds (mapped):', correctAnswerIds)

					if (answerMode === 'any') {
						correctAnswers[cellId] = { anyOf: correctAnswerIds }
					} else {
						correctAnswers[cellId] = correctAnswerIds
					}

					console.log('  final correctAnswers:', correctAnswers[cellId])
				})

				return {
					id: `table_${displayedQuiz.id}_${idx}`,
					type: 'drag-drop-table' as const,
					title: q.text || 'Таблица',
					tableTitle: q.text || '',
					description: displayedQuiz.description || '',
					columns: (metadata.columns || []).map((col: any, i: number) => ({
						id: `col_${i}`,
						title: col.name || `Колонка ${i + 1}`,
						width: col.width
					})),
					rows: (metadata.rows || []).map((row: any, i: number) => ({
						id: `row_${i}`,
						title: getCellValue(row.cells?.[0]),
						characteristic: getCellValue(row.cells?.[1])
					})),
					answers: (Array.isArray(metadata.answers)
						? metadata.answers
						: options
					).map((ans: any, i: number) => {
						const answerDbId =
							ans?.id ?? ans?.option_id ?? ans?.original_id ?? i
						return {
							// ID формата ans_<dbId>, чтобы совпадало с correct_option_ids
							id: `ans_${answerDbId}`,
							content: ans.text || ans.content || ans.title || ''
						}
					}),
					correctAnswers
				} as DragDropTableBlock
			})
	}, [displayedQuiz, assignmentType])

	// Собираем таблицы для Interactive (новый формат Dropdown) со всех квизов темы
	const allTableQuestionsInTopic = useMemo(() => {
		if (assignmentType !== 'interactive') return []
		return quizzes
			.flatMap(q => q.questions || [])
			.filter(
				q => q.question_type === 'table' || q.question_type === 'ordering'
			)
			.filter(q => {
				const meta: any =
					typeof q.metadata === 'string' ? JSON.parse(q.metadata) : q.metadata
				return meta?.rows?.[0]?.cells?.some((c: any) => c.available_option_ids)
			})
	}, [quizzes, assignmentType])

	// --- Effects ---

	// 1. Load Topic Data
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

				// Parallel requests
				const [topicResp, contentsResp, quizzesResp] = await Promise.all([
					topicsApi.getById(topicId),
					lecturesApi.getByTopicId(topicId),
					quizzesApi.getAll()
				])

				const topicData =
					(topicResp as any).data || (topicResp as any).topic || topicResp
				setTopic(topicData as Topic)

				const lecturesData = (contentsResp as any).data?.lectures || []
				setLectures(lecturesData as Lecture[])

				const allQuizzes =
					(quizzesResp as { data?: Quiz[] }).data || (quizzesResp as Quiz[])
				const topicQuizzes = (allQuizzes || []).filter(
					q => q.topic_id === topicId || q.quizable_id === topicId
				) as Quiz[]
				setQuizzes(topicQuizzes)
			} catch (e) {
				console.error('Failed to load topic contents', e)
				setError('Не удалось загрузить содержание темы')
			} finally {
				setLoading(false)
			}
		}
		void load()
	}, [topicIdParam])

	// 2. Read Status Sync
	useEffect(() => {
		const syncStatus = () => {
			const saved = localStorage.getItem('lectureReadStatus')
			setLectureReadStatus(saved ? JSON.parse(saved) : {})
		}
		syncStatus()
		window.addEventListener('lectureReadStatusUpdated', syncStatus)
		return () =>
			window.removeEventListener('lectureReadStatusUpdated', syncStatus)
	}, [])

	// 3. Load Assignment
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
				let quizData =
					(quizResp as any).data || (quizResp as any).quiz || quizResp
				setAssignmentQuiz(quizData as Quiz)
				setCurrentTableIndex(0)
			} catch (e) {
				console.error('Failed to load assignment quiz:', e)
				setAssignmentQuiz(null)
			}
		}
		void loadAssignment()
	}, [assignmentIdParam])

	// 4. Load Results
	useEffect(() => {
		const quiz = assignmentQuiz || activeQuiz
		if (!quiz?.id) return
		const savedResults = localStorage.getItem(`quizResults_${quiz.id}`)
		if (savedResults) {
			const parsed = JSON.parse(savedResults)
			setUserAnswers(parsed.userAnswers || {})
			setQuizScore(parsed.quizScore || null)
			setShowResults(parsed.showResults || false)
		}
	}, [activeQuiz?.id, assignmentQuiz?.id])

	// --- Handlers ---

	const handleMarkAsRead = () => {
		if (!selectedLecture?.id) return
		const key = 'lectureReadStatus'
		const saved = localStorage.getItem(key)
		const status = saved ? JSON.parse(saved) : {}
		status[String(selectedLecture.id)] = true
		localStorage.setItem(key, JSON.stringify(status))
		setLectureReadStatus(status)
		window.dispatchEvent(new Event('lectureReadStatusUpdated'))

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
		if (showResults || !activeQuiz?.questions?.[questionIndex]) return
		const question = activeQuiz.questions[questionIndex]

		setUserAnswers(prev => {
			const current = prev[questionIndex] || []
			if (question.question_type === 'single_choice') {
				return { ...prev, [questionIndex]: [optionIndex] }
			} else {
				return {
					...prev,
					[questionIndex]: current.includes(optionIndex)
						? current.filter(i => i !== optionIndex)
						: [...current, optionIndex]
				}
			}
		})
	}

	const handleSubmitQuiz = () => {
		const quiz = assignmentQuiz || activeQuiz
		if (!quiz?.questions) return
		let correct = 0
		quiz.questions.forEach((q, idx) => {
			const userAnswer = userAnswers[idx] || []
			const correctIndices = (q.options || [])
				.map((opt, i) => (opt.is_correct ? i : -1))
				.filter(i => i !== -1)
			const isCorrect =
				userAnswer.length === correctIndices.length &&
				userAnswer.every(a => correctIndices.includes(a))
			if (isCorrect) correct++
		})

		const score = { correct, total: quiz.questions.length }
		setQuizScore(score)
		setShowResults(true)

		if (quiz.id) {
			localStorage.setItem(
				`quizResults_${quiz.id}`,
				JSON.stringify({
					userAnswers,
					quizScore: score,
					showResults: true,
					title: quiz.title,
					quizType: 'standard'
				})
			)
			window.dispatchEvent(new Event('resultsUpdated'))
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

	const resetActiveQuiz = () => {
		setActiveQuiz(null)
		setAssignmentQuiz(null)
		setShowResults(false)
		setUserAnswers({})
		setQuizScore(null)
	}

	const handleTableComplete = (
		quizId: number,
		stats?: { correct: number; total: number },
		quizType?: string
	) => {
		const quizTitle =
			quizzes.find(q => Number(q.id) === Number(quizId))?.title ||
			activeQuiz?.title ||
			assignmentQuiz?.title

		const quizScore = {
			correct: stats?.correct ?? (stats ? 0 : 1),
			total: stats?.total ?? 1
		}

		localStorage.setItem(
			`quizResults_${quizId}`,
			JSON.stringify({
				userAnswers: {},
				quizScore,
				showResults: true,
				title: quizTitle,
				quizType
			})
		)
		window.dispatchEvent(new Event('resultsUpdated'))
	}

	return {
		topic,
		loading,
		error,
		selectedLecture,
		displayedQuiz,
		activeQuiz,
		assignmentQuiz,
		assignmentType,
		quizzes,
		isSelectedRead,
		showResults,
		userAnswers,
		currentTableIndex,
		setCurrentTableIndex,
		dndTableBlocks,
		allTableQuestionsInTopic,

		// Actions
		handleMarkAsRead,
		handleAnswerSelect,
		handleSubmitQuiz,
		navigateLecture,
		resetActiveQuiz,
		setActiveQuiz,
		handleTableComplete
	}
}

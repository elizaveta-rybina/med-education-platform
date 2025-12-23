import { lecturesApi } from '@/app/api/lectures/lectures.api'
import type { Lecture } from '@/app/api/lectures/lectures.types'
import { quizzesApi } from '@/app/api/quizzes/quizzes.api'
import type { Quiz, QuizPayload } from '@/app/api/quizzes/quizzes.types'
import { topicsApi } from '@/app/api/topics/topics.api'
import type { Topic } from '@/app/api/topics/topics.types'
import { TopicForm } from '@/features/module-topics/ui/TopicForm'
import {
	ContentItemList,
	type ContentItem
} from '@/features/topic-content/ui/ContentItemList'
import { DragDropQuizForm } from '@/features/topic-content/ui/DragDropQuizForm'
import { InputAnswerForm } from '@/features/topic-content/ui/InputAnswerForm'
import { InteractiveExperienceForm } from '@/features/topic-content/ui/InteractiveExperienceForm'
import { LectureForm } from '@/features/topic-content/ui/LectureForm'
import { QuizForm } from '@/features/topic-content/ui/QuizForm'
import { Modal } from '@/shared/ui/modal'
import { resizeImage } from '@/shared/utils/imageResize'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TopicContentPage = () => {
	const { topicId } = useParams<{ topicId: string }>()
	const navigate = useNavigate()
	const [topic, setTopic] = useState<Topic | null>(null)
	const [lectures, setLectures] = useState<Lecture[]>([])
	const [quizzes, setQuizzes] = useState<Quiz[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [deletingLectureId, setDeletingLectureId] = useState<number | null>(
		null
	)
	const [deletingQuizId, setDeletingQuizId] = useState<number | null>(null)
	const [showTopicForm, setShowTopicForm] = useState(false)
	const [saving, setSaving] = useState(false)

	const loadAll = useCallback(async () => {
		if (!topicId) return
		try {
			setLoading(true)
			setError(null)
			const topicResponse = await topicsApi.getById(Number(topicId))
			const topicData = topicResponse.data || topicResponse
			setTopic(topicData as Topic)

			// Загружаем лекции из бэкенда
			const contentResponse = await lecturesApi.getByTopicId(Number(topicId))
			const lectures = contentResponse.data?.lectures || []
			setLectures(lectures)

			// Загружаем тесты и фильтруем по текущей теме
			try {
				const quizzesResponse = await quizzesApi.getAll()
				const quizzesData =
					(quizzesResponse as { data?: Quiz[] }).data ||
					(quizzesResponse as Quiz[])
				const topicQuizzes = (quizzesData || []).filter(
					q =>
						q.topic_id === Number(topicId) || q.quizable_id === Number(topicId)
				) as Quiz[]
				setQuizzes(topicQuizzes)
			} catch (e) {
				console.warn('Не удалось загрузить тесты:', e)
				setQuizzes([])
			}
		} catch (e) {
			setError('Не удалось загрузить тему')
		} finally {
			setLoading(false)
		}
	}, [topicId])

	useEffect(() => {
		void loadAll()
	}, [loadAll])

	const contentItems = useMemo<ContentItem[]>(() => {
		const lectureItems: ContentItem[] = lectures.map(lec => ({
			id: lec.id!,
			type: 'lecture' as const,
			title: lec.title,
			order_number: lec.order_number,
			lecture: lec
		}))

		const quizItems: ContentItem[] = quizzes.map((quiz, index) => ({
			id: quiz.id ?? Number(`${topicId ?? '0'}${index + 1}00`),
			type: 'quiz' as const,
			title: quiz.title || 'Без названия',
			order_number: quiz.order_number ?? undefined,
			quiz
		}))

		return [...lectureItems, ...quizItems].sort((a, b) => {
			const aOrder = a.order_number ?? Number.MAX_SAFE_INTEGER
			const bOrder = b.order_number ?? Number.MAX_SAFE_INTEGER
			if (aOrder !== bOrder) return aOrder - bOrder
			return a.id - b.id
		})
	}, [lectures, quizzes, topicId])

	const nextOrder = useMemo(
		() =>
			lectures.length > 0
				? Math.max(...lectures.map(l => l.order_number ?? 0)) + 1
				: 1,
		[lectures]
	)

	const nextQuizOrder = useMemo(
		() =>
			contentItems.length > 0
				? Math.max(...contentItems.map(item => item.order_number ?? 0)) + 1
				: 1,
		[contentItems]
	)

	// Вспомогательная функция для преобразования относительного URL в абсолютный
	const getAbsoluteImageUrl = (url: string): string => {
		if (!url) return url

		const hasPort = /^https?:\/\/[^/]+:\d+/.test(url)

		// Уже корректный абсолютный с портом
		if (url.includes('localhost:8000') || hasPort) {
			return url
		}

		// http://localhost/… (без порта) → добавить 8000
		if (url.startsWith('http://localhost/')) {
			return url.replace('http://localhost/', 'http://localhost:8000/')
		}

		// /storage/... → подставить хост (без /api)
		if (url.startsWith('/storage/')) {
			const apiBaseUrl =
				import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
			const match = apiBaseUrl.match(/^(https?:\/\/[^/]+)/)
			const hostUrl = match ? match[1] : 'http://localhost:8000'
			return `${hostUrl}${url}`
		}

		// Остальные пути считаем относительными к API
		const apiBaseUrl =
			import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
		return `${apiBaseUrl}${url}`
	}

	const [showLectureForm, setShowLectureForm] = useState(false)
	const [showQuizForm, setShowQuizForm] = useState(false)
	const [showQuizTypeSelection, setShowQuizTypeSelection] = useState(false)
	const [quizType, setQuizType] = useState<
		'standard' | 'table' | 'interactive' | 'input' | null
	>(null)
	const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null)
	const [editingLecture, setEditingLecture] = useState<Lecture | null>(null)
	const [uploadedImages, setUploadedImages] = useState<
		Array<{ id: number; url: string; filename: string; attachment_id: number }>
	>([])

	const handleImageUpload = async (file: File): Promise<string> => {
		if (!topicId) {
			throw new Error('Тема не найдена')
		}

		try {
			// 1) Уменьшаем изображение по пикселям, если превышает лимиты
			const resize = await resizeImage(file, {
				maxWidth: 600,
				maxHeight: 600,
				quality: 0.85
			})
			const fileToUpload = resize.file

			// Если лекция еще не создана, создаем черновик
			if (!editingLecture?.id) {
				const draftLecture = await lecturesApi.create({
					topic_id: Number(topicId),
					title: 'Черновик лекции (без названия)',
					content: '',
					order_number: nextOrder,
					content_type: 'markdown'
				})

				const lectureId =
					(draftLecture as any).data?.id ||
					(draftLecture as any).id ||
					(draftLecture as any).lecture?.id

				if (!lectureId) {
					throw new Error('Не удалось создать черновик лекции')
				}

				// Обновляем состояние с созданной лекцией
				setEditingLecture({
					id: lectureId,
					topic_id: Number(topicId),
					title: 'Черновик лекции (без названия)',
					content: '',
					order_number: nextOrder,
					content_type: 'markdown'
				})

				// Загружаем изображение в созданную лекцию
				const response = await lecturesApi.uploadImage(lectureId, fileToUpload)
				console.log('Ответ от сервера при загрузке изображения:', response)

				// Пробуем извлечь URL из различных возможных структур ответа
				const url =
					(response as any).url ||
					(response as any).path ||
					(response as any).data?.url ||
					(response as any).data?.path ||
					(response as any).file_path ||
					(response as any).image_url

				const attachmentId =
					(response as any).attachment_id ||
					(response as any).data?.attachment_id

				if (url) {
					// Если это относительный путь, делаем его абсолютным
					const fullUrl = getAbsoluteImageUrl(url)
					// Добавляем изображение в список загруженных
					setUploadedImages(prev => [
						...prev,
						{
							id: Date.now(),
							url: fullUrl,
							filename: file.name,
							attachment_id: attachmentId || 0
						}
					])
					return fullUrl
				}

				console.warn('URL не получен от сервера, используем локальный URL')
				const localUrl = URL.createObjectURL(fileToUpload)
				setUploadedImages(prev => [
					...prev,
					{
						id: Date.now(),
						url: localUrl,
						filename: file.name,
						attachment_id: attachmentId || 0
					}
				])
				return localUrl
			}

			// Если лекция уже существует, просто загружаем изображение
			const response = await lecturesApi.uploadImage(
				editingLecture.id,
				fileToUpload
			)
			console.log('Ответ от сервера при загрузке изображения:', response)

			// Пробуем извлечь URL из различных возможных структур ответа
			const url =
				(response as any).url ||
				(response as any).path ||
				(response as any).data?.url ||
				(response as any).data?.path ||
				(response as any).file_path ||
				(response as any).image_url

			const attachmentId =
				(response as any).attachment_id || (response as any).data?.attachment_id

			if (url) {
				// Если это относительный путь, делаем его абсолютным
				const fullUrl = getAbsoluteImageUrl(url)
				// Добавляем изображение в список загруженных
				setUploadedImages(prev => [
					...prev,
					{
						id: Date.now(),
						url: fullUrl,
						filename: file.name,
						attachment_id: attachmentId || 0
					}
				])
				return fullUrl
			}

			console.warn('URL не получен от сервера')
			// Добавляем изображение в список загруженных
			setUploadedImages(prev => [
				...prev,
				{
					id: Date.now(),
					url,
					filename: file.name,
					attachment_id: attachmentId || 0
				}
			])
			return url
		} catch (e) {
			console.error('Ошибка загрузки изображения:', e)
			throw e
		}
	}

	const handleSaveQuiz = async (payload: QuizPayload) => {
		if (!topicId) return
		setSaving(true)
		try {
			if (editingQuiz?.id) {
				const updatePayload = {
					title: payload.title,
					description: payload.description,
					quiz_type: payload.quiz_type,
					max_attempts: payload.max_attempts,
					passing_score: payload.passing_score,
					time_limit_minutes: payload.time_limit_minutes,
					order_number: payload.order_number,
					entity_type: payload.entity_type,
					quizable_id: payload.quizable_id,
					is_published: payload.is_published,
					questions: payload.questions
				}
				const resp = await quizzesApi.update(editingQuiz.id, updatePayload)
				const updated = (resp as { data?: Quiz; quiz?: Quiz }).data ||
					(resp as { data?: Quiz; quiz?: Quiz }).quiz || {
						...editingQuiz,
						...updatePayload
					}
				setQuizzes(prev =>
					prev.map(q => (q.id === editingQuiz.id ? { ...q, ...updated } : q))
				)
				setEditingQuiz(null)
				setShowQuizForm(false)
			} else {
				const response = await quizzesApi.create(payload)
				const createdQuiz =
					(response as { quiz?: Quiz; data?: Quiz }).quiz ||
					(response as { quiz?: Quiz; data?: Quiz }).data

				if (createdQuiz) {
					setQuizzes(prev => [...prev, createdQuiz])
				} else {
					await loadAll()
				}

				setShowQuizForm(false)
			}
		} catch (e) {
			setError('Ошибка при сохранении теста')
		} finally {
			setSaving(false)
		}
	}

	const handleSaveLecture = async (values: {
		title: string
		content: string
		order_number: number
		content_type?: 'markdown' | 'html' | 'plaintext'
	}) => {
		if (!topicId) return
		setSaving(true)
		try {
			if (editingLecture?.id) {
				await lecturesApi.update(editingLecture.id, {
					title: values.title,
					content: values.content,
					order_number: values.order_number,
					content_type: values.content_type || 'markdown',
					topic_id: Number(topicId)
				})
			} else {
				await lecturesApi.create({
					topic_id: Number(topicId),
					title: values.title,
					content: values.content,
					order_number: values.order_number,
					content_type: values.content_type || 'markdown'
				})
			}
			// Перезагружаем лекции
			const contentResponse = await lecturesApi.getByTopicId(Number(topicId))
			const lectures = contentResponse.data?.lectures || []
			setLectures(lectures)
			setShowLectureForm(false)
			setEditingLecture(null)
			setUploadedImages([])
		} finally {
			setSaving(false)
		}
	}

	const handleDeleteLecture = async (lectureId: number) => {
		setDeletingLectureId(lectureId)
		setShowDeleteModal(true)
	}

	const confirmDeleteLecture = async () => {
		if (!deletingLectureId) return
		setSaving(true)
		try {
			await lecturesApi.delete(deletingLectureId)
			setLectures(prev => prev.filter(l => l.id !== deletingLectureId))
			setShowDeleteModal(false)
			setDeletingLectureId(null)
		} catch (e) {
			setError('Ошибка при удалении лекции')
		} finally {
			setSaving(false)
		}
	}

	const handleDeleteQuiz = async (quizId: number) => {
		setDeletingQuizId(quizId)
		setShowDeleteModal(true)
	}

	const confirmDeleteQuiz = async () => {
		if (!deletingQuizId) return
		setSaving(true)
		try {
			await quizzesApi.delete(deletingQuizId)
			setQuizzes(prev => prev.filter(q => q.id !== deletingQuizId))
			setShowDeleteModal(false)
			setDeletingQuizId(null)
		} catch (e) {
			setError('Ошибка при удалении теста')
		} finally {
			setSaving(false)
		}
	}

	const handleSaveTopic = async (values: {
		title: string
		description?: string
		order_number: number
		is_published?: boolean
		cover_image?: File
	}) => {
		if (!topic?.id) return
		setSaving(true)
		try {
			await topicsApi.update(topic.id, {
				title: values.title,
				description: values.description,
				order_number: values.order_number,
				is_published: values.is_published
			})
			// Загружаем обложку если выбрана
			if (values.cover_image) {
				await topicsApi.uploadCover(topic.id, values.cover_image)
			}
			// Перезагружаем тему
			await loadAll()
			setShowTopicForm(false)
		} catch (e) {
			setError('Ошибка при сохранении темы')
		} finally {
			setSaving(false)
		}
	}

	const handleDeleteTopic = async () => {
		if (!topic?.id) return
		setSaving(true)
		try {
			await topicsApi.delete(topic.id)
			setShowDeleteModal(false)
			navigate(-1)
		} catch (e) {
			setError('Ошибка при удалении темы')
		} finally {
			setSaving(false)
		}
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-gray-600 dark:text-gray-400'>Загрузка...</div>
			</div>
		)
	}

	if (!topic) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-red-600'>{error ?? 'Тема не найдена'}</div>
			</div>
		)
	}

	return (
		<div className='p-6 max-w-5xl mx-auto'>
			<div className='mb-8'>
				<button
					onClick={() => navigate(-1)}
					className='text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 flex items-center gap-2 mb-4'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 19l-7-7 7-7'
						/>
					</svg>
					Назад
				</button>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold text-gray-800 dark:text-white'>
						{topic.title}
					</h1>
					<div className='flex gap-2'>
						<button
							onClick={() => setShowTopicForm(true)}
							className='flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm'
							title='Редактировать тему'
							disabled={saving}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
								/>
							</svg>
							Редактировать
						</button>
						<button
							onClick={() => {
								setDeletingLectureId(null)
								setDeletingQuizId(null)
								setShowDeleteModal(true)
							}}
							className='flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm'
							title='Удалить тему'
							disabled={saving}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
								/>
							</svg>
							Удалить
						</button>
					</div>
				</div>
			</div>

			<div className='space-y-6'>
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					{topic.description ? (
						<p className='text-gray-600 dark:text-gray-300 whitespace-pre-wrap'>
							{topic.description}
						</p>
					) : (
						<p className='text-gray-400'>Описание не указано</p>
					)}
				</div>

				{showTopicForm && (
					<div className='p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600'>
						<h3 className='font-semibold text-gray-800 dark:text-white mb-4'>
							Редактирование темы
						</h3>
						<TopicForm
							initialValues={{
								title: topic.title,
								description: topic.description ?? undefined,
								order_number: topic.order_number,
								is_published: !!topic.is_published
							}}
							isLoading={saving}
							onSubmit={handleSaveTopic}
							onCancel={() => setShowTopicForm(false)}
						/>
					</div>
				)}

				{/* Модальное окно подтверждения удаления */}
				<Modal
					isOpen={showDeleteModal}
					onClose={() => {
						setShowDeleteModal(false)
						setDeletingLectureId(null)
						setDeletingQuizId(null)
					}}
					showCloseButton={true}
					className='max-w-sm mx-4'
				>
					<div className='p-6'>
						<h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>
							{deletingLectureId
								? 'Удалить лекцию?'
								: deletingQuizId
								? 'Удалить тест?'
								: 'Удалить тему?'}
						</h3>
						<p className='text-gray-600 dark:text-gray-300 mb-6'>
							{deletingLectureId
								? 'Вы уверены, что хотите удалить эту лекцию? Это действие нельзя отменить.'
								: deletingQuizId
								? 'Вы уверены, что хотите удалить этот тест? Это действие нельзя отменить.'
								: `Вы уверены, что хотите удалить тему "${topic?.title}"? Это действие нельзя отменить.`}
						</p>
						<div className='flex gap-3 justify-end'>
							<button
								onClick={() => {
									setShowDeleteModal(false)
									setDeletingLectureId(null)
									setDeletingQuizId(null)
								}}
								disabled={saving}
								className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50'
							>
								Отмена
							</button>
							<button
								onClick={async () => {
									if (deletingLectureId) {
										await confirmDeleteLecture()
										return
									}
									if (deletingQuizId) {
										await confirmDeleteQuiz()
										return
									}
									await handleDeleteTopic()
								}}
								disabled={saving}
								className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50'
							>
								{saving ? 'Удаление...' : 'Удалить'}
							</button>
						</div>
					</div>
				</Modal>
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
							Контент темы
						</h2>
						{!showLectureForm && !showQuizForm && (
							<div className='flex gap-2'>
								<button
									onClick={() => {
										setEditingLecture(null)
										setShowLectureForm(true)
										setShowQuizForm(false)
									}}
									className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
									title='Добавить лекцию'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
										/>
									</svg>
									Лекция
								</button>
								<button
									onClick={() => {
										setShowQuizTypeSelection(true)
										setShowLectureForm(false)
										setEditingLecture(null)
										setEditingQuiz(null)
										setQuizType(null)
									}}
									className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
									title='Добавить тест'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
										/>
									</svg>
									Тест
								</button>
							</div>
						)}
					</div>

					{showLectureForm && (
						<div className='mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600'>
							<h3 className='font-semibold text-gray-800 dark:text-white mb-4'>
								{editingLecture
									? 'Редактирование лекции'
									: 'Добавление новой лекции'}
							</h3>
							<LectureForm
								initialValues={
									editingLecture
										? {
												title: editingLecture.title,
												content: editingLecture.content ?? '',
												order_number: editingLecture.order_number ?? 1,
												content_type: editingLecture.content_type as
													| 'markdown'
													| 'html'
													| 'plaintext'
										  }
										: undefined
								}
								defaultOrderNumber={editingLecture ? undefined : nextOrder}
								isLoading={saving}
								onSubmit={handleSaveLecture}
								onCancel={() => {
									setShowLectureForm(false)
									setEditingLecture(null)
									setUploadedImages([])
								}}
								onImageUpload={handleImageUpload}
								uploadedImages={uploadedImages}
							/>
						</div>
					)}

					{showQuizForm && topicId && (
						<div className='mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600'>
							<h3 className='font-semibold text-gray-800 dark:text-white mb-4'>
								{editingQuiz ? 'Редактирование теста' : 'Добавление теста'}
							</h3>
							{quizType === 'standard' && (
								<QuizForm
									topicId={Number(topicId)}
									defaultOrderNumber={nextQuizOrder}
									isLoading={saving}
									onSubmit={handleSaveQuiz}
									onCancel={() => {
										setShowQuizForm(false)
										setEditingQuiz(null)
										setQuizType(null)
									}}
									initialValues={editingQuiz || undefined}
								/>
							)}
							{quizType === 'table' && (
								<DragDropQuizForm
									topicId={Number(topicId)}
									defaultOrderNumber={nextQuizOrder}
									isLoading={saving}
									onSubmit={handleSaveQuiz}
									onCancel={() => {
										setShowQuizForm(false)
										setEditingQuiz(null)
										setQuizType(null)
									}}
									initialValues={editingQuiz || undefined}
								/>
							)}{' '}
							{quizType === 'interactive' && (
								<InteractiveExperienceForm
									topicId={Number(topicId)}
									defaultOrderNumber={nextQuizOrder}
									isLoading={saving}
									onSubmit={handleSaveQuiz}
									onCancel={() => {
										setShowQuizForm(false)
										setEditingQuiz(null)
										setQuizType(null)
									}}
									initialValues={editingQuiz || undefined}
								/>
							)}
							{quizType === 'input' && (
								<InputAnswerForm
									topicId={Number(topicId)}
									defaultOrderNumber={nextQuizOrder}
									isLoading={saving}
									onSubmit={handleSaveQuiz}
									onCancel={() => {
										setShowQuizForm(false)
										setEditingQuiz(null)
										setQuizType(null)
									}}
									initialValues={editingQuiz || undefined}
								/>
							)}{' '}
						</div>
					)}

					<Modal
						isOpen={showQuizTypeSelection}
						onClose={() => {
							setShowQuizTypeSelection(false)
							setQuizType(null)
						}}
						className='p-6 max-w-3xl'
					>
						<div className='p-6 bg-white dark:bg-gray-800 rounded-lg inline-block w-auto max-w-3xl'>
							<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
								Выберите тип теста
							</h2>
							<div className='space-y-3'>
								<button
									onClick={() => {
										setQuizType('standard')
										setShowQuizTypeSelection(false)
										setShowQuizForm(true)
									}}
									className='w-full p-4 text-left border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20'
								>
									<div className='font-semibold text-gray-900 dark:text-white'>
										Стандартный тест
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
										Вопросы с выбором одного или нескольких ответов
									</div>
								</button>
								<button
									onClick={() => {
										setQuizType('table')
										setShowQuizTypeSelection(false)
										setShowQuizForm(true)
									}}
									className='w-full p-4 text-left border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 dark:hover:border-green-500 transition-colors hover:bg-green-50 dark:hover:bg-green-900/20'
								>
									<div className='font-semibold text-gray-900 dark:text-white'>
										Таблица (Drag & Drop)
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
										Интерактивная таблица с динамическими колонками и ячейками
									</div>
								</button>{' '}
								<button
									onClick={() => {
										setQuizType('interactive')
										setShowQuizTypeSelection(false)
										setShowQuizForm(true)
									}}
									className='w-full p-4 text-left border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 transition-colors hover:bg-purple-50 dark:hover:bg-purple-900/20'
								>
									<div className='font-semibold text-gray-900 dark:text-white'>
										Интерактивный опыт
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
										Блок с интерактивным сценарием/инструкцией
									</div>
								</button>
								<button
									onClick={() => {
										setQuizType('input')
										setShowQuizTypeSelection(false)
										setShowQuizForm(true)
									}}
									className='w-full p-4 text-left border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors hover:bg-orange-50 dark:hover:bg-orange-900/20'
								>
									<div className='font-semibold text-gray-900 dark:text-white'>
										Тест с вводом ответов
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
										Открытые ответы с проверкой ввода
									</div>
								</button>{' '}
							</div>
						</div>
					</Modal>

					<ContentItemList
						items={contentItems}
						onEditLecture={lec => {
							setEditingLecture(lec)
							setShowLectureForm(true)
						}}
						onDeleteLecture={handleDeleteLecture}
						onEditQuiz={quiz => {
							setEditingQuiz(quiz)
							// Determine quiz type based on question type first, then quiz_type
							if (quiz.questions?.some(q => q.question_type === 'table')) {
								setQuizType('table')
							} else if (
								quiz.questions?.some(q => q.question_type === 'input_answer')
							) {
								setQuizType('input')
							} else if (quiz.quiz_type === 'additional') {
								setQuizType('interactive')
							} else {
								setQuizType('standard')
							}
							setShowQuizForm(true)
							setShowLectureForm(false)
						}}
						onDeleteQuiz={handleDeleteQuiz}
						isLoading={saving}
					/>
				</div>
			</div>
		</div>
	)
}

export default TopicContentPage

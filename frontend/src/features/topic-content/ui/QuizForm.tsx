import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MarkdownEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import remarkGfm from 'remark-gfm'
import { UploadedImagesDisplay } from './UploadedImagesDisplay'

import type {
	Quiz,
	QuizPayload,
	QuizQuestionPayload,
	QuizType
} from '@/app/api/quizzes/quizzes.types'

interface QuizFormProps {
	topicId: number
	defaultOrderNumber?: number
	isLoading?: boolean
	onSubmit: (payload: QuizPayload) => Promise<void>
	onCancel: () => void
	initialValues?: Partial<Quiz>
	onImageUpload?: (file: File) => Promise<string>
	onDeleteImage?: (imageId: number) => Promise<void>
	uploadedImages?: Array<{ id: number; url: string; filename: string }>
}

type ChoiceOptionState = {
	id: string
	text: string
	is_correct: boolean
}

type QuestionState = {
	id: string
	text: string
	question_type: 'single_choice' | 'multiple_choice'
	points: number
	is_auto_graded: boolean
	options: ChoiceOptionState[]
}

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

const createQuestionState = (
	type: 'single_choice' | 'multiple_choice'
): QuestionState => {
	return {
		id: generateId(),
		text: '',
		question_type: type,
		points: 1,
		is_auto_graded: true,
		options: [
			{ id: generateId(), text: 'Вариант 1', is_correct: true },
			{ id: generateId(), text: 'Вариант 2', is_correct: false }
		]
	}
}

export const QuizForm = ({
	topicId,
	defaultOrderNumber,
	isLoading = false,
	onSubmit,
	onCancel,
	initialValues,
	onImageUpload,
	onDeleteImage,
	uploadedImages = []
}: QuizFormProps) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [quizType, setQuizType] = useState<QuizType>('topic_final')
	const [maxAttempts, setMaxAttempts] = useState('1')
	const [passingScore, setPassingScore] = useState('80')
	const [timeLimit, setTimeLimit] = useState('30')
	const [orderNumber, setOrderNumber] = useState('')
	const [questions, setQuestions] = useState<QuestionState[]>([
		createQuestionState('single_choice')
	])
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (orderNumber === '' && defaultOrderNumber) {
			setOrderNumber(String(defaultOrderNumber))
		}
	}, [defaultOrderNumber, orderNumber])

	useEffect(() => {
		if (!initialValues) return
		if (initialValues.title) setTitle(initialValues.title)
		if (typeof initialValues.description !== 'undefined')
			setDescription(initialValues.description || '')
		if (initialValues.quiz_type) setQuizType(initialValues.quiz_type)
		if (typeof initialValues.max_attempts !== 'undefined')
			setMaxAttempts(String(initialValues.max_attempts ?? ''))
		if (typeof initialValues.passing_score !== 'undefined')
			setPassingScore(String(initialValues.passing_score ?? ''))
		if (typeof initialValues.time_limit_minutes !== 'undefined')
			setTimeLimit(String(initialValues.time_limit_minutes ?? ''))
		if (typeof initialValues.order_number !== 'undefined')
			setOrderNumber(String(initialValues.order_number ?? ''))

		// Загружаем вопросы (только single_choice и multiple_choice)
		if (initialValues.questions && initialValues.questions.length > 0) {
			const loadedQuestions: QuestionState[] = initialValues.questions
				.filter(
					q =>
						q.question_type === 'single_choice' ||
						q.question_type === 'multiple_choice'
				)
				.map(q => {
					const options: ChoiceOptionState[] = (q.options || []).map(opt => ({
						id: generateId(),
						text: opt.text || '',
						is_correct: opt.is_correct || false
					}))

					return {
						id: generateId(),
						text: q.text || '',
						question_type: q.question_type as
							| 'single_choice'
							| 'multiple_choice',
						points: q.points || 1,
						is_auto_graded: q.is_auto_graded ?? true,
						options
					}
				})
			if (loadedQuestions.length > 0) {
				setQuestions(loadedQuestions)
			}
		}
	}, [initialValues])

	const handleImageUpload = async (file: File): Promise<string> => {
		if (!onImageUpload) {
			throw new Error('Image upload not configured')
		}
		try {
			const url = await onImageUpload(file)
			return url
		} catch (e) {
			console.error('Image upload failed:', e)
			throw e
		}
	}

	const handleAddQuestion = (type: 'single_choice' | 'multiple_choice') => {
		setQuestions(prev => [...prev, createQuestionState(type)])
	}

	const handleRemoveQuestion = (questionId: string) => {
		setQuestions(prev => prev.filter(q => q.id !== questionId))
	}

	const updateQuestion = (
		questionId: string,
		updater: (q: QuestionState) => QuestionState
	) => {
		setQuestions(prev => prev.map(q => (q.id === questionId ? updater(q) : q)))
	}

	const handleOptionChange = (
		questionId: string,
		optionId: string,
		field: 'text' | 'is_correct',
		value: string | boolean
	) => {
		updateQuestion(questionId, q => {
			const options = q.options.map(opt => {
				if (opt.id !== optionId) return opt

				if (field === 'text') {
					return { ...opt, text: String(value) }
				}

				if (q.question_type === 'single_choice') {
					return { ...opt, is_correct: true }
				}

				return { ...opt, is_correct: Boolean(value) }
			})

			// Для одиночного выбора сбрасываем остальные варианты
			const normalizedOptions =
				q.question_type === 'single_choice'
					? options.map(opt => ({ ...opt, is_correct: opt.id === optionId }))
					: options

			return { ...q, options: normalizedOptions }
		})
	}

	const handleAddOption = (questionId: string) => {
		updateQuestion(questionId, q => ({
			...q,
			options: [
				...q.options,
				{
					id: generateId(),
					text: `Вариант ${q.options.length + 1}`,
					is_correct: false
				}
			]
		}))
	}

	const handleRemoveOption = (questionId: string, optionId: string) => {
		updateQuestion(questionId, q => ({
			...q,
			options: q.options.filter(opt => opt.id !== optionId)
		}))
	}

	const validate = (): string | null => {
		if (!title.trim()) return 'Название теста обязательно'
		if (questions.length === 0) return 'Добавьте хотя бы один вопрос'

		for (const question of questions) {
			if (!question.text.trim()) {
				return 'У каждого вопроса должен быть текст'
			}
			if (question.points <= 0) {
				return 'Баллы за вопрос должны быть > 0'
			}

			if (question.options.length < 2) {
				return 'Вопросы с выбором ответа требуют минимум два варианта'
			}

			const correctCount = question.options.filter(o => o.is_correct).length
			if (question.question_type === 'single_choice' && correctCount !== 1) {
				return 'Для одиночного выбора выберите ровно один правильный вариант'
			}
			if (question.question_type === 'multiple_choice' && correctCount === 0) {
				return 'Для множественного выбора отметьте хотя бы один правильный вариант'
			}
		}

		return null
	}

	const buildPayload = (): QuizPayload => {
		const parsedOrder = orderNumber ? Number(orderNumber) : undefined
		const parsedMaxAttempts = maxAttempts ? Number(maxAttempts) : undefined
		const parsedPassingScore = passingScore ? Number(passingScore) : undefined
		const parsedTimeLimit = timeLimit ? Number(timeLimit) : undefined

		const mappedQuestions: QuizQuestionPayload[] = questions.map((q, idx) => {
			const choiceOptions = q.options.map((opt, optionIndex) => ({
				text: opt.text.trim(),
				is_correct: opt.is_correct,
				order: optionIndex
			}))

			return {
				text: q.text.trim(),
				question_type: q.question_type,
				points: q.points,
				is_auto_graded: q.is_auto_graded,
				order_number: idx + 1,
				options: choiceOptions
			}
		})

		return {
			title: title.trim(),
			description: description.trim(),
			quiz_type: quizType,
			max_attempts: parsedMaxAttempts,
			passing_score: parsedPassingScore,
			time_limit_minutes: parsedTimeLimit,
			entity_type: 'topic',
			quizable_id: topicId,
			order_number: parsedOrder,
			questions: mappedQuestions,
			is_published: 1
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const validationError = validate()
		if (validationError) {
			setError(validationError)
			return
		}

		setError(null)
		setSaving(true)
		try {
			const payload = buildPayload()
			await onSubmit(payload)
		} catch {
			setError('Ошибка при сохранении теста')
		} finally {
			setSaving(false)
		}
	}

	const questionTypeLabels = useMemo(
		() => ({
			single_choice: 'Одиночный выбор',
			multiple_choice: 'Множественный выбор'
		}),
		[]
	)

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Название теста *
					</label>
					<input
						type='text'
						value={title}
						onChange={e => setTitle(e.target.value)}
						disabled={isLoading || saving}
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
						placeholder='Введите название теста'
						required
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Тип теста
					</label>
					<select
						value='additional'
						disabled
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					>
						<option value='additional'>Дополнительный</option>
					</select>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Максимум попыток
					</label>
					<input
						type='number'
						min={1}
						value={maxAttempts}
						onChange={e => setMaxAttempts(e.target.value)}
						disabled={isLoading || saving}
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Проходной балл (%)
					</label>
					<input
						type='number'
						min={1}
						max={100}
						value={passingScore}
						onChange={e => setPassingScore(e.target.value)}
						disabled={isLoading || saving}
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Лимит времени (мин)
					</label>
					<input
						type='number'
						min={1}
						value={timeLimit}
						onChange={e => setTimeLimit(e.target.value)}
						disabled={isLoading || saving}
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Порядок вывода (опционально)
					</label>
					<input
						type='number'
						min={1}
						value={orderNumber}
						onChange={e => setOrderNumber(e.target.value)}
						disabled={isLoading || saving}
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					/>
				</div>
			</div>

			{uploadedImages.length > 0 && (
				<UploadedImagesDisplay
					images={uploadedImages}
					message='Все изображения успешно загружены и сохранены в тесте.'
					isLoading={isLoading || saving}
					onDeleteImage={onDeleteImage}
				/>
			)}

			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Описание
				</label>
				<div className='border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden'>
					<MarkdownEditor
						value={description}
						style={{ height: '300px' }}
						onChange={({ text }) => setDescription(text)}
						onImageUpload={handleImageUpload}
						renderHTML={text => (
							<div className='markdown-preview'>
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									components={{
										ol: props => (
											<ol
												style={{
													listStyle: 'decimal',
													paddingLeft: '1.5rem',
													marginTop: '0.5rem',
													marginBottom: '0.5rem'
												}}
												{...props}
											/>
										),
										ul: props => (
											<ul
												style={{
													listStyle: 'disc',
													paddingLeft: '1.5rem',
													marginTop: '0.5rem',
													marginBottom: '0.5rem'
												}}
												{...props}
											/>
										)
									}}
								>
									{text}
								</ReactMarkdown>
							</div>
						)}
						config={{
							view: { menu: true, md: true, html: false },
							canView: {
								menu: true,
								md: true,
								html: true,
								fullScreen: true,
								hideMenu: true
							}
						}}
					/>
				</div>
				<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
					Поддерживается Markdown для форматирования описания и добавления
					картинок.
				</p>
			</div>

			<div className='flex items-center justify-between'>
				<h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
					Вопросы
				</h3>
				<div className='flex gap-2'>
					<button
						type='button'
						onClick={() => handleAddQuestion('single_choice')}
						disabled={isLoading || saving}
						className='px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'
					>
						Добавить (одиночный)
					</button>
					<button
						type='button'
						onClick={() => handleAddQuestion('multiple_choice')}
						disabled={isLoading || saving}
						className='px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50'
					>
						Добавить (множественный)
					</button>
				</div>
			</div>

			<div className='space-y-4'>
				{questions.map((question, idx) => (
					<div
						key={question.id}
						className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/40'
					>
						<div className='flex items-start justify-between gap-2 mb-3'>
							<div className='space-y-2 flex-1'>
								<div className='flex flex-wrap gap-3'>
									<span className='inline-flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium'>
										Вопрос {idx + 1}
									</span>
									<select
										value={question.question_type}
										onChange={e =>
											updateQuestion(question.id, () =>
												createQuestionState(
													e.target.value as 'single_choice' | 'multiple_choice'
												)
											)
										}
										disabled={isLoading || saving}
										className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm'
									>
										{(
											Object.keys(questionTypeLabels) as Array<
												'single_choice' | 'multiple_choice'
											>
										).map(type => (
											<option key={type} value={type}>
												{questionTypeLabels[type]}
											</option>
										))}
									</select>
								</div>
								<input
									type='text'
									value={question.text}
									onChange={e =>
										updateQuestion(question.id, q => ({
											...q,
											text: e.target.value
										}))
									}
									disabled={isLoading || saving}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
									placeholder='Текст вопроса'
								/>
							</div>
							<div className='flex gap-2'>
								<div className='w-32'>
									<label className='block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1'>
										Баллы
									</label>
									<input
										type='number'
										min={1}
										value={question.points}
										onChange={e =>
											updateQuestion(question.id, q => ({
												...q,
												points: Number(e.target.value)
											}))
										}
										disabled={isLoading || saving}
										className='w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white'
									/>
								</div>
								<label className='inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200'>
									<input
										type='checkbox'
										checked={question.is_auto_graded}
										onChange={e =>
											updateQuestion(question.id, q => ({
												...q,
												is_auto_graded: e.target.checked
											}))
										}
										disabled={isLoading || saving}
										className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
									/>
									Автопроверка
								</label>
							</div>
							<button
								type='button'
								onClick={() => handleRemoveQuestion(question.id)}
								disabled={questions.length === 1 || isLoading || saving}
								className='text-red-600 hover:text-red-700 text-sm'
							>
								Удалить
							</button>
						</div>

						<div className='space-y-2'>
							{question.options.map((option, optionIdx) => (
								<div
									key={option.id}
									className='flex items-center gap-3 bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3'
								>
									<input
										type={
											question.question_type === 'single_choice'
												? 'radio'
												: 'checkbox'
										}
										checked={option.is_correct}
										onChange={e =>
											handleOptionChange(
												question.id,
												option.id,
												'is_correct',
												e.target.checked
											)
										}
										disabled={isLoading || saving}
										className='h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300'
										name={`correct-${question.id}`}
									/>
									<input
										type='text'
										value={option.text}
										onChange={e =>
											handleOptionChange(
												question.id,
												option.id,
												'text',
												e.target.value
											)
										}
										disabled={isLoading || saving}
										className='flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
										placeholder={`Вариант ${optionIdx + 1}`}
									/>
									<button
										type='button'
										onClick={() => handleRemoveOption(question.id, option.id)}
										disabled={
											question.options.length <= 2 || isLoading || saving
										}
										className='text-red-600 hover:text-red-700 text-sm'
									>
										Удалить
									</button>
								</div>
							))}
							<button
								type='button'
								onClick={() => handleAddOption(question.id)}
								disabled={isLoading || saving}
								className='px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
							>
								Добавить вариант
							</button>
						</div>
					</div>
				))}
			</div>

			{error && (
				<div className='p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm'>
					{error}
				</div>
			)}

			<div className='flex gap-3 justify-end pt-2'>
				<button
					type='button'
					onClick={onCancel}
					disabled={isLoading || saving}
					className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50'
				>
					Отмена
				</button>
				<button
					type='submit'
					disabled={isLoading || saving}
					className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50'
				>
					{saving ? 'Сохранение...' : 'Сохранить тест'}
				</button>
			</div>
		</form>
	)
}

import type { Quiz, QuizPayload } from '@/app/api/quizzes/quizzes.types'
import { useEffect, useState } from 'react'

interface Question {
	id?: number
	text: string
	maxLength?: number
	placeholder?: string
	points?: number
}

interface Props {
	topicId: number
	defaultOrderNumber?: number
	isLoading?: boolean
	onSubmit: (payload: QuizPayload) => Promise<void>
	onCancel: () => void
	initialValues?: Partial<Quiz>
}

export const InputAnswerForm = ({
	topicId,
	defaultOrderNumber,
	isLoading = false,
	onSubmit,
	onCancel,
	initialValues
}: Props) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [orderNumber, setOrderNumber] = useState('')
	const [timeLimit, setTimeLimit] = useState('')
	const [questions, setQuestions] = useState<Question[]>([
		{ text: '', maxLength: 1000, placeholder: '', points: 1 }
	])
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (orderNumber === '' && defaultOrderNumber)
			setOrderNumber(String(defaultOrderNumber))
	}, [defaultOrderNumber, orderNumber])

	useEffect(() => {
		if (!initialValues) return
		if (initialValues.title) setTitle(initialValues.title)
		if (initialValues.description) setDescription(initialValues.description)
		if (initialValues.order_number)
			setOrderNumber(String(initialValues.order_number))
		if (initialValues.time_limit_minutes)
			setTimeLimit(String(initialValues.time_limit_minutes * 60))

		// Загружаем вопросы из initialValues
		if (initialValues.questions && initialValues.questions.length > 0) {
			setQuestions(
				initialValues.questions.map(q => ({
					id: q.id,
					text: q.text,
					maxLength: q.max_length ?? undefined,
					placeholder: q.placeholder ?? undefined,
					points: q.points
				}))
			)
		}
	}, [initialValues])

	const handleQuestionChange = (
		index: number,
		field: keyof Question,
		value: string | number | undefined
	) => {
		const updated = [...questions]
		if (field === 'text') {
			updated[index].text = value as string
		} else if (field === 'maxLength') {
			updated[index].maxLength = value ? Number(value) : undefined
		} else if (field === 'placeholder') {
			updated[index].placeholder = value as string
		} else if (field === 'points') {
			updated[index].points = value ? Number(value) : undefined
		}
		setQuestions(updated)
	}

	const addQuestion = () => {
		setQuestions([
			...questions,
			{ text: '', maxLength: 1000, placeholder: '', points: 1 }
		])
	}

	const removeQuestion = (index: number) => {
		if (questions.length > 1) {
			setQuestions(questions.filter((_, i) => i !== index))
		}
	}

	const handleSubmit = async () => {
		if (!title.trim()) {
			setError('Заполните название теста')
			return
		}

		if (questions.some(q => !q.text.trim())) {
			setError('Все вопросы должны иметь текст')
			return
		}

		setError(null)
		setSaving(true)
		try {
			const payload: QuizPayload = {
				title,
				description,
				quiz_type: 'free-input',
				max_attempts: 1,
				passing_score: 0,
				time_limit_minutes: timeLimit
					? Math.floor(Number(timeLimit) / 60)
					: null,
				time_limit_seconds: timeLimit ? Number(timeLimit) : null,
				entity_type: 'topic',
				quizable_id: topicId,
				order_number: orderNumber ? Number(orderNumber) : undefined,
				questions: questions.map(q => ({
					text: q.text,
					question_type: 'free-input',
					points: q.points || 1,
					is_auto_graded: false,
					max_length: q.maxLength,
					placeholder: q.placeholder
				}))
			}
			await onSubmit(payload)
		} catch (e) {
			setError('Не удалось сохранить тест')
		} finally {
			setSaving(false)
		}
	}

	return (
		<div className='space-y-4'>
			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Название теста
				</label>
				<input
					type='text'
					className='w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
					value={title}
					onChange={e => setTitle(e.target.value)}
					disabled={isLoading || saving}
					placeholder='Clinical Case: Altitude Sickness'
				/>
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Описание
				</label>
				<textarea
					className='w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
					rows={2}
					value={description}
					onChange={e => setDescription(e.target.value)}
					disabled={isLoading || saving}
					placeholder='Описание для студентов'
				/>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Порядок
					</label>
					<input
						type='number'
						min={1}
						className='w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
						value={orderNumber}
						onChange={e => setOrderNumber(e.target.value)}
						disabled={isLoading || saving}
					/>
				</div>

				<div className='sm:col-span-2'>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Время на выполнение (сек)
					</label>
					<input
						type='number'
						min={0}
						className='w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
						value={timeLimit}
						onChange={e => setTimeLimit(e.target.value)}
						disabled={isLoading || saving}
						placeholder='1800 (30 минут)'
					/>
				</div>
			</div>

			{/* Вопросы */}
			<div className='border-t border-gray-300 dark:border-gray-600 pt-4'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
						Вопросы
					</h3>
					<button
						type='button'
						onClick={addQuestion}
						disabled={isLoading || saving}
						className='px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50'
					>
						+ Добавить вопрос
					</button>
				</div>

				<div className='space-y-4'>
					{questions.map((question, index) => (
						<div
							key={index}
							className='p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/30'
						>
							<div className='flex items-center justify-between mb-3'>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Вопрос {index + 1}
								</label>
								{questions.length > 1 && (
									<button
										type='button'
										onClick={() => removeQuestion(index)}
										disabled={isLoading || saving}
										className='text-sm text-red-600 hover:text-red-700 dark:text-red-400 disabled:opacity-50'
									>
										Удалить
									</button>
								)}
							</div>

							<textarea
								className='w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-2 mb-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								rows={2}
								value={question.text}
								onChange={e =>
									handleQuestionChange(index, 'text', e.target.value)
								}
								disabled={isLoading || saving}
								placeholder='Текст вопроса'
							/>

							<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3'>
								<div>
									<label className='block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1'>
										Макс. длина ответа
									</label>
									<input
										type='number'
										min={1}
										className='w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										value={question.maxLength || ''}
										onChange={e =>
											handleQuestionChange(
												index,
												'maxLength',
												e.target.value ? Number(e.target.value) : undefined
											)
										}
										disabled={isLoading || saving}
									/>
								</div>

								<div>
									<label className='block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1'>
										Баллы
									</label>
									<input
										type='number'
										min={1}
										className='w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										value={question.points || ''}
										onChange={e =>
											handleQuestionChange(
												index,
												'points',
												e.target.value ? Number(e.target.value) : undefined
											)
										}
										disabled={isLoading || saving}
									/>
								</div>
							</div>

							<div>
								<label className='block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1'>
									Подсказка (placeholder)
								</label>
								<input
									type='text'
									className='w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									value={question.placeholder || ''}
									onChange={e =>
										handleQuestionChange(index, 'placeholder', e.target.value)
									}
									disabled={isLoading || saving}
									placeholder='Пример: Укажите ключевые процессы'
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{error && (
				<div className='text-sm text-red-600 dark:text-red-400'>{error}</div>
			)}

			<div className='flex gap-3 justify-end border-t border-gray-300 dark:border-gray-600 pt-4'>
				<button
					type='button'
					onClick={onCancel}
					disabled={isLoading || saving}
					className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50'
				>
					Отмена
				</button>
				<button
					type='button'
					onClick={handleSubmit}
					disabled={isLoading || saving}
					className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50'
				>
					{saving ? 'Сохранение...' : 'Сохранить'}
				</button>
			</div>
		</div>
	)
}

import type { Quiz, QuizPayload } from '@/app/api/quizzes/quizzes.types'
import { useEffect, useState } from 'react'

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
	const [questionText, setQuestionText] = useState('')
	const [correctAnswer, setCorrectAnswer] = useState('')
	const [points, setPoints] = useState('1')
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
		const q = initialValues.questions?.[0]
		if (q?.text) setQuestionText(q.text)
		if (q?.metadata && (q.metadata as any).correct_answer)
			setCorrectAnswer((q.metadata as any).correct_answer)
		if (q?.points) setPoints(String(q.points))
	}, [initialValues])

	const handleSubmit = async () => {
		if (!title.trim() || !questionText.trim()) {
			setError('Заполните название и вопрос')
			return
		}
		setError(null)
		setSaving(true)
		try {
			const payload: QuizPayload = {
				title,
				description,
				quiz_type: 'input_answer',
				max_attempts: 1,
				passing_score: 0,
				time_limit_minutes: null as unknown as number,
				entity_type: 'topic',
				quizable_id: topicId,
				order_number: orderNumber ? Number(orderNumber) : undefined,
				questions: [
					{
						text: questionText,
						question_type: 'input_answer' as any,
						points: Number(points) || 1,
						is_auto_graded: true,
						metadata: { correct_answer: correctAnswer }
					}
				]
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
					className='w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
					value={title}
					onChange={e => setTitle(e.target.value)}
					disabled={isLoading || saving}
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
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Баллы
					</label>
					<input
						type='number'
						min={1}
						className='w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
						value={points}
						onChange={e => setPoints(e.target.value)}
						disabled={isLoading || saving}
					/>
				</div>
			</div>
			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Вопрос
				</label>
				<textarea
					className='w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
					rows={3}
					value={questionText}
					onChange={e => setQuestionText(e.target.value)}
					disabled={isLoading || saving}
				/>
			</div>
			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Правильный ответ
				</label>
				<input
					className='w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
					value={correctAnswer}
					onChange={e => setCorrectAnswer(e.target.value)}
					disabled={isLoading || saving}
					placeholder='Введите ожидаемый ответ'
				/>
			</div>
			{error && <div className='text-sm text-red-600'>{error}</div>}
			<div className='flex gap-3 justify-end'>
				<button
					onClick={onCancel}
					disabled={isLoading || saving}
					className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg'
				>
					Отмена
				</button>
				<button
					onClick={handleSubmit}
					disabled={isLoading || saving}
					className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
				>
					{saving ? 'Сохранение...' : 'Сохранить'}
				</button>
			</div>
		</div>
	)
}

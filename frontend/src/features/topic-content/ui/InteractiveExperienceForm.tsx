import type { Quiz, QuizPayload } from '@/app/api/quizzes/quizzes.types'
import { useEffect, useState } from 'react'

interface Props {
	topicId: number
	defaultOrderNumber?: number
	isLoading?: boolean
	onSubmit: (payload: QuizPayload) => Promise<void>
	onCancel: () => void
	initialValues?: Partial<Quiz> & { file_name?: string; game_path?: string }
}

export const InteractiveExperienceForm = ({
	topicId,
	defaultOrderNumber,
	isLoading = false,
	onSubmit,
	onCancel,
	initialValues
}: Props) => {
	const [title, setTitle] = useState('')
	const [orderNumber, setOrderNumber] = useState('')
	const [points, setPoints] = useState('1')
	const [fileName, setFileName] = useState('')
	const [gamePath, setGamePath] = useState('')
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (orderNumber === '' && defaultOrderNumber)
			setOrderNumber(String(defaultOrderNumber))
	}, [defaultOrderNumber, orderNumber])

	useEffect(() => {
		if (!initialValues) return
		console.log('📥 initialValues получены:', initialValues)
		if (initialValues.title) setTitle(initialValues.title)
		if (initialValues.order_number)
			setOrderNumber(String(initialValues.order_number))
		const q = initialValues.questions?.[0]
		if (q?.points) setPoints(String(q.points))
		// Загружаем file_name и game_path если они есть в initialValues
		if ('file_name' in initialValues) {
			const fn = (initialValues as any).file_name || ''
			console.log('📝 Загружаю file_name:', fn)
			setFileName(fn)
		}
		if ('game_path' in initialValues) {
			const gp = (initialValues as any).game_path || ''
			console.log('🎮 Загружаю game_path:', gp)
			setGamePath(gp)
		}
	}, [initialValues])

	const handleSubmit = async () => {
		if (!title.trim()) {
			setError('Заполните название')
			return
		}
		setError(null)
		setSaving(true)
		try {
			const payload: QuizPayload = {
				title,
				description: '',
				quiz_type: 'additional',
				max_attempts: 1,
				passing_score: 0,
				time_limit_minutes: null as unknown as number,
				entity_type: 'topic',
				quizable_id: topicId,
				order_number: orderNumber ? Number(orderNumber) : undefined,
				questions: [
					{
						text: title,
						question_type: 'single_choice' as any,
						points: Number(points) || 1,
						is_auto_graded: false
					}
				],
				file_name: fileName,
				game_path: gamePath
			}
			console.log('📤 Отправляю payload:', payload)
			console.log('📝 fileName:', fileName, 'gamePath:', gamePath)
			await onSubmit(payload)
		} catch (e) {
			console.error('❌ Ошибка при сохранении:', e)
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
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Название игры (file_name)
					</label>
					<input
						className='w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
						placeholder='build_lab2'
						value={fileName}
						onChange={e => setFileName(e.target.value)}
						disabled={isLoading || saving}
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Путь к игре (game_path)
					</label>
					<input
						className='w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
						placeholder='/games/build_lab2/index.html'
						value={gamePath}
						onChange={e => setGamePath(e.target.value)}
						disabled={isLoading || saving}
					/>
				</div>
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

import { useEffect, useState } from 'react'

export interface TopicFormValues {
	title: string
	description?: string
	order_number: number
	is_published?: boolean
	cover_image?: File
}

interface TopicFormProps {
	initialValues?: Partial<TopicFormValues>
	defaultOrderNumber?: number
	isLoading?: boolean
	onSubmit: (values: TopicFormValues) => Promise<void>
	onCancel: () => void
}

export const TopicForm = ({
	initialValues,
	defaultOrderNumber,
	isLoading = false,
	onSubmit,
	onCancel
}: TopicFormProps) => {
	const [title, setTitle] = useState(initialValues?.title ?? '')
	const [description, setDescription] = useState(
		initialValues?.description ?? ''
	)
	const [orderNumber, setOrderNumber] = useState<string>('')
	const [isPublished, setIsPublished] = useState<boolean>(
		initialValues?.is_published ?? false
	)
	const [coverFile, setCoverFile] = useState<File | null>(null)
	const [coverPreview, setCoverPreview] = useState<string | null>(null)
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (
			!initialValues?.order_number &&
			defaultOrderNumber &&
			orderNumber === ''
		) {
			setOrderNumber(String(defaultOrderNumber))
		} else if (initialValues?.order_number !== undefined) {
			setOrderNumber(String(initialValues.order_number))
		}
	}, [defaultOrderNumber, initialValues?.order_number])

	const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setCoverFile(file)
			const reader = new FileReader()
			reader.onloadend = () => {
				setCoverPreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!title.trim()) {
			setError('Название темы обязательно')
			return
		}
		const parsedOrder = parseInt(orderNumber, 10)
		if (Number.isNaN(parsedOrder) || parsedOrder < 1) {
			setError('Поле "Порядок" обязательно и должно быть >= 1')
			return
		}
		setError(null)
		setSaving(true)
		try {
			await onSubmit({
				title: title.trim(),
				description: description.trim() || undefined,
				order_number: parsedOrder,
				is_published: isPublished,
				cover_image: coverFile || undefined
			})
		} catch {
			setError('Ошибка при сохранении темы')
		} finally {
			setSaving(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
					Название темы *
				</label>
				<input
					type='text'
					value={title}
					onChange={e => setTitle(e.target.value)}
					disabled={isLoading || saving}
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					placeholder='Введите название темы'
					required
				/>
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
					Описание
				</label>
				<textarea
					value={description}
					onChange={e => setDescription(e.target.value)}
					disabled={isLoading || saving}
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					placeholder='Опишите содержание темы'
					rows={3}
				/>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Порядок *
					</label>
					<input
						type='number'
						value={orderNumber}
						onChange={e => setOrderNumber(e.target.value)}
						disabled={isLoading || saving}
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
						min={1}
						required
					/>
				</div>
				<div className='flex items-center gap-3 pt-6'>
					<input
						id='isPublished'
						type='checkbox'
						checked={isPublished}
						onChange={e => setIsPublished(e.target.checked)}
						disabled={isLoading || saving}
						className='h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500'
					/>
					<label
						htmlFor='isPublished'
						className='text-sm text-gray-700 dark:text-gray-300'
					>
						Опубликована
					</label>
				</div>
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
					Обложка темы
				</label>
				<div className='flex gap-4'>
					<div className='flex-1'>
						<input
							type='file'
							accept='image/*'
							onChange={handleCoverChange}
							disabled={isLoading || saving}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
						/>
						<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
							JPG, PNG, GIF или WebP до 5 МБ
						</p>
					</div>
					{coverPreview && (
						<div className='w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600'>
							<img
								src={coverPreview}
								alt='Cover preview'
								className='w-full h-full object-cover'
							/>
						</div>
					)}
				</div>
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
					{saving ? 'Сохранение...' : initialValues ? 'Обновить' : 'Добавить'}
				</button>
			</div>
		</form>
	)
}

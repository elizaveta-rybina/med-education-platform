import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MarkdownEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import remarkGfm from 'remark-gfm'

export interface LectureFormValues {
	title: string
	content: string
	order_number: number
	content_type?: 'markdown' | 'html' | 'plaintext'
}

interface LectureFormProps {
	initialValues?: Partial<LectureFormValues>
	defaultOrderNumber?: number
	isLoading?: boolean
	onSubmit: (values: LectureFormValues) => Promise<void>
	onCancel: () => void
	onImageUpload?: (file: File) => Promise<string>
	uploadedImages?: Array<{ id: number; url: string; filename: string }>
}

export const LectureForm = ({
	initialValues,
	defaultOrderNumber,
	isLoading = false,
	onSubmit,
	onCancel,
	onImageUpload,
	uploadedImages = []
}: LectureFormProps) => {
	const [title, setTitle] = useState(initialValues?.title ?? '')
	const [content, setContent] = useState(initialValues?.content ?? '')
	const [orderNumber, setOrderNumber] = useState<string>('')
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

	const handleEditorChange = ({ text }: { text: string }) => {
		setContent(text)
	}

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!title.trim()) {
			setError('Название лекции обязательно')
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
				content: content.trim() || '',
				order_number: parsedOrder,
				content_type: 'markdown'
			})
		} catch {
			setError('Ошибка при сохранении лекции')
		} finally {
			setSaving(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
					Название лекции *
				</label>
				<input
					type='text'
					value={title}
					onChange={e => setTitle(e.target.value)}
					disabled={isLoading || saving}
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					placeholder='Введите название лекции'
					required
				/>
			</div>

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

			{uploadedImages.length > 0 && (
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						✓ Загруженные изображения ({uploadedImages.length})
					</label>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
						{uploadedImages.map(image => (
							<div
								key={image.id}
								className='relative group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:ring-2 hover:ring-green-500 transition-all'
							>
								<img
									src={image.url}
									alt={image.filename}
									className='w-full h-32 object-cover'
									onError={() => {
										console.error(
											`Не удалось загрузить изображение: ${image.url}`
										)
									}}
								/>
								<div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center'>
									<div className='text-white text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity px-2'>
										{image.filename}
									</div>
								</div>
								<div className='absolute top-1 right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'>
									✓ Сохранено
								</div>
							</div>
						))}
					</div>
					<p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>
						Все изображения успешно загружены и сохранены в лекции.
					</p>
				</div>
			)}

			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
					Содержание лекции (Markdown)
				</label>
				<div className='border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden'>
					<MarkdownEditor
						value={content}
						style={{ height: '500px' }}
						onChange={handleEditorChange}
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
						onImageUpload={handleImageUpload}
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
					Поддерживается Markdown. Вы можете вставлять изображения через кнопку
					загрузки.
				</p>
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

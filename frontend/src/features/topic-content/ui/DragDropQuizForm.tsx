import type {
	Quiz,
	QuizPayload,
	QuizQuestionPayload,
	QuizTableMetadataColumn,
	QuizType
} from '@/app/api/quizzes/quizzes.types'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MarkdownEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import remarkGfm from 'remark-gfm'
import { UploadedImagesDisplay } from './UploadedImagesDisplay'

interface DragDropQuizFormProps {
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

type OptionState = {
	id: string
	text: string
	originalDbId?: number // ID из БД при загрузке
}

type TableRowState = {
	id: string
	cells: string[]
	correctOptions: string[]
	answerMode: 'all' | 'any' // 'all' = AND (все ответы), 'any' = OR (любой ответ)
}

type TableQuestionState = {
	id: string
	points: number
	is_auto_graded: boolean
	options: OptionState[]
	columns: QuizTableMetadataColumn[]
	tableRows: TableRowState[]
}

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

const createDefaultColumns = (count: number): QuizTableMetadataColumn[] => {
	const types: Array<'text' | 'multi_select'> = []
	for (let i = 0; i < count - 1; i++) {
		types.push('text')
	}
	types.push('multi_select')

	return Array.from({ length: count }, (_, i) => ({
		name: `Колонка ${i + 1}`,
		type: types[i]
	}))
}

export const DragDropQuizForm = ({
	topicId,
	defaultOrderNumber,
	isLoading = false,
	onSubmit,
	onCancel,
	initialValues,
	onImageUpload,
	onDeleteImage,
	uploadedImages = []
}: DragDropQuizFormProps) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [quizType, setQuizType] = useState<QuizType>('topic_final')
	const [maxAttempts, setMaxAttempts] = useState('1')
	const [passingScore, setPassingScore] = useState('80')
	const [timeLimit, setTimeLimit] = useState('30')
	const [orderNumber, setOrderNumber] = useState('')
	const [question, setQuestion] = useState<TableQuestionState>({
		id: generateId(),
		points: 1,
		is_auto_graded: true,
		options: [
			{ id: generateId(), text: 'Опция 1' },
			{ id: generateId(), text: 'Опция 2' },
			{ id: generateId(), text: 'Опция 3' }
		],
		columns: createDefaultColumns(3),
		tableRows: [
			{
				id: generateId(),
				cells: ['', '', ''],
				correctOptions: [],
				answerMode: 'all'
			}
		]
	})
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

		// Загружаем вопрос-таблицу, если есть
		if (initialValues.questions && initialValues.questions.length > 0) {
			const q = initialValues.questions[0]
			const meta =
				typeof (q as any).metadata === 'string'
					? JSON.parse((q as any).metadata as string)
					: (q as any).metadata || {}
			const options: OptionState[] = (q.options || []).map((opt: any) => ({
				id: generateId(),
				text: opt.text || '',
				originalDbId: opt.id // Сохраняем исходный ID из БД
			}))

			const columns: QuizTableMetadataColumn[] =
				meta.columns || createDefaultColumns(3)

			const tableRows: TableRowState[] = (meta.rows || []).map((row: any) => {
				const correctOptionValues = row.correct_option_ids || []
				// Сопоставляем correct_option_ids с опциями
				// Это может быть либо индекс (0, 1, 2...), либо БД ID (106, 107...)
				const correctOptions = correctOptionValues
					.map((value: number) => {
						// Сначала пробуем найти по originalDbId (если это старые данные с БД ID)
						const byDbId = options.find(opt => opt.originalDbId === value)
						if (byDbId) return byDbId.id

						// Иначе используем как индекс (для новых опций)
						const byIndex = options[value]
						return byIndex?.id || ''
					})
					.filter((id: string) => id !== '')

				return {
					id: generateId(),
					cells: row.cells.map((cell: unknown) => {
						// Если это объект (новая структура), достаем value
						if (typeof cell === 'object' && cell !== null && 'value' in cell) {
							return (cell as any).value
						}
						// Если это строка (старая структура), используем как есть
						return Array.isArray(cell) ? '' : String(cell)
					}),
					correctOptions,
					answerMode: (row.answer_mode as 'all' | 'any') || 'all'
				}
			})

			setQuestion({
				id: generateId(),
				points: q.points || 1,
				is_auto_graded: q.is_auto_graded ?? true,
				options,
				columns,
				tableRows
			})
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

	const handleAddColumn = () => {
		const newColumnType: 'text' | 'multi_select' =
			question.columns.length === 0
				? 'text'
				: question.columns[question.columns.length - 1].type === 'multi_select'
				? 'text'
				: 'multi_select'

		setQuestion(prev => ({
			...prev,
			columns: [
				...prev.columns,
				{ name: `Колонка ${prev.columns.length + 1}`, type: newColumnType }
			],
			tableRows: prev.tableRows.map(row => ({
				...row,
				cells: [...row.cells, '']
			}))
		}))
	}

	const handleRemoveColumn = (index: number) => {
		if (question.columns.length <= 1) return

		setQuestion(prev => ({
			...prev,
			columns: prev.columns.filter((_, i) => i !== index),
			tableRows: prev.tableRows.map(row => ({
				...row,
				cells: row.cells.filter((_, i) => i !== index)
			}))
		}))
	}

	const handleColumnChange = (
		index: number,
		field: 'name' | 'type',
		value: string
	) => {
		setQuestion(prev => {
			const updatedColumns = [...prev.columns]
			updatedColumns[index] = {
				...updatedColumns[index],
				[field]:
					field === 'type' ? (value as QuizTableMetadataColumn['type']) : value
			}
			return { ...prev, columns: updatedColumns }
		})
	}

	const handleAddOption = () => {
		setQuestion(prev => ({
			...prev,
			options: [
				...prev.options,
				{ id: generateId(), text: `Опция ${prev.options.length + 1}` }
			]
		}))
	}

	const handleRemoveOption = (optionId: string) => {
		setQuestion(prev => ({
			...prev,
			options: prev.options.filter(opt => opt.id !== optionId),
			tableRows: prev.tableRows.map(row => ({
				...row,
				correctOptions: row.correctOptions.filter(id => id !== optionId)
			}))
		}))
	}

	const handleOptionChange = (optionId: string, text: string) => {
		setQuestion(prev => ({
			...prev,
			options: prev.options.map(opt =>
				opt.id === optionId ? { ...opt, text } : opt
			)
		}))
	}

	const handleAddRow = () => {
		setQuestion(prev => ({
			...prev,
			tableRows: [
				...prev.tableRows,
				{
					id: generateId(),
					cells: new Array(prev.columns.length).fill(''),
					correctOptions: [],
					answerMode: 'all'
				}
			]
		}))
	}

	const handleRemoveRow = (rowId: string) => {
		setQuestion(prev => ({
			...prev,
			tableRows: prev.tableRows.filter(row => row.id !== rowId)
		}))
	}

	const handleRowCellChange = (
		rowId: string,
		cellIndex: number,
		value: string
	) => {
		setQuestion(prev => ({
			...prev,
			tableRows: prev.tableRows.map(row =>
				row.id === rowId
					? {
							...row,
							cells: row.cells.map((cell, idx) =>
								idx === cellIndex ? value : cell
							)
					  }
					: row
			)
		}))
	}

	const handleRowCorrectOptionsChange = (rowId: string, value: string[]) => {
		setQuestion(prev => ({
			...prev,
			tableRows: prev.tableRows.map(row =>
				row.id === rowId ? { ...row, correctOptions: value } : row
			)
		}))
	}

	const handleRowAnswerModeChange = (rowId: string, mode: 'all' | 'any') => {
		setQuestion(prev => ({
			...prev,
			tableRows: prev.tableRows.map(row =>
				row.id === rowId ? { ...row, answerMode: mode } : row
			)
		}))
	}

	const validate = (): string | null => {
		if (!title.trim()) return 'Название теста обязательно'
		if (question.options.length === 0) return 'Добавьте хотя бы одну опцию'
		if (question.tableRows.length === 0) return 'Добавьте хотя бы одну строку'
		if (question.columns.length === 0) return 'Добавьте хотя бы одну колонку'
		if (question.points <= 0) return 'Баллы за вопрос должны быть > 0'
		return null
	}

	const buildPayload = (): QuizPayload => {
		const parsedOrder = orderNumber ? Number(orderNumber) : undefined
		const parsedMaxAttempts = maxAttempts ? Number(maxAttempts) : undefined
		const parsedPassingScore = passingScore ? Number(passingScore) : undefined
		const parsedTimeLimit = timeLimit ? Number(timeLimit) : undefined

		const tableOptions = question.options.map((opt, optionIndex) => ({
			text: opt.text.trim(),
			order: optionIndex
		}))

		const questionPayload: QuizQuestionPayload = {
			text: title.trim(),
			question_type: 'table',
			points: question.points,
			is_auto_graded: question.is_auto_graded,
			order_number: 1,
			options: tableOptions,
			metadata: JSON.stringify({
				columns: question.columns.map(col => ({
					name: col.name.trim(),
					type: col.type
				})),
				rows: question.tableRows.map(row => {
					const correctOptionIds = row.correctOptions
						.map((optId: string) => {
							// Находим индекс опции в массиве - всегда используем индекс
							const optionIndex = question.options.findIndex(
								o => o.id === optId
							)
							return optionIndex >= 0 ? optionIndex : -1
						})
						.filter((index: number) => index >= 0)

					return {
						cells: row.cells.map((cell, cellIndex) => {
							const column = question.columns[cellIndex]
							const cellValue =
								typeof cell === 'string' ? cell.trim() : String(cell)
							const cellObj: any = {
								type: column?.type || 'text',
								value: cellValue
							}

							// Если это select ячейка и она содержит правильные ответы
							if (
								column?.type === 'multi_select' &&
								correctOptionIds.length > 0
							) {
								cellObj.available_option_ids = Array.from(
									{ length: question.options.length },
									(_, i) => i
								)
								cellObj.correct_answers = {
									[cellIndex]: correctOptionIds
								}
							}

							return cellObj
						}),
						correct_option_ids: correctOptionIds,
						answer_mode: row.answerMode
					}
				})
			})
		}

		return {
			title: title.trim(),
			description: description.trim(),
			quiz_type: quizType as QuizType,
			max_attempts: parsedMaxAttempts,
			passing_score: parsedPassingScore,
			time_limit_minutes: parsedTimeLimit,
			entity_type: 'topic',
			quizable_id: topicId,
			order_number: parsedOrder,
			questions: [questionPayload],
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

			<div className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/40'>
				<div className='flex items-center justify-between mb-3'>
					<h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
						Настройки таблицы drag & drop
					</h3>
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
									setQuestion(prev => ({
										...prev,
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
									setQuestion(prev => ({
										...prev,
										is_auto_graded: e.target.checked
									}))
								}
								disabled={isLoading || saving}
								className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
							/>
							Автопроверка
						</label>
					</div>
				</div>

				{/* Колонки */}
				<div className='mb-4'>
					<div className='flex items-center justify-between mb-2'>
						<h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
							Колонки таблицы
						</h4>
						<button
							type='button'
							onClick={handleAddColumn}
							disabled={isLoading || saving}
							className='px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'
						>
							Добавить колонку
						</button>
					</div>
					<div className='space-y-2'>
						{question.columns.map((column, idx) => (
							<div
								key={idx}
								className='flex items-center gap-2 bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-2'
							>
								<input
									type='text'
									value={column.name}
									onChange={e =>
										handleColumnChange(idx, 'name', e.target.value)
									}
									disabled={isLoading || saving}
									className='flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
									placeholder={`Название колонки ${idx + 1}`}
								/>
								<select
									value={column.type}
									onChange={e =>
										handleColumnChange(idx, 'type', e.target.value)
									}
									disabled={isLoading || saving}
									className='px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white'
								>
									<option value='text'>Текст</option>
									<option value='multi_select'>Мульти-выбор</option>
								</select>
								<button
									type='button'
									onClick={() => handleRemoveColumn(idx)}
									disabled={question.columns.length <= 1 || isLoading || saving}
									className='text-red-600 hover:text-red-700 text-sm disabled:opacity-50'
								>
									Удалить
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Опции для drag & drop */}
				<div className='mb-4'>
					<div className='flex items-center justify-between mb-2'>
						<h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
							Варианты для перетаскивания
						</h4>
						<button
							type='button'
							onClick={handleAddOption}
							disabled={isLoading || saving}
							className='px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50'
						>
							Добавить опцию
						</button>
					</div>
					<div className='space-y-2'>
						{question.options.map((option, idx) => (
							<div
								key={option.id}
								className='flex items-center gap-2 bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-2'
							>
								<span className='text-sm text-gray-600 dark:text-gray-400 w-8'>
									{idx + 1}.
								</span>
								<input
									type='text'
									value={option.text}
									onChange={e => handleOptionChange(option.id, e.target.value)}
									disabled={isLoading || saving}
									className='flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
									placeholder={`Опция ${idx + 1}`}
								/>
								<button
									type='button'
									onClick={() => handleRemoveOption(option.id)}
									disabled={isLoading || saving}
									className='text-red-600 hover:text-red-700 text-sm'
								>
									Удалить
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Строки таблицы */}
				<div>
					<div className='flex items-center justify-between mb-2'>
						<h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
							Строки таблицы
						</h4>
						<button
							type='button'
							onClick={handleAddRow}
							disabled={isLoading || saving}
							className='px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50'
						>
							Добавить строку
						</button>
					</div>
					<div className='space-y-3'>
						{question.tableRows.map((row, rowIdx) => (
							<div
								key={row.id}
								className='bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3'
							>
								<div className='flex items-center justify-between mb-2'>
									<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
										Строка {rowIdx + 1}
									</span>
									<button
										type='button'
										onClick={() => handleRemoveRow(row.id)}
										disabled={isLoading || saving}
										className='text-red-600 hover:text-red-700 text-sm'
									>
										Удалить строку
									</button>
								</div>
								<div className='space-y-2'>
									{row.cells.map((cell, cellIdx) => (
										<div key={cellIdx}>
											<label className='block text-xs text-gray-600 dark:text-gray-400 mb-1'>
												{question.columns[cellIdx]?.name ||
													`Колонка ${cellIdx + 1}`}
											</label>
											<input
												type='text'
												value={cell}
												onChange={e =>
													handleRowCellChange(row.id, cellIdx, e.target.value)
												}
												disabled={isLoading || saving}
												className='w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
												placeholder={`Значение для ${
													question.columns[cellIdx]?.name ||
													`колонки ${cellIdx + 1}`
												}`}
											/>
										</div>
									))}
									<div className='space-y-2 pt-2 border-t border-gray-300 dark:border-gray-600'>
										<div>
											<label className='block text-xs text-gray-600 dark:text-gray-400 mb-2'>
												Режим проверки ответов
											</label>
											<div className='flex gap-3'>
												<label className='inline-flex items-center gap-2'>
													<input
														type='radio'
														name={`answerMode_${row.id}`}
														value='all'
														checked={row.answerMode === 'all'}
														onChange={() =>
															handleRowAnswerModeChange(row.id, 'all')
														}
														disabled={isLoading || saving}
														className='rounded-full border-gray-300 text-purple-600 focus:ring-purple-500'
													/>
													<span className='text-xs text-gray-700 dark:text-gray-300'>
														Все ответы (И)
													</span>
												</label>
												<label className='inline-flex items-center gap-2'>
													<input
														type='radio'
														name={`answerMode_${row.id}`}
														value='any'
														checked={row.answerMode === 'any'}
														onChange={() =>
															handleRowAnswerModeChange(row.id, 'any')
														}
														disabled={isLoading || saving}
														className='rounded-full border-gray-300 text-purple-600 focus:ring-purple-500'
													/>
													<span className='text-xs text-gray-700 dark:text-gray-300'>
														Любой ответ (ИЛИ)
													</span>
												</label>
											</div>
											<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
												{row.answerMode === 'all'
													? '✓ Правильны только если выбраны все эти опции'
													: '✓ Правильны если выбрана хотя бы одна из этих опций'}
											</p>
										</div>
										<div>
											<label className='block text-xs text-gray-600 dark:text-gray-400 mb-1'>
												Правильные опции для этой строки
											</label>
											<select
												multiple
												value={row.correctOptions}
												onChange={e =>
													handleRowCorrectOptionsChange(
														row.id,
														Array.from(
															e.target.selectedOptions,
															option => option.value
														)
													)
												}
												disabled={isLoading || saving}
												className='w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
												size={Math.min(question.options.length, 5)}
											>
												{question.options.map(option => (
													<option key={option.id} value={option.id}>
														{option.text}
													</option>
												))}
											</select>
											<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
												Удерживайте Ctrl/Cmd для выбора нескольких
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{error && (
				<div className='p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm'>
					{error}
				</div>
			)}

			<div className='flex items-center gap-4 pt-4'>
				<button
					type='submit'
					disabled={isLoading || saving}
					className='px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
				>
					{saving ? 'Сохранение...' : 'Сохранить тест'}
				</button>
				<button
					type='button'
					onClick={onCancel}
					disabled={saving}
					className='px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50'
				>
					Отмена
				</button>
			</div>
		</form>
	)
}

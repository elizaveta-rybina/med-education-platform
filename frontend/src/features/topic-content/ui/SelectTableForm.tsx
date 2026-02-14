import { quizzesApi } from '@/app/api/quizzes/quizzes.api'
import type { Quiz, QuizPayload } from '@/app/api/quizzes/quizzes.types'
import React, { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MarkdownEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import remarkGfm from 'remark-gfm'
import { UploadedImagesDisplay } from './UploadedImagesDisplay'

// --- Types ---

interface SelectTableFormProps {
	topicId: number
	defaultOrderNumber: number
	isLoading: boolean
	onSubmit: (payload: QuizPayload) => Promise<void>
	onCancel: () => void
	initialValues?: Quiz
	onImageUpload?: (file: File) => Promise<string>
	onDeleteImage?: (imageId: number) => Promise<void>
	uploadedImages?: Array<{ id: number; url: string; filename: string }>
}

type ColumnType = 'text' | 'select'

interface Column {
	id: string
	name: string
	type: ColumnType
}

interface Cell {
	type: ColumnType
	value?: string
	cell_key?: string
	available_option_ids?: number[]
}

interface Row {
	id: string
	cells: Cell[]
	correct_answers?: Record<string, number[]>
}

interface Option {
	id: string
	text: string
	order: number // В нашем случае это будет выступать как "Internal ID"
}

interface MetaDataStructure {
	columns: { name: string; type: string }[]
	rows: {
		cells: Cell[]
		// Бэкенд возвращает правильные ответы именно в correct_answers, а не в _ui_...
		correct_answers?: Record<string, number[]>
		correct_option_ids?: number[]
	}[]
}

// --- Helpers ---

const generateId = (prefix: string, items: { id: string }[]): string => {
	const maxId = items.reduce((max, item) => {
		const num = parseInt(item.id.split('_')[1] || '0', 10)
		return num > max ? num : max
	}, -1)
	return `${prefix}_${maxId + 1}`
}

const safeJsonParse = <T,>(jsonString: string | any, fallback: T): T => {
	if (typeof jsonString !== 'string') return jsonString || fallback
	try {
		return JSON.parse(jsonString)
	} catch (e) {
		console.warn('Failed to parse metadata JSON', e)
		return fallback
	}
}

// --- Component ---

export const SelectTableForm: React.FC<SelectTableFormProps> = ({
	topicId,
	defaultOrderNumber,
	isLoading,
	onSubmit,
	onCancel,
	initialValues,
	onImageUpload,
	onDeleteImage,
	uploadedImages = []
}) => {
	// -- State Initialization --
	const [title, setTitle] = useState(initialValues?.title || '')
	const [description, setDescription] = useState(
		initialValues?.description || ''
	)
	const [error, setError] = useState<string | null>(null)

	const [selectedCell, setSelectedCell] = useState<{
		rowId: string
		cellIndex: number
	} | null>(null)

	// 1. Columns
	const [columns, setColumns] = useState<Column[]>(() => {
		const meta = safeJsonParse<MetaDataStructure>(
			initialValues?.questions?.[0]?.metadata,
			{ columns: [], rows: [] }
		)
		if (meta?.columns && meta.columns.length > 0) {
			return meta.columns.map((col, idx) => ({
				id: `col_${idx}`,
				name: col.name || '',
				type: (col.type as ColumnType) || 'text'
			}))
		}
		return [
			{ id: 'col_0', name: 'Колонка 1', type: 'text' },
			{ id: 'col_1', name: 'Колонка 2', type: 'select' }
		]
	})

	// 2. Options
	const [options, setOptions] = useState<Option[]>(() => {
		if (initialValues?.questions?.[0]?.options) {
			return (initialValues.questions[0].options as any[]).map((opt, idx) => ({
				id: `opt_${idx}`,
				text: opt.text || '',
				// В options.order храним тот же порядок/ID, что и в metadata.available_option_ids
				order: opt.order ?? idx
			}))
		}
		return [
			{ id: 'opt_0', text: 'Опция 1', order: 0 },
			{ id: 'opt_1', text: 'Опция 2', order: 1 }
		]
	})

	// 3. Rows
	const [rows, setRows] = useState<Row[]>(() => {
		const meta = safeJsonParse<MetaDataStructure>(
			initialValues?.questions?.[0]?.metadata,
			{ columns: [], rows: [] }
		)

		if (meta?.rows && meta.rows.length > 0) {
			return meta.rows.map((row, idx) => ({
				id: `row_${idx}`,
				cells: row.cells || [],
				// !!! ИСПРАВЛЕНИЕ ЗДЕСЬ !!!
				// Бэкенд QuestionService сохраняет и возвращает данные в поле 'correct_answers'
				// Мы читаем его напрямую.
				correct_answers: row.correct_answers || {}
			}))
		}
		return [
			{
				id: 'row_0',
				cells: [
					{ type: 'text', value: 'Строка 1' },
					{ type: 'select', cell_key: 'row0_col1', available_option_ids: [0] }
				],
				correct_answers: { row0_col1: [0] }
			}
		]
	})

	// --- Helpers for Display ---
	const getOptionByOrder = (orderId: number) => {
		return options.find(o => o.order === orderId)
	}

	// --- Handlers ---

	const handleImageUpload = async (file: File): Promise<string> => {
		if (!onImageUpload) throw new Error('Image upload not configured')
		return await onImageUpload(file)
	}

	const handleAddColumn = () => {
		const newId = generateId('col', columns)
		setColumns([
			...columns,
			{ id: newId, name: `Колонка ${columns.length + 1}`, type: 'text' }
		])
		setRows(
			rows.map(row => ({
				...row,
				cells: [...row.cells, { type: 'text', value: '' }]
			}))
		)
	}

	const handleRemoveColumn = (colIndex: number) => {
		if (columns.length <= 1) return
		setColumns(columns.filter((_, idx) => idx !== colIndex))
		setRows(
			rows.map(row => ({
				...row,
				cells: row.cells.filter((_, idx) => idx !== colIndex)
			}))
		)
	}

	const handleUpdateColumn = (
		colIndex: number,
		field: keyof Column,
		value: string
	) => {
		const newColumns = [...columns]
		newColumns[colIndex] = { ...newColumns[colIndex], [field]: value }
		setColumns(newColumns)

		if (field === 'type') {
			const newType = value as ColumnType
			setRows(
				rows.map(row => {
					const newCells = [...row.cells]
					newCells[colIndex] = {
						type: newType,
						...(newType === 'text'
							? { value: '' }
							: { available_option_ids: [] })
					}
					return { ...row, cells: newCells }
				})
			)
		}
	}

	const handleAddRow = () => {
		const newId = generateId('row', rows)
		const newCells: Cell[] = columns.map(col => ({
			type: col.type,
			...(col.type === 'text' ? { value: '' } : { available_option_ids: [] })
		}))
		setRows([...rows, { id: newId, cells: newCells, correct_answers: {} }])
	}

	const handleRemoveRow = (rowIndex: number) => {
		if (rows.length <= 1) return
		setRows(rows.filter((_, idx) => idx !== rowIndex))
	}

	const handleUpdateCell = (
		rowIndex: number,
		cellIndex: number,
		field: keyof Cell,
		value: any
	) => {
		setRows(prevRows => {
			const newRows = [...prevRows]
			const cell = { ...newRows[rowIndex].cells[cellIndex] }

			if (field === 'value') cell.value = value
			if (field === 'available_option_ids') cell.available_option_ids = value

			newRows[rowIndex].cells[cellIndex] = cell
			return newRows
		})
	}

	const handleSetCorrectAnswer = (
		rowIndex: number,
		cellIndex: number,
		optionOrder: number
	) => {
		setRows(prevRows => {
			const newRows = [...prevRows]
			const currentRow = { ...newRows[rowIndex] }
			const cellKey = `row${rowIndex}_col${cellIndex}`

			const currentAnswers = currentRow.correct_answers?.[cellKey] || []
			const isSelected = currentAnswers.includes(optionOrder)

			const newAnswers = isSelected
				? currentAnswers.filter(id => id !== optionOrder)
				: [...currentAnswers, optionOrder]

			currentRow.correct_answers = {
				...currentRow.correct_answers,
				[cellKey]: newAnswers
			}

			newRows[rowIndex] = currentRow
			return newRows
		})
	}

	const handleAddOption = () => {
		const newId = generateId('opt', options)
		// Генерируем новый order: берем максимальный текущий order + 1
		// Это гарантирует, что мы не пересечемся с существующими ID базы данных (271, 272 и т.д.)
		const maxOrder = options.reduce(
			(max, o) => (o.order > max ? o.order : max),
			-1
		)
		const newOrder = maxOrder + 1

		setOptions([
			...options,
			{ id: newId, text: `Опция ${options.length + 1}`, order: newOrder }
		])
	}

	const handleUpdateOption = (
		index: number,
		field: keyof Option,
		value: any
	) => {
		const newOptions = [...options]
		newOptions[index] = { ...newOptions[index], [field]: value }
		setOptions(newOptions)
	}

	const handleRemoveOption = (index: number) => {
		setOptions(options.filter((_, idx) => idx !== index))
	}

	const handleSubmit = async () => {
		if (!title.trim()) return setError('Название теста обязательно')
		if (columns.length < 2) return setError('Минимум 2 колонки')
		if (rows.length < 1) return setError('Минимум 1 строка')
		if (options.length < 1) return setError('Минимум 1 опция')
		setError(null)

		// 1. Подготовка опций для отправки
		// order = index. Бэкенд будет использовать индексы массива (0, 1, 2) для маппинга.
		const payloadOptions = options.map(opt => ({
			text: opt.text,
			order: opt.order,
			is_correct: false,
			matching_data: null
		}))

		// 2. В available_option_ids и correct_answers пишем те же order, что в options.order
		const remapIds = (ids: number[] = []) => ids

		const payload: QuizPayload = {
			title,
			description: description.trim(),
			quiz_type: 'embedded',
			max_attempts: 3,
			passing_score: 70,
			time_limit_minutes: 30,
			entity_type: 'topic',
			quizable_id: topicId,
			order_number: defaultOrderNumber,
			questions: [
				{
					text: 'Заполните таблицу',
					question_type: 'ordering',
					is_auto_graded: true,
					points: 10,
					options: payloadOptions,
					metadata: JSON.stringify({
						columns: columns.map(col => ({ name: col.name, type: col.type })),
						rows: rows.map((row, rowIdx) => {
							// 3. Обработка ячеек
							const rowCells = row.cells.map((cell, cellIdx) => ({
								type: columns[cellIdx].type,
								value:
									columns[cellIdx].type === 'text'
										? cell.value || ''
										: undefined,
								cell_key:
									columns[cellIdx].type === 'select'
										? `row${rowIdx}_col${cellIdx}`
										: undefined,
								available_option_ids:
									columns[cellIdx].type === 'select'
										? remapIds(cell.available_option_ids)
										: undefined
							}))

							// 4. Пересчет ключей правильных ответов
							const remappedCorrectAnswers: Record<string, number[]> = {}
							if (row.correct_answers) {
								Object.entries(row.correct_answers).forEach(([key, ids]) => {
									const newIds = remapIds(ids)
									if (newIds.length > 0) {
										remappedCorrectAnswers[key] = newIds
									}
								})
							}

							// 5. Плоский массив для валидатора
							const flatCorrectIds = Object.values(
								remappedCorrectAnswers
							).flat()

							return {
								cells: rowCells,
								correct_answers: remappedCorrectAnswers,
								correct_option_ids: flatCorrectIds
							}
						})
					})
				}
			]
		}

		try {
			let response
			if (initialValues?.id) {
				response = await quizzesApi.update(initialValues.id, payload)
				console.log('✅ Ответ сервера (Update):', response)
			} else {
				response = await quizzesApi.create(payload)
				console.log('✅ Ответ сервера (Create):', response)
			}

			onSubmit(payload)
		} catch (error: any) {
			console.error('❌ Ошибка при сохранении:', error)
			const msg =
				error?.response?.data?.message ||
				error?.message ||
				'Ошибка при сохранении'
			setError(msg)
		}
	}

	const renderDescriptionEditor = useMemo(
		() => (
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
								<div className='prose prose-base max-w-none [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:my-6 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2'>
									<ReactMarkdown remarkPlugins={[remarkGfm]}>
										{text}
									</ReactMarkdown>
								</div>
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
			</div>
		),
		[description]
	)

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				handleSubmit()
			}}
			className='space-y-6'
		>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Название теста *
					</label>
					<input
						type='text'
						value={title}
						onChange={e => setTitle(e.target.value)}
						disabled={isLoading}
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
						required
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Тип теста
					</label>
					<select
						disabled
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500'
					>
						<option>Дополнительный</option>
					</select>
				</div>
			</div>

			{uploadedImages.length > 0 && (
				<UploadedImagesDisplay
					images={uploadedImages}
					message='Все изображения успешно загружены.'
					isLoading={isLoading}
					onDeleteImage={onDeleteImage}
				/>
			)}

			{renderDescriptionEditor}

			<div className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/40'>
				<h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>
					Настройки таблицы
				</h3>

				{/* Колонки */}
				<div className='mb-6'>
					<div className='flex items-center justify-between mb-2'>
						<h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
							Колонки
						</h4>
						<button
							type='button'
							onClick={handleAddColumn}
							disabled={isLoading}
							className='px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50'
						>
							+ Колонка
						</button>
					</div>
					<div className='space-y-2'>
						{columns.map((col, idx) => (
							<div
								key={col.id}
								className='flex items-center gap-2 bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-2'
							>
								<input
									type='text'
									value={col.name}
									onChange={e =>
										handleUpdateColumn(idx, 'name', e.target.value)
									}
									className='flex-1 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white text-sm'
									placeholder='Название'
								/>
								<select
									value={col.type}
									onChange={e =>
										handleUpdateColumn(idx, 'type', e.target.value)
									}
									className='px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white text-sm'
								>
									<option value='text'>Текст</option>
									<option value='select'>Выбор</option>
								</select>
								<button
									type='button'
									onClick={() => handleRemoveColumn(idx)}
									disabled={columns.length <= 1}
									className='text-red-500 hover:text-red-700 px-2 disabled:opacity-30'
								>
									✕
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Строки */}
				<div className='mb-6'>
					<div className='flex items-center justify-between mb-2'>
						<h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
							Строки и ячейки
						</h4>
						<button
							type='button'
							onClick={handleAddRow}
							disabled={isLoading}
							className='px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-50'
						>
							+ Строка
						</button>
					</div>

					<div className='space-y-4'>
						{rows.map((row, rowIdx) => (
							<div
								key={row.id}
								className='bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3'
							>
								<div className='flex justify-between items-center mb-2'>
									<span className='text-xs font-bold text-gray-500 uppercase'>
										Строка {rowIdx + 1}
									</span>
									<button
										type='button'
										onClick={() => handleRemoveRow(rowIdx)}
										className='text-red-500 text-xs hover:underline'
									>
										Удалить
									</button>
								</div>

								<div className='grid gap-3'>
									{row.cells.map((cell, cellIdx) => {
										const isSelected =
											selectedCell?.rowId === row.id &&
											selectedCell?.cellIndex === cellIdx
										const colType = columns[cellIdx]?.type

										return (
											<div
												key={`${row.id}_c${cellIdx}`}
												onClick={() =>
													setSelectedCell({ rowId: row.id, cellIndex: cellIdx })
												}
												className={`p-3 border rounded-lg cursor-pointer transition-all ${
													isSelected
														? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-500'
														: 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
												}`}
											>
												<div className='mb-2 text-xs font-semibold text-gray-500'>
													{columns[cellIdx]?.name || `Колонка ${cellIdx + 1}`}
												</div>

												{colType === 'text' ? (
													<input
														type='text'
														value={cell.value || ''}
														onChange={e =>
															handleUpdateCell(
																rowIdx,
																cellIdx,
																'value',
																e.target.value
															)
														}
														className='w-full px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600'
														placeholder='Текст ячейки'
													/>
												) : (
													<div className='space-y-3'>
														{/* Selected Chips */}
														<div className='flex flex-wrap gap-1 min-h-[24px]'>
															{!cell.available_option_ids?.length ? (
																<span className='text-xs text-gray-400 italic'>
																	Нет опций
																</span>
															) : (
																cell.available_option_ids.map(optOrder => {
																	const opt = getOptionByOrder(optOrder)
																	return (
																		<span
																			key={optOrder}
																			className='px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs rounded'
																		>
																			{opt?.text || `#${optOrder}`}
																		</span>
																	)
																})
															)}
														</div>

														{/* Options Selector */}
														<div className='grid grid-cols-2 gap-4 border-t pt-2 border-gray-200 dark:border-gray-700'>
															<div>
																<p className='text-[10px] uppercase text-gray-500 mb-1'>
																	Показывать в списке:
																</p>
																<div className='space-y-1 max-h-32 overflow-y-auto'>
																	{options.map(opt => (
																		<label
																			key={opt.id}
																			className='flex items-center gap-2 text-xs hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded'
																		>
																			<input
																				type='checkbox'
																				checked={(
																					cell.available_option_ids || []
																				).includes(opt.order)}
																				onChange={e => {
																					const current =
																						cell.available_option_ids || []
																					const next = e.target.checked
																						? [...current, opt.order]
																						: current.filter(
																								id => id !== opt.order
																							)
																					handleUpdateCell(
																						rowIdx,
																						cellIdx,
																						'available_option_ids',
																						next
																					)
																				}}
																				className='rounded text-blue-600'
																			/>
																			<span className='truncate dark:text-gray-300'>
																				{opt.text}
																			</span>
																		</label>
																	))}
																</div>
															</div>

															{isSelected && (
																<div className='border-l pl-4 border-gray-200 dark:border-gray-700'>
																	<p className='text-[10px] uppercase text-green-600 mb-1'>
																		Правильный ответ:
																	</p>
																	<div className='space-y-1 max-h-32 overflow-y-auto'>
																		{(cell.available_option_ids || []).map(
																			optOrder => {
																				const opt = getOptionByOrder(optOrder)
																				if (!opt) return null
																				return (
																					<label
																						key={`correct_${optOrder}`}
																						className='flex items-center gap-2 text-xs hover:bg-green-50 dark:hover:bg-green-900/20 p-1 rounded'
																					>
																						<input
																							type='checkbox'
																							checked={(
																								row.correct_answers?.[
																									`row${rowIdx}_col${cellIdx}`
																								] || []
																							).includes(optOrder)}
																							onChange={() =>
																								handleSetCorrectAnswer(
																									rowIdx,
																									cellIdx,
																									optOrder
																								)
																							}
																							className='rounded text-green-600'
																						/>
																						<span className='truncate dark:text-gray-300'>
																							{opt.text}
																						</span>
																					</label>
																				)
																			}
																		)}
																	</div>
																</div>
															)}
														</div>
													</div>
												)}
											</div>
										)
									})}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Options */}
				<div>
					<div className='flex items-center justify-between mb-2'>
						<h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
							Варианты ответов
						</h4>
						<button
							type='button'
							onClick={handleAddOption}
							disabled={isLoading}
							className='px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50'
						>
							+ Опция
						</button>
					</div>
					<div className='grid grid-cols-1 gap-2'>
						{options.map((opt, idx) => (
							<div
								key={opt.id}
								className='flex items-center gap-2 bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-2'
							>
								<span className='text-xs font-mono text-gray-400 w-6 text-center'>
									{idx + 1}
								</span>
								<input
									type='text'
									value={opt.text}
									onChange={e =>
										handleUpdateOption(idx, 'text', e.target.value)
									}
									className='flex-1 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white text-sm'
									placeholder={`Текст опции ${idx + 1}`}
								/>
								<button
									type='button'
									onClick={() => handleRemoveOption(idx)}
									className='text-red-500 hover:text-red-700 px-2'
								>
									✕
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			{error && (
				<div className='p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm'>
					⚠️ {error}
				</div>
			)}

			<div className='flex items-center gap-4 pt-4 border-t dark:border-gray-700'>
				<button
					type='submit'
					disabled={isLoading}
					className='px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium'
				>
					{isLoading
						? 'Сохранение...'
						: initialValues
							? 'Обновить тест'
							: 'Сохранить тест'}
				</button>
				<button
					type='button'
					onClick={onCancel}
					disabled={isLoading}
					className='px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50'
				>
					Отмена
				</button>
			</div>
		</form>
	)
}

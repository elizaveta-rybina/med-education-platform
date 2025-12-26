import { quizzesApi } from '@/app/api/quizzes/quizzes.api'
import type { Quiz, QuizPayload } from '@/app/api/quizzes/quizzes.types'
import React, { useState } from 'react'

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

interface Column {
	id: string
	name: string
	type: 'text' | 'select'
}

interface Cell {
	type: 'text' | 'select'
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
	order: number
}

export const SelectTableForm: React.FC<SelectTableFormProps> = ({
	topicId,
	defaultOrderNumber,
	isLoading,
	onSubmit,
	onCancel,
	initialValues
}) => {
	const [title, setTitle] = useState(initialValues?.title || '')
	const [description, setDescription] = useState(
		initialValues?.description || ''
	)
	const [questionText, setQuestionText] = useState(
		initialValues?.questions?.[0]?.text || ''
	)
	const [columns, setColumns] = useState<Column[]>(() => {
		const meta = initialValues?.questions?.[0]?.metadata
		const metadata = typeof meta === 'string' ? JSON.parse(meta) : meta
		if (metadata?.columns) {
			return (metadata.columns as any[]).map((col, idx) => ({
				id: `col_${idx}`,
				name: col.name || '',
				type: col.type || 'text'
			}))
		}
		return [
			{ id: 'col_0', name: 'Колонка 1', type: 'text' },
			{ id: 'col_1', name: 'Колонка 2', type: 'select' }
		]
	})

	const [rows, setRows] = useState<Row[]>(() => {
		const meta = initialValues?.questions?.[0]?.metadata
		const metadata = typeof meta === 'string' ? JSON.parse(meta) : meta
		if (metadata?.rows) {
			return (metadata.rows as any[]).map((row, idx) => ({
				id: `row_${idx}`,
				cells: row.cells || [],
				correct_answers: row.correct_answers
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

	const [options, setOptions] = useState<Option[]>(() => {
		if (initialValues?.questions?.[0]?.options) {
			return (initialValues.questions[0].options as any[]).map((opt, idx) => ({
				id: `opt_${idx}`,
				text: opt.text || '',
				order: opt.order || idx
			}))
		}
		return [
			{ id: 'opt_0', text: 'Опция 1', order: 0 },
			{ id: 'opt_1', text: 'Опция 2', order: 1 }
		]
	})

	const [selectedCell, setSelectedCell] = useState<{
		rowId: string
		cellIndex: number
	} | null>(null)

	const handleAddColumn = () => {
		const newId = `col_${
			Math.max(0, ...columns.map(c => parseInt(c.id.split('_')[1]))) + 1
		}`
		setColumns([
			...columns,
			{ id: newId, name: `Колонка ${columns.length + 1}`, type: 'text' }
		])

		// Добавляем ячейку в каждую строку
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
		field: 'name' | 'type',
		value: string
	) => {
		const newColumns = [...columns]
		newColumns[colIndex] = { ...newColumns[colIndex], [field]: value }
		setColumns(newColumns)

		// Обновляем тип ячеек в строках
		if (field === 'type') {
			setRows(
				rows.map(row => {
					const newCells = [...row.cells]
					newCells[colIndex] = {
						type: value as 'text' | 'select',
						...(value === 'text' ? { value: '' } : { available_option_ids: [] })
					}
					return { ...row, cells: newCells }
				})
			)
		}
	}

	const handleAddRow = () => {
		const newId = `row_${
			Math.max(0, ...rows.map(r => parseInt(r.id.split('_')[1]))) + 1
		}`
		const newCells = columns.map(col => ({
			type: col.type as 'text' | 'select',
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
		field: string,
		value: any
	) => {
		const newRows = [...rows]
		if (field === 'value') {
			newRows[rowIndex].cells[cellIndex] = {
				...newRows[rowIndex].cells[cellIndex],
				value
			}
		} else if (field === 'available_option_ids') {
			newRows[rowIndex].cells[cellIndex] = {
				...newRows[rowIndex].cells[cellIndex],
				available_option_ids: value
			}
		}
		setRows(newRows)
	}

	const handleSetCorrectAnswer = (
		rowIndex: number,
		cellIndex: number,
		optionIndex: number
	) => {
		const newRows = [...rows]
		const cellKey = `row${rowIndex}_col${cellIndex}`
		if (!newRows[rowIndex].correct_answers) {
			newRows[rowIndex].correct_answers = {}
		}

		if (newRows[rowIndex].correct_answers![cellKey]?.includes(optionIndex)) {
			newRows[rowIndex].correct_answers![cellKey] = newRows[
				rowIndex
			].correct_answers![cellKey]!.filter(i => i !== optionIndex)
		} else {
			newRows[rowIndex].correct_answers![cellKey] = [
				...(newRows[rowIndex].correct_answers![cellKey] || []),
				optionIndex
			]
		}
		setRows(newRows)
	}

	const handleAddOption = () => {
		const newId = `opt_${
			Math.max(0, ...options.map(o => parseInt(o.id.split('_')[1]))) + 1
		}`
		setOptions([
			...options,
			{ id: newId, text: `Опция ${options.length + 1}`, order: options.length }
		])
	}

	const handleUpdateOption = (
		optIndex: number,
		field: 'text' | 'order',
		value: any
	) => {
		const newOptions = [...options]
		newOptions[optIndex] = { ...newOptions[optIndex], [field]: value }
		setOptions(newOptions)
	}

	const handleRemoveOption = (optIndex: number) => {
		setOptions(options.filter((_, idx) => idx !== optIndex))
	}

	const handleSubmit = async () => {
		if (!title.trim()) {
			alert('Заполните название теста')
			return
		}
		if (!questionText.trim()) {
			alert('Заполните текст вопроса')
			return
		}
		if (columns.length < 2) {
			alert('Минимум 2 колонки')
			return
		}
		if (rows.length < 1) {
			alert('Минимум 1 строка')
			return
		}
		if (options.length < 1) {
			alert('Минимум 1 опция')
			return
		}

		const payload: any = {
			title,
			description: description.trim(),
			quiz_type: 'additional',
			max_attempts: 3,
			passing_score: 70,
			time_limit_minutes: 30,
			entity_type: 'topic',
			quizable_id: topicId,
			order_number: defaultOrderNumber,
			questions: [
				{
					text: questionText,
					question_type: 'table',
					is_auto_graded: true,
					points: 10,
					metadata: {
						columns: columns.map(col => ({
							name: col.name,
							type: col.type
						})),
						rows: rows.map((row, rowIdx) => {
							const rowCells: Cell[] = row.cells.map((cell, cellIdx) => {
								if (columns[cellIdx].type === 'text') {
									return { type: 'text', value: cell.value || '' }
								} else {
									return {
										type: 'select',
										cell_key: `row${rowIdx}_col${cellIdx}`,
										available_option_ids: cell.available_option_ids || []
									}
								}
							})
							return {
								cells: rowCells,
								correct_answers: row.correct_answers || {}
							}
						})
					},
					options: options.map(opt => ({
						text: opt.text,
						order: opt.order
					}))
				}
			]
		}

		try {
			if (initialValues?.id) {
				await quizzesApi.update(initialValues.id, payload)
			} else {
				await quizzesApi.create(payload)
			}
			onSubmit(payload)
		} catch (error) {
			console.error('Failed to save quiz:', error)
			alert('Ошибка при сохранении теста')
		}
	}

	return (
		<div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6'>
			<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
				{initialValues
					? 'Редактировать тест'
					: 'Таблица с выбором'}
			</h2>

			<div className='space-y-6'>
				{/* Title */}
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Название теста
					</label>
					<input
						type='text'
						value={title}
						onChange={e => setTitle(e.target.value)}
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
						placeholder='Название теста'
					/>
				</div>

				{/* Description */}
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Описание теста (Markdown)
					</label>
					<textarea
						value={description}
						onChange={e => setDescription(e.target.value)}
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-32 align-top'
						placeholder='Описание теста (поддерживает Markdown)'
					/>
				</div>

				{/* Question Text */}
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Текст вопроса (Markdown)
					</label>
					<textarea
						value={questionText}
						onChange={e => setQuestionText(e.target.value)}
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-24 align-top'
						placeholder='Текст вопроса'
					/>
				</div>

				{/* Columns */}
				<div className='border-t pt-6'>
					<div className='flex justify-between items-center mb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
							Колонки таблицы
						</h3>
						<button
							onClick={handleAddColumn}
							className='px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm'
						>
							+ Добавить колонку
						</button>
					</div>

					<div className='space-y-3'>
						{columns.map((col, colIdx) => (
							<div
								key={col.id}
								className='flex gap-3 items-center bg-gray-50 dark:bg-gray-700 p-3 rounded'
							>
								<input
									type='text'
									value={col.name}
									onChange={e =>
										handleUpdateColumn(colIdx, 'name', e.target.value)
									}
									placeholder='Название колонки'
									className='flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
								/>
								<select
									value={col.type}
									onChange={e =>
										handleUpdateColumn(colIdx, 'type', e.target.value)
									}
									className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
								>
									<option value='text'>Текст</option>
									<option value='select'>Выбор</option>
								</select>
								{columns.length > 1 && (
									<button
										onClick={() => handleRemoveColumn(colIdx)}
										className='px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm'
									>
										Удалить
									</button>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Rows */}
				<div className='border-t pt-6'>
					<div className='flex justify-between items-center mb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
							Строки таблицы
						</h3>
						<button
							onClick={handleAddRow}
							className='px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm'
						>
							+ Добавить строку
						</button>
					</div>

					<div className='space-y-4 overflow-x-auto'>
						{rows.map((row, rowIdx) => (
							<div
								key={row.id}
								className='bg-gray-50 dark:bg-gray-700 p-4 rounded'
							>
								<div className='flex justify-between items-center mb-3'>
									<span className='font-medium text-gray-900 dark:text-white'>
										Строка {rowIdx + 1}
									</span>
									{rows.length > 1 && (
										<button
											onClick={() => handleRemoveRow(rowIdx)}
											className='px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm'
										>
											Удалить
										</button>
									)}
								</div>

								<div className='space-y-2'>
									{row.cells.map((cell, cellIdx) => (
										<div
											key={`${rowIdx}_${cellIdx}`}
											className={`p-3 border rounded cursor-pointer transition ${
												selectedCell?.rowId === row.id &&
												selectedCell?.cellIndex === cellIdx
													? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
													: 'border-gray-300 dark:border-gray-600'
											}`}
											onClick={() =>
												setSelectedCell({ rowId: row.id, cellIndex: cellIdx })
											}
										>
											<div className='flex justify-between items-start'>
												<div className='flex-1'>
													<p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
														{columns[cellIdx]?.name || `Колонка ${cellIdx + 1}`}
													</p>
													{columns[cellIdx]?.type === 'text' && (
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
															placeholder='Введите текст'
															className='w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm'
														/>
													)}

													{columns[cellIdx]?.type === 'select' && (
														<div className='space-y-2'>
															<div className='flex flex-wrap gap-1 mb-2'>
																{(cell.available_option_ids || []).length ===
																0 ? (
																	<span className='text-sm text-gray-500 dark:text-gray-400'>
																		Опции не выбраны
																	</span>
																) : (
																	(cell.available_option_ids || []).map(
																		optIdx => (
																			<span
																				key={optIdx}
																				className='bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs'
																			>
																				{options[optIdx]?.text ||
																					`Опция ${optIdx}`}
																			</span>
																		)
																	)
																)}
															</div>

															<div className='space-y-1'>
																<p className='text-xs font-medium text-gray-600 dark:text-gray-400'>
																	Доступные опции:
																</p>
																{options.map((opt, optIdx) => (
																	<label
																		key={opt.id}
																		className='flex items-center gap-2 text-sm'
																	>
																		<input
																			type='checkbox'
																			checked={(
																				cell.available_option_ids || []
																			).includes(optIdx)}
																			onChange={e => {
																				const currentIds =
																					cell.available_option_ids || []
																				const newIds = e.target.checked
																					? [...currentIds, optIdx]
																					: currentIds.filter(
																							id => id !== optIdx
																					  )
																				handleUpdateCell(
																					rowIdx,
																					cellIdx,
																					'available_option_ids',
																					newIds
																				)
																			}}
																			className='rounded'
																		/>
																		<span className='text-gray-700 dark:text-gray-300'>
																			{opt.text}
																		</span>
																	</label>
																))}
															</div>
														</div>
													)}
												</div>
											</div>

											{/* Correct answers for select cells */}
											{columns[cellIdx]?.type === 'select' &&
												selectedCell?.rowId === row.id &&
												selectedCell?.cellIndex === cellIdx && (
													<div className='mt-3 pt-3 border-t border-gray-300 dark:border-gray-600'>
														<p className='text-xs font-medium text-gray-600 dark:text-gray-400 mb-2'>
															Правильные ответы:
														</p>
														{(cell.available_option_ids || []).map(optIdx => (
															<label
																key={optIdx}
																className='flex items-center gap-2 text-sm'
															>
																<input
																	type='checkbox'
																	checked={(
																		row.correct_answers?.[
																			`row${rowIdx}_col${cellIdx}`
																		] || []
																	).includes(optIdx)}
																	onChange={() =>
																		handleSetCorrectAnswer(
																			rowIdx,
																			cellIdx,
																			optIdx
																		)
																	}
																	className='rounded'
																/>
																<span className='text-gray-700 dark:text-gray-300'>
																	{options[optIdx]?.text || `Опция ${optIdx}`}
																</span>
															</label>
														))}
													</div>
												)}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Options */}
				<div className='border-t pt-6'>
					<div className='flex justify-between items-center mb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
							Варианты ответов
						</h3>
						<button
							onClick={handleAddOption}
							className='px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm'
						>
							+ Добавить опцию
						</button>
					</div>

					<div className='space-y-2'>
						{options.map((opt, idx) => (
							<div
								key={opt.id}
								className='flex gap-3 items-center bg-gray-50 dark:bg-gray-700 p-3 rounded'
							>
								<span className='text-sm font-medium text-gray-600 dark:text-gray-400 min-w-8'>
									#{idx}
								</span>
								<input
									type='text'
									value={opt.text}
									onChange={e =>
										handleUpdateOption(idx, 'text', e.target.value)
									}
									placeholder='Текст опции'
									className='flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
								/>
								<button
									onClick={() => handleRemoveOption(idx)}
									className='px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm'
								>
									Удалить
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Submit/Cancel */}
			<div className='flex gap-3 mt-8 pt-6 border-t'>
				<button
					onClick={handleSubmit}
					disabled={isLoading}
					className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400'
				>
					{isLoading
						? 'Сохранение...'
						: initialValues
						? 'Обновить тест'
						: 'Создать тест'}
				</button>
				<button
					onClick={onCancel}
					className='px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors'
				>
					Отмена
				</button>
			</div>
		</div>
	)
}

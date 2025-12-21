import { useEffect, useMemo, useState } from 'react'

import type {
	Quiz,
	QuizPayload,
	QuizQuestionPayload,
	QuizQuestionType,
	QuizTableMetadataColumn
} from '@/app/api/quizzes/quizzes.types'

interface QuizFormProps {
	topicId: number
	defaultOrderNumber?: number
	isLoading?: boolean
	onSubmit: (payload: QuizPayload) => Promise<void>
	onCancel: () => void
	initialValues?: Partial<Quiz>
}

type ChoiceOptionState = {
	id: string
	text: string
	is_correct: boolean
}

type TableRowState = {
	id: string
	columnA: string
	columnB: string
	correctOptions: string[]
}

type QuestionState = {
	id: string
	text: string
	question_type: QuizQuestionType
	points: number
	is_auto_graded: boolean
	options: ChoiceOptionState[]
	tableRows: TableRowState[]
	columns: QuizTableMetadataColumn[]
}

const defaultColumns: QuizTableMetadataColumn[] = [
	{ name: 'Органы и системы', type: 'text' },
	{ name: 'Эффекты', type: 'text' },
	{ name: 'Механизмы эффектов', type: 'multi_select' }
]

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

const createQuestionState = (type: QuizQuestionType): QuestionState => {
	const baseOptions: ChoiceOptionState[] = [
		{ id: generateId(), text: 'Вариант 1', is_correct: true },
		{ id: generateId(), text: 'Вариант 2', is_correct: false }
	]

	return {
		id: generateId(),
		text: '',
		question_type: type,
		points: 1,
		is_auto_graded: true,
		options:
			type === 'table'
				? [
						{ id: generateId(), text: 'Опция 1', is_correct: false },
						{ id: generateId(), text: 'Опция 2', is_correct: false },
						{ id: generateId(), text: 'Опция 3', is_correct: false }
				  ]
				: baseOptions,
		tableRows:
			type === 'table'
				? [
						{
							id: generateId(),
							columnA: '',
							columnB: '',
							correctOptions: []
						}
				  ]
				: [],
		columns: defaultColumns
	}
}

export const QuizForm = ({
	topicId,
	defaultOrderNumber,
	isLoading = false,
	onSubmit,
	onCancel,
	initialValues
}: QuizFormProps) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [quizType, setQuizType] = useState('topic_final')
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

		// Загружаем вопросы, если они есть
		if (initialValues.questions && initialValues.questions.length > 0) {
			const loadedQuestions: QuestionState[] = initialValues.questions.map(
				q => {
					const options: ChoiceOptionState[] = (q.options || []).map(opt => ({
						id: generateId(),
						text: opt.text || '',
						is_correct: opt.is_correct || false
					}))

					const tableRows: TableRowState[] = (q.table_rows || []).map(row => ({
						id: generateId(),
						columnA: row.columnA || '',
						columnB: row.columnB || '',
						correctOptions: row.correctOptions || []
					}))

					const columns: QuizTableMetadataColumn[] =
						q.metadata?.columns || defaultColumns

					return {
						id: generateId(),
						text: q.text || '',
						question_type: q.type || 'single_choice',
						points: q.points || 1,
						is_auto_graded: q.is_auto_graded ?? true,
						options,
						tableRows,
						columns
					}
				}
			)
			setQuestions(loadedQuestions)
		}
	}, [initialValues])

	const handleAddQuestion = (type: QuizQuestionType) => {
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

	const handleAddRow = (questionId: string) => {
		updateQuestion(questionId, q => ({
			...q,
			tableRows: [
				...q.tableRows,
				{ id: generateId(), columnA: '', columnB: '', correctOptions: [] }
			]
		}))
	}

	const handleRowChange = (
		questionId: string,
		rowId: string,
		field: 'columnA' | 'columnB' | 'correctOptions',
		value: string | string[]
	) => {
		updateQuestion(questionId, q => ({
			...q,
			tableRows: q.tableRows.map(row =>
				row.id === rowId ? { ...row, [field]: value } : row
			)
		}))
	}

	const handleColumnChange = (
		questionId: string,
		index: number,
		field: 'name' | 'type',
		value: string
	) => {
		updateQuestion(questionId, q => {
			const updatedColumns = [...q.columns]
			updatedColumns[index] = {
				...updatedColumns[index],
				[field]:
					field === 'type' ? (value as QuizTableMetadataColumn['type']) : value
			}
			return { ...q, columns: updatedColumns }
		})
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

			if (question.question_type === 'table') {
				if (question.options.length === 0)
					return 'Добавьте варианты для таблицы'
				if (question.tableRows.length === 0) return 'Добавьте строки таблицы'
				continue
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
			if (q.question_type === 'table') {
				const tableOptions = q.options.map((opt, optionIndex) => ({
					text: opt.text.trim(),
					order: optionIndex
				}))

				return {
					text: q.text.trim(),
					question_type: q.question_type,
					points: q.points,
					is_auto_graded: q.is_auto_graded,
					order_number: idx + 1,
					options: tableOptions,
					metadata: {
						columns: q.columns.map(col => ({
							name: col.name.trim(),
							type: col.type
						})),
						rows: q.tableRows.map(row => ({
							cells: [row.columnA.trim(), row.columnB.trim(), []],
							correct_option_ids: row.correctOptions
								.map(optId => q.options.findIndex(opt => opt.id === optId))
								.filter(index => index >= 0)
						}))
					}
				}
			}

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
			description: description.trim() || null,
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

	const questionTypeLabels: Record<QuizQuestionType, string> = useMemo(
		() => ({
			single_choice: 'Одиночный выбор',
			multiple_choice: 'Множественный выбор',
			table: 'Таблица (drag & drop)'
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
						value={quizType}
						onChange={e => setQuizType(e.target.value)}
						disabled={isLoading || saving}
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					>
						<option value='topic_final'>Итоговый по теме</option>
						<option value='additional'>Дополнительный</option>
						<option value='practice'>Практический</option>
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

			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
					Описание
				</label>
				<textarea
					value={description}
					onChange={e => setDescription(e.target.value)}
					disabled={isLoading || saving}
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					rows={3}
					placeholder='Краткое описание теста'
				/>
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
					<button
						type='button'
						onClick={() => handleAddQuestion('table')}
						disabled={isLoading || saving}
						className='px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50'
					>
						Добавить таблицу
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
												createQuestionState(e.target.value as QuizQuestionType)
											)
										}
										disabled={isLoading || saving}
										className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm'
									>
										{(
											Object.keys(questionTypeLabels) as QuizQuestionType[]
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

						{question.question_type !== 'table' && (
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
						)}

						{question.question_type === 'table' && (
							<div className='space-y-4'>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
									{question.columns.map((column, idx) => (
										<div
											key={`${question.id}-col-${idx}`}
											className='space-y-1'
										>
											<label className='block text-xs font-medium text-gray-600 dark:text-gray-300'>
												Колонка {idx + 1}
											</label>
											<input
												type='text'
												value={column.name}
												onChange={e =>
													handleColumnChange(
														question.id,
														idx,
														'name',
														e.target.value
													)
												}
												disabled={isLoading || saving}
												className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white'
											/>
											{idx === 2 && (
												<select
													value={column.type}
													onChange={e =>
														handleColumnChange(
															question.id,
															idx,
															'type',
															e.target.value
														)
													}
													disabled={isLoading || saving}
													className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white'
												>
													<option value='multi_select'>
														Множественный выбор
													</option>
													<option value='text'>Текст</option>
												</select>
											)}
										</div>
									))}
								</div>

								<div className='space-y-2'>
									<h4 className='text-sm font-semibold text-gray-800 dark:text-gray-200'>
										Варианты для перетаскивания
									</h4>
									{question.options.map((option, optionIdx) => (
										<div
											key={`${question.id}-table-opt-${option.id}`}
											className='flex items-center gap-3 bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3'
										>
											<span className='text-sm text-gray-500 w-6'>
												#{optionIdx + 1}
											</span>
											<input
												type='text'
												value={option.text}
												onChange={e =>
													updateQuestion(question.id, q => ({
														...q,
														options: q.options.map(opt =>
															opt.id === option.id
																? { ...opt, text: e.target.value }
																: opt
														)
													}))
												}
												disabled={isLoading || saving}
												className='flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
												placeholder={`Опция ${optionIdx + 1}`}
											/>
											<button
												type='button'
												onClick={() =>
													handleRemoveOption(question.id, option.id)
												}
												disabled={
													question.options.length <= 3 || isLoading || saving
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
										Добавить опцию
									</button>
								</div>

								<div className='space-y-2'>
									<h4 className='text-sm font-semibold text-gray-800 dark:text-gray-200'>
										Строки таблицы и правильные ответы
									</h4>
									{question.tableRows.map((row, rowIdx) => (
										<div
											key={`${question.id}-row-${row.id}`}
											className='border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-3 space-y-2'
										>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
												<input
													type='text'
													value={row.columnA}
													onChange={e =>
														handleRowChange(
															question.id,
															row.id,
															'columnA',
															e.target.value
														)
													}
													disabled={isLoading || saving}
													className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white'
													placeholder='Первая колонка'
												/>
												<input
													type='text'
													value={row.columnB}
													onChange={e =>
														handleRowChange(
															question.id,
															row.id,
															'columnB',
															e.target.value
														)
													}
													disabled={isLoading || saving}
													className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white'
													placeholder='Вторая колонка'
												/>
											</div>
											<div className='flex flex-wrap gap-3'>
												{question.options.map(option => (
													<label
														key={`${question.id}-row-${row.id}-opt-${option.id}`}
														className='inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200'
													>
														<input
															type='checkbox'
															checked={row.correctOptions.includes(option.id)}
															onChange={e => {
																const next = e.target.checked
																	? [...row.correctOptions, option.id]
																	: row.correctOptions.filter(
																			id => id !== option.id
																	  )
																handleRowChange(
																	question.id,
																	row.id,
																	'correctOptions',
																	next
																)
															}}
															disabled={isLoading || saving}
															className='h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300'
														/>
														<span>{option.text}</span>
													</label>
												))}
											</div>
											<div className='flex justify-between items-center'>
												<span className='text-xs text-gray-500'>
													Строка {rowIdx + 1}
												</span>
												<button
													type='button'
													onClick={() =>
														updateQuestion(question.id, q => ({
															...q,
															tableRows: q.tableRows.filter(
																r => r.id !== row.id
															)
														}))
													}
													disabled={
														question.tableRows.length <= 1 ||
														isLoading ||
														saving
													}
													className='text-red-600 hover:text-red-700 text-sm'
												>
													Удалить строку
												</button>
											</div>
										</div>
									))}
									<button
										type='button'
										onClick={() => handleAddRow(question.id)}
										disabled={isLoading || saving}
										className='px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
									>
										Добавить строку
									</button>
								</div>
							</div>
						)}
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

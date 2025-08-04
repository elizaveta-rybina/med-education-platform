import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface DropdownOption {
	id: string
	content: string
}

export interface DropdownTableBlock {
	id: string
	title: string
	tableTitle: string
	columns: { id: string; title: string; width?: string }[]
	rows: { id: string; values: string[] }[]
	columnOptions: Record<string, DropdownOption[]>
	correctAnswers: Record<string, string>
}

interface DropdownTableComponentProps {
	block: DropdownTableBlock
	onComplete?: (isCorrect: boolean) => void
}

export const DropdownTableComponent: React.FC<DropdownTableComponentProps> = ({
	block,
	onComplete = () => {}
}) => {
	const { t } = useTranslation('coursePage')
	const [selectedAnswers, setSelectedAnswers] = useState<
		Record<string, string>
	>({})
	const [errors, setErrors] = useState<Record<string, boolean>>({})
	const [isCompleted, setIsCompleted] = useState(false)

	// Инициализация выбранных ответов при изменении блока
	useEffect(() => {
		const initialAnswers = block.rows.reduce((acc, row) => {
			row.values.forEach((_, index) => {
				const cellId = `${row.id}-col${index}`
				acc[cellId] = ''
			})
			return acc
		}, {} as Record<string, string>)
		setSelectedAnswers(initialAnswers)
		setErrors({})
		setIsCompleted(false)
	}, [block])

	// Обработчик выбора ответа
	const handleSelectChange = (
		rowId: string,
		colIndex: number,
		value: string
	) => {
		const cellId = `${rowId}-col${colIndex}`
		setSelectedAnswers(prev => ({
			...prev,
			[cellId]: value
		}))
		setIsCompleted(false)
	}

	// Проверка ответов
	const checkAnswers = () => {
		const newErrors: Record<string, boolean> = {}
		let allCorrect = true

		block.rows.forEach(row => {
			row.values.forEach((_, index) => {
				const cellId = `${row.id}-col${index}`
				const userAnswer = selectedAnswers[cellId]
				const columnId = block.columns[index].id
				const correctAnswerKey = Object.keys(block.correctAnswers).find(
					key => key === `${row.id}-${columnId}`
				)
				const correctAnswerId = correctAnswerKey
					? block.correctAnswers[correctAnswerKey]
					: null
				const correctAnswer = block.columnOptions[columnId]?.find(
					opt => opt.id === correctAnswerId
				)?.content

				if (index > 0 && correctAnswer && userAnswer !== correctAnswer) {
					newErrors[cellId] = true
					allCorrect = false
				} else {
					newErrors[cellId] = false
				}
			})
		})

		setErrors(newErrors)
		setIsCompleted(true)
		onComplete(allCorrect)
	}

	// Сброс ответов
	const resetAnswers = () => {
		const initialAnswers = block.rows.reduce((acc, row) => {
			row.values.forEach((_, index) => {
				const cellId = `${row.id}-col${index}`
				acc[cellId] = ''
			})
			return acc
		}, {} as Record<string, string>)
		setSelectedAnswers(initialAnswers)
		setErrors({})
		setIsCompleted(false)
	}

	return (
		<div className='max-w-6xl mx-auto bg-white p-6 shadow border border-gray-200 rounded-md'>
			<div className='mb-4 text-gray-700 space-y-2'>
				{block.tableTitle.split('\n').map((paragraph, i) => (
					<p key={i}>{paragraph}</p>
				))}
			</div>

			<h4 className='text-xl font-semibold mb-4 text-gray-800'>
				{block.title}
			</h4>

			<div className='overflow-x-auto'>
				<table className='w-full table-auto border-collapse text-sm'>
					<thead>
						<tr className='bg-gray-100 text-gray-700'>
							{block.columns.map(column => (
								<th
									key={column.id}
									style={{ width: column.width }}
									className='text-left px-4 py-2 border-b border-gray-300 font-medium'
								>
									{column.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{block.rows.map(row => (
							<tr
								key={row.id}
								className='border-b border-gray-200 hover:bg-gray-50 transition-colors'
							>
								{row.values.map((value, index) => {
									const cellId = `${row.id}-col${index}`
									return (
										<td
											key={cellId}
											className={`px-4 py-2 ${
												errors[cellId] ? 'bg-red-50' : ''
											}`}
										>
											{index === 0 ? (
												<span className='text-gray-800'>{value}</span>
											) : (
												<select
													value={selectedAnswers[cellId] || ''}
													onChange={e =>
														handleSelectChange(row.id, index, e.target.value)
													}
													className={`w-full px-3 py-2 border ${
														errors[cellId]
															? 'border-red-400'
															: 'border-gray-300'
													} rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm bg-white`}
												>
													<option value=''>–</option>
													{block.columnOptions[block.columns[index].id]?.map(
														option => (
															<option key={option.id} value={option.content}>
																{option.content}
															</option>
														)
													)}
												</select>
											)}
										</td>
									)
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='flex gap-3 mt-6'>
				<button
					onClick={checkAnswers}
					className='px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition'
				>
					{t('checkAnswers')}
				</button>
				<button
					onClick={resetAnswers}
					className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition'
				>
					{t('resetAnswers')}
				</button>
			</div>

			{isCompleted && Object.keys(errors).length > 0 && (
				<div
					className={`mt-4 px-4 py-3 rounded-md text-sm ${
						Object.values(errors).some(e => e)
							? 'bg-red-50 text-red-700 border border-red-200'
							: 'bg-green-50 text-green-700 border border-green-200'
					}`}
				>
					{Object.values(errors).some(e => e)
						? t('answersIncorrect')
						: t('answersCorrect')}
				</div>
			)}
		</div>
	)
}

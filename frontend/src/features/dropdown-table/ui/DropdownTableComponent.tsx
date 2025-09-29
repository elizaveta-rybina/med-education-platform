import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDropdownTable } from '../model/hooks/useDropdownTable'
import { DropdownTableBlock } from '../model/types'
import { DropdownCell } from './DropdownCell'

interface DropdownTableComponentProps {
	block: DropdownTableBlock
	onComplete?: (isCorrect: boolean) => void
}

export const DropdownTableComponent: React.FC<DropdownTableComponentProps> = ({
	block,
	onComplete
}) => {
	const { t } = useTranslation('courseInner')
	const {
		selectedAnswers,
		errors,
		isCompleted,
		handleSelectChange,
		checkAnswers,
		resetAnswers
	} = useDropdownTable({ block, onComplete })
	const [isLocked, setIsLocked] = useState(false)

	// Загрузка сохранённых ответов из localStorage при монтировании
	useEffect(() => {
		const savedAnswers = localStorage.getItem('ddtAnswers')
		if (savedAnswers) {
			const parsedAnswers = JSON.parse(savedAnswers)
			Object.entries(parsedAnswers).forEach(([cellId, answerId]) => {
				// Разбиваем cellId (например, 'row1-col1') на rowId и colIndex
				const [rowId, colPart] = cellId.split('-col')
				const colIndex = parseInt(colPart, 10)
				if (rowId && !isNaN(colIndex)) {
					handleSelectChange(rowId, colIndex, answerId as string)
				}
			})
			setIsLocked(true) // Блокируем таблицу, если ответы уже сохранены
		}
	}, [handleSelectChange])

	// Модифицированный checkAnswers для сохранения в localStorage
	const handleCheckAnswers = () => {
		checkAnswers()
		localStorage.setItem('ddtAnswers', JSON.stringify(selectedAnswers))
		setIsLocked(true) // Блокируем после первой проверки
	}

	// Модифицированный resetAnswers, чтобы учитывать isLocked
	const handleResetAnswers = () => {
		if (!isLocked) {
			resetAnswers()
			localStorage.removeItem('ddtAnswers') // Очищаем localStorage, если не заблокировано
		}
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
										<DropdownCell
											key={cellId}
											rowId={row.id}
											colIndex={index}
											value={value}
											columnId={block.columns[index].id}
											options={
												block.columnOptions[block.columns[index].id] || []
											}
											selectedAnswer={selectedAnswers[cellId]}
											hasError={errors[cellId]}
											onSelectChange={isLocked ? () => {} : handleSelectChange}
											disabled={isLocked}
										/>
									)
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='flex gap-3 mt-6'>
				<button
					onClick={handleCheckAnswers}
					className={`px-4 py-2 bg-purple-600 text-white rounded-md transition ${
						isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
					}`}
					disabled={isLocked}
				>
					{t('checkAnswers')}
				</button>
				<button
					onClick={handleResetAnswers}
					className={`px-4 py-2 border border-gray-300 text-gray-700 rounded-md transition ${
						isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
					}`}
					disabled={isLocked}
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

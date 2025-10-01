import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDropdownTable } from '../model/hooks/useDropdownTable'
import { DropdownOption, DropdownTableBlock } from '../model/types'
import { DropdownCell } from './DropdownCell'
import React from 'react'

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

	// Группировка строк по первому столбцу (values[0])
	const groupedRows = block.rows.reduce<
		{
			title: string | React.ReactNode
			subRows: {
				id: string
				values: (string | React.ReactNode)[]
				cellOptions?: Record<string, DropdownOption[]>
			}[]
		}[]
	>((acc, row) => {
		const title = row.values[0] || 'Без названия'
		const existingGroup = acc.find(group => group.title === title)
		if (existingGroup) {
			existingGroup.subRows.push({
				id: row.id,
				values: row.values,
				cellOptions: row.cellOptions
			})
		} else {
			acc.push({
				title,
				subRows: [
					{ id: row.id, values: row.values, cellOptions: row.cellOptions }
				]
			})
		}
		return acc
	}, [])

	// Загрузка сохранённых ответов из localStorage
	useEffect(() => {
		const savedAnswers = localStorage.getItem('ddtAnswers')
		if (savedAnswers) {
			const parsedAnswers = JSON.parse(savedAnswers)
			Object.entries(parsedAnswers).forEach(([cellId, answerId]) => {
				const [rowId, colPart] = cellId.split('-col')
				const colIndex = parseInt(colPart, 10)
				if (rowId && !isNaN(colIndex)) {
					handleSelectChange(rowId, colIndex, answerId as string)
				}
			})
			setIsLocked(true)
		}
	}, [handleSelectChange])

	// Модифицированный checkAnswers
	const handleCheckAnswers = () => {
		checkAnswers()
		localStorage.setItem('ddtAnswers', JSON.stringify(selectedAnswers))
		setIsLocked(true)
	}

	// Модифицированный resetAnswers
	const handleResetAnswers = () => {
		if (!isLocked) {
			resetAnswers()
			localStorage.removeItem('ddtAnswers')
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
						{groupedRows.map(group => (
							<React.Fragment key={`group-${group.title}`}>
								{group.subRows.map((subRow, index) => (
									<tr
										key={subRow.id}
										className='border-b border-gray-200 hover:bg-gray-50 transition-colors'
									>
										{/* Первая колонка: title с rowSpan */}
										{index === 0 && (
											<td
												className='px-4 py-2 border-b border-gray-200 text-gray-700'
												rowSpan={group.subRows.length}
											>
												{group.title}
											</td>
										)}
										{/* Остальные колонки */}
										{subRow.values.slice(1).map((value, colIndex) => {
											const actualColIndex = colIndex + 1 // Смещение, так как values[0] — это title
											const cellId = `${subRow.id}-col${actualColIndex}`
											const columnId = block.columns[actualColIndex].id
											const options =
												subRow.cellOptions?.[`col${actualColIndex}`] ||
												block.columnOptions?.[columnId] ||
												[]
											return (
												<DropdownCell
													key={cellId}
													rowId={subRow.id}
													colIndex={actualColIndex}
													value={value}
													columnId={columnId}
													options={options}
													selectedAnswer={selectedAnswers[cellId]}
													hasError={errors[cellId]}
													onSelectChange={
														isLocked ? () => {} : handleSelectChange
													}
													disabled={isLocked}
												/>
											)
										})}
									</tr>
								))}
							</React.Fragment>
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

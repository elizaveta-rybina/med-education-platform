import React from 'react'
import { QuizOption, TableCell } from '../model/types' // Импортируйте типы

interface DropdownCellProps {
	cell: TableCell
	allOptions: QuizOption[]
	selectedAnswer?: string
	hasError?: boolean
	isCorrect?: boolean
	isChecked?: boolean
	onSelectChange: (cellKey: string, value: string) => void
	disabled?: boolean
}

export const DropdownCell: React.FC<DropdownCellProps> = ({
	cell,
	allOptions,
	selectedAnswer,
	hasError,
	isCorrect,
	isChecked,
	onSelectChange,
	disabled
}) => {
	// 1. Если тип ячейки текст - просто выводим значение
	if (cell.type === 'text') {
		return (
			<td className='px-4 py-3 border-b border-gray-200 text-gray-800 bg-gray-50/50'>
				{cell.value}
			</td>
		)
	}

	// 2. Если тип select - формируем список доступных опций
	// Фильтруем глобальный список опций по ID, доступным для этой конкретной ячейки
	const cellOptions = cell.available_option_ids
		? allOptions.filter(opt => cell.available_option_ids?.includes(opt.id))
		: []

	// Определение стилей для валидации
	let borderClass = 'border-gray-300'
	let bgClass = 'bg-white'

	if (isChecked) {
		if (hasError) {
			borderClass = 'border-red-500'
			bgClass = 'bg-red-50'
		} else if (isCorrect) {
			borderClass = 'border-green-500'
			bgClass = 'bg-green-50'
		}
	}

	return (
		<td className='px-4 py-2 border-b border-gray-200'>
			<select
				value={selectedAnswer || ''}
				onChange={e =>
					cell.cell_key && onSelectChange(cell.cell_key, e.target.value)
				}
				disabled={disabled}
				className={`w-full px-3 py-2 border ${borderClass} ${bgClass} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-colors ${
					disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
				}`}
			>
				<option value='' disabled>
					Выберите ответ
				</option>
				{cellOptions.map(option => (
					<option key={option.id} value={option.id}>
						{option.text}
					</option>
				))}
			</select>
		</td>
	)
}

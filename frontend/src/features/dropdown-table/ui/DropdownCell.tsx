import React from 'react'
import { DropdownOption } from '../model/types'

interface DropdownCellProps {
	rowId: string
	colIndex: number
	value: string | React.ReactNode
	columnId: string
	options: DropdownOption[]
	selectedAnswer?: string
	hasError?: boolean
	onSelectChange: (rowId: string, colIndex: number, value: string) => void
	disabled?: boolean
}

export const DropdownCell: React.FC<DropdownCellProps> = ({
	rowId,
	colIndex,
	value,
	options,
	selectedAnswer,
	hasError,
	onSelectChange,
	disabled
}) => {
	return (
		<td className={`px-4 py-2 ${hasError ? 'bg-red-50' : ''}`}>
			{colIndex === 0 ? (
				<span className='text-gray-800'>{value}</span>
			) : (
				<select
					value={selectedAnswer || ''}
					onChange={e => onSelectChange(rowId, colIndex, e.target.value)}
					disabled={disabled}
					className={`w-full px-3 py-2 border ${
						hasError ? 'border-red-400' : 'border-gray-300'
					} rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm bg-white ${
						disabled ? 'bg-gray-100 cursor-not-allowed' : ''
					}`}
				>
					<option value='' disabled>
						Выберите ответ
					</option>
					{options?.map(option => (
						<option key={option.id} value={option.id}>
							{option.content}
						</option>
					))}
				</select>
			)}
		</td>
	)
}

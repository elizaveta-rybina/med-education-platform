import React from 'react'

interface MarkAsReadButtonProps {
	isRead: boolean
	onMark: () => void
	disabled?: boolean
}

export const MarkAsReadButton: React.FC<MarkAsReadButtonProps> = ({
	isRead,
	onMark,
	disabled
}) => {
	return (
		<button
			onClick={onMark}
			disabled={disabled || isRead}
			className={`px-4 py-2 rounded-lg transition-all duration-200 ${
				isRead
					? 'bg-green-100 text-green-700 cursor-default'
					: 'bg-purple-500 text-white hover:bg-purple-600'
			} disabled:opacity-60`}
		>
			{isRead ? 'Прочитано' : 'Отметить прочитанным'}
		</button>
	)
}

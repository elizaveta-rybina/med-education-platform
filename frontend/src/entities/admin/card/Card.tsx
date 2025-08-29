import { cn } from '@/shared/lib/utils'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { CardProps } from './types'

export const Card: FC<CardProps> = ({ icon: Icon, label, href, className }) => {
	return (
		<Link
			to={href}
			className={cn(
				'flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
				className
			)}
		>
			<Icon
				className='w-6 h-6 text-purple-600'
				aria-hidden='true'
				data-testid='icon'
			/>
			<span className='text-gray-800 font-medium'>{label}</span>
		</Link>
	)
}

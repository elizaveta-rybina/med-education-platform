import * as React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../data/types'

interface CourseItemProps {
	item: Product
	isMobile: boolean
	setMobileMenuOpen?: (open: boolean) => void
}

const CourseItem: React.FC<CourseItemProps> = ({
	item,
	isMobile,
	setMobileMenuOpen
}) => {
	if (isMobile) {
		return (
			<Link
				to={item.to}
				className='block rounded-lg py-2 pl-6 pr-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors'
				onClick={() => setMobileMenuOpen?.(false)}
			>
				<div className='flex items-center gap-x-4'>
					<item.icon className='h-6 w-6 text-gray-600' aria-hidden={true} />
					<div>
						<span>{item.name}</span>
						<p className='mt-1 text-xs text-gray-600'>{item.description}</p>
					</div>
				</div>
			</Link>
		)
	}

	return (
		<div className='group relative flex items-center gap-x-6 rounded-lg p-4 text-base hover:bg-gray-50 transition-colors'>
			<div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white transition-colors'>
				<item.icon
					className='h-6 w-6 text-gray-600 group-hover:text-purple-500'
					aria-hidden={true}
				/>
			</div>
			<div className='flex-auto'>
				<Link
					to={item.to}
					className='block font-semibold text-gray-900 hover:text-purple-500'
				>
					{item.name}
					<span className='absolute inset-0' />
				</Link>
				<p className='mt-1 text-gray-600'>{item.description}</p>
			</div>
		</div>
	)
}

export default CourseItem

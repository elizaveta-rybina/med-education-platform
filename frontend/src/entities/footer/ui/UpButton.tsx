import arrow from '@/assets/icons/arrow.svg'
import React from 'react'

interface UpButtonProps {
	text?: string
}

export const UpButton: React.FC<UpButtonProps> = ({ text }) => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	return (
		<button
			onClick={scrollToTop}
			aria-label='Scroll to top of page'
			className='w-36 h-36 bg-[#F7E8FF] flex flex-col items-center justify-center rounded-full'
		>
			<img src={arrow} alt='Up icon' className='h-14 w-14' />
			{text && (
				<span className='text-center text-[#7D4F93] text-3xl font-semibold'>
					{text}
				</span>
			)}
		</button>
	)
}

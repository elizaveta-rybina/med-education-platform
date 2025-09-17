import React from 'react'

interface FooterItemProps {
	Icon: string
	text: string[]
}

export const FooterItem: React.FC<FooterItemProps> = ({ Icon, text }) => {
	return (
		<div className='flex flex-col items-start space-y-4'>
			<img src={Icon} alt='Footer icon' className='h-14 w-14' />
			{text.map((item, index) => (
				<span
					className='text-white italic text-2xl/tight font-light '
					key={index}
				>
					{item}
				</span>
			))}
		</div>
	)
}

import React from 'react'

interface FooterItemProps {
	Icon: string
	text: string[]
}

export const FooterItem: React.FC<FooterItemProps> = ({ Icon, text }) => {
	return (
		<div className='flex flex-col items-start space-y-4'>
			<img src={Icon} alt='Footer icon' className='h-14 w-14' />
			{text.map((item, index) => {
				let href = '#'

				if (item.includes('@')) {
					href = `mailto:${item}`
				} else if (item.startsWith('t.me')) {
					href = `https://${item}`
				} else if (item.startsWith('http')) {
					href = item
				} else if (item.trim().length > 0) {
					href = `https://${item}`
				}

				return (
					<a
						href={href}
						target={href.startsWith('http') ? '_blank' : '_self'}
						rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
						className='text-white italic text-2xl/tight font-light'
						key={index}
					>
						{item}
					</a>
				)
			})}
		</div>
	)
}

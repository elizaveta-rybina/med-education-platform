import { useState } from 'react'

const tabs = [
	'Профиль',
	'Мое обучение',
	'Мои покупки',
	'Достижения',
	'Настройки'
]

type TabsSwitcherProps = {
	onTabChange: (tab: string) => void
}

export const TabsSwitcher = ({ onTabChange }: TabsSwitcherProps) => {
	const [selectedTab, setSelectedTab] = useState('Профиль')
	const [isOpen, setIsOpen] = useState(false)

	const handleSelect = (tab: string) => {
		setSelectedTab(tab)
		setIsOpen(false)
		onTabChange(tab)
	}

	return (
		<div className='border-b border-gray-200'>
			{/* Мобильный dropdown */}
			<div className='relative lg:hidden'>
				<button
					onClick={() => setIsOpen(prev => !prev)}
					className='flex items-center justify-between w-full py-4 text-gray-800 text-base font-medium'
				>
					<span>{selectedTab}</span>
					<svg
						className={`ml-3 h-5 w-5 text-gray-400 transition-transform duration-200 ${
							isOpen ? 'rotate-180' : ''
						}`}
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.66a.75.75 0 01-1.08 0l-4.25-4.66a.75.75 0 01.02-1.06z'
							clipRule='evenodd'
						/>
					</svg>
				</button>

				{isOpen && (
					<div className='absolute left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden'>
						{tabs.map(tab => (
							<button
								key={tab}
								onClick={() => handleSelect(tab)}
								className={`w-full px-4 py-3 text-left text-base transition-colors duration-150 ${
									selectedTab === tab
										? 'bg-blue-50 text-blue-600 font-medium'
										: 'text-gray-600 hover:bg-gray-50'
								}`}
							>
								{tab}
							</button>
						))}
					</div>
				)}
			</div>

			{/* Десктопные табы */}
			<div className='hidden lg:flex'>
				{tabs.map(tab => (
					<button
						key={tab}
						onClick={() => handleSelect(tab)}
						className={`relative px-1 mx-3 py-4 text-base font-medium transition-all duration-200 ${
							selectedTab === tab
								? 'text-gray-900'
								: 'text-gray-500 hover:text-gray-700'
						}`}
					>
						{tab}
						<span
							className={`absolute bottom-[-1px] left-0 right-0 h-0.5 transition-all duration-300 ${
								selectedTab === tab
									? 'bg-gray-900 scale-100'
									: 'bg-transparent scale-0'
							}`}
						></span>
					</button>
				))}
			</div>
		</div>
	)
}

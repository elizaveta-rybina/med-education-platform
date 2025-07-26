import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const tabs = [
	{ name: 'Профиль', hash: '#profile' },
	{ name: 'Мои курсы', hash: '#courses' },
	{ name: 'Достижения', hash: '#achievements' },
	{ name: 'Настройки', hash: '#settings' }
]

type TabsSwitcherProps = {
	onTabChange: (tab: string) => void
}

export const TabsSwitcher = ({ onTabChange }: TabsSwitcherProps) => {
	const location = useLocation()
	const [selectedTab, setSelectedTab] = useState(tabs[0].name)
	const [isOpen, setIsOpen] = useState(false)

	// Sync selectedTab with current URL hash
	useEffect(() => {
		const currentHash = location.hash || tabs[0].hash
		const currentTab = tabs.find(tab => tab.hash === currentHash)
		if (currentTab) {
			setSelectedTab(currentTab.name)
			onTabChange(currentTab.name)
		} else {
			// Default to first tab if no valid hash
			setSelectedTab(tabs[0].name)
			window.history.replaceState(null, '', tabs[0].hash)
			onTabChange(tabs[0].name)
		}
	}, [location.hash, onTabChange])

	const handleSelect = (tab: { name: string; hash: string }) => {
		setSelectedTab(tab.name)
		setIsOpen(false)
		window.history.pushState(null, '', tab.hash)
		onTabChange(tab.name)
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
								key={tab.name}
								onClick={() => handleSelect(tab)}
								className={`w-full px-4 py-3 text-left text-base transition-colors duration-150 ${
									selectedTab === tab.name
										? 'bg-blue-50 text-blue-600 font-medium'
										: 'text-gray-600 hover:bg-gray-50'
								}`}
							>
								{tab.name}
							</button>
						))}
					</div>
				)}
			</div>

			{/* Десктопные табы */}
			<div className='hidden lg:flex'>
				{tabs.map(tab => (
					<button
						key={tab.name}
						onClick={() => handleSelect(tab)}
						className={`relative px-1 mx-3 py-4 text-base font-medium transition-all duration-200 ${
							selectedTab === tab.name
								? 'text-gray-900'
								: 'text-gray-500 hover:text-gray-700'
						}`}
					>
						{tab.name}
						<span
							className={`absolute bottom-[-1px] left-0 right-0 h-0.5 transition-all duration-300 ${
								selectedTab === tab.name
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

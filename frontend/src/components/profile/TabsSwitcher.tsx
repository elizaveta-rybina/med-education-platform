import { useState } from 'react'
import { Dropdown } from '../ui/dropdown/Dropdown'
import { DropdownItem } from '../ui/dropdown/DropdownItem'

const tabs = ['Overview', 'Notification', 'Projects', 'Invoice', 'Account']

export const TabsSwitcher = () => {
	const [selectedTab, setSelectedTab] = useState('Overview')
	const [isOpen, setIsOpen] = useState(false)

	const handleSelect = (tab: string) => {
		setSelectedTab(tab)
		setIsOpen(false)
	}

	return (
		<>
			{/* Мобильный/планшетный dropdown */}
			<div className='relative inline-block text-left lg:hidden'>
				<button
					onClick={() => setIsOpen(prev => !prev)}
					className='dropdown-toggle inline-flex justify-between items-center w-48 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none'
				>
					{selectedTab}
					<svg
						className='ml-2 h-4 w-4'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'
						aria-hidden='true'
					>
						<path
							fillRule='evenodd'
							d='M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.66a.75.75 0 01-1.08 0l-4.25-4.66a.75.75 0 01.02-1.06z'
							clipRule='evenodd'
						/>
					</svg>
				</button>

				<Dropdown
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					className='w-48'
				>
					{tabs.map(tab => (
						<DropdownItem key={tab} onItemClick={() => handleSelect(tab)}>
							{tab}
						</DropdownItem>
					))}
				</Dropdown>
			</div>

			{/* Десктопная навигация */}
			<div className='hidden lg:flex gap-4'>
				{tabs.map(tab => (
					<button
						key={tab}
						onClick={() => setSelectedTab(tab)}
						className={`text-sm px-4 py-2 rounded-md ${
							selectedTab === tab
								? 'bg-gray-200 text-gray-900 font-semibold'
								: 'text-gray-600 hover:bg-gray-100'
						}`}
					>
						{tab}
					</button>
				))}
			</div>
		</>
	)
}

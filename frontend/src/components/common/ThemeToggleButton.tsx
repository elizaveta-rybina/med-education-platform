import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import * as React from 'react'
import { useTheme } from '../../context/ThemeContext'

export const ThemeToggleButton: React.FC = () => {
	const { toggleTheme } = useTheme()

	return (
		<button
			onClick={toggleTheme}
			className='relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
			aria-label='Toggle theme'
		>
			<SunIcon className='h-4 w-4 sm:h-5 sm:w-5 dark:hidden' />
			<MoonIcon className='h-4 w-4 sm:h-5 sm:w-5 hidden dark:block' />
		</button>
	)
}

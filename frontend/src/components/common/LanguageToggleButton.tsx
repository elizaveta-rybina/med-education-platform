import { LanguageIcon } from '@heroicons/react/24/outline'
import * as React from 'react'

export const LanguageToggleButton: React.FC = () => {
	const toggleLanguage = () => {
		const currentLang = localStorage.getItem('language') || 'en'
		const newLang = currentLang === 'en' ? 'es' : 'en'
		localStorage.setItem('language', newLang)
		// Add logic to update i18n or reload translations
	}

	return (
		<button
			onClick={toggleLanguage}
			className='relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
			aria-label='Toggle language'
		>
			<LanguageIcon className='h-5 w-5' />
		</button>
	)
}


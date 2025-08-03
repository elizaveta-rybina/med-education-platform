import * as React from 'react'
import { useTranslation } from 'react-i18next'

export const LanguageToggleButton: React.FC = () => {
	const { i18n } = useTranslation()

	const toggleLanguage = () => {
		const currentLang = i18n.language || 'en'
		const newLang = currentLang === 'en' ? 'ru' : 'en'
		i18n
			.changeLanguage(newLang)
			.catch(err => console.error('Failed to change language:', err))
		localStorage.setItem('language', newLang)
	}

	return (
		<button
			onClick={toggleLanguage}
			className='relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
			aria-label='Toggle language'
		>
			<span className='text-base font-semibold'>
				{i18n.language === 'en' ? 'en' : 'ru'}
			</span>
		</button>
	)
}

export default LanguageToggleButton

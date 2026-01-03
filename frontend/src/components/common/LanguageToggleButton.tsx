import * as React from 'react'
import GoogleTranslate from '../GoogleTranslate'

export const LanguageToggleButton: React.FC = () => {
	return (
		<div
			className='relative flex items-center justify-center text-brand-500 transition-all duration-200 
      bg-white border-1.5 border-transparent rounded-lg 
      hover:border-brand-500 hover:bg-brand-25 hover:shadow-theme-sm 
      dark:bg-gray-900/50 dark:text-indigo-400 dark:hover:bg-gray-800 dark:hover:border-indigo-400'
			aria-label='Toggle language'
		>
			{/* Вставляем виджет сюда */}
			<GoogleTranslate />
		</div>
	)
}

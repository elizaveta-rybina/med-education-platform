import * as React from 'react'
import GoogleTranslate from '../GoogleTranslate'

export const LanguageToggleButton: React.FC = () => {

	return (
		<div
			className='relative flex items-center justify-center text-black transition-colors 
      bg-white border border-gray-200 rounded-lg 
      hover:bg-gray-50 
      dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 
      h-10 lg:h-11 px-1' // Убрали w-11, добавили px-1
			aria-label='Toggle language'
		>
			{/* Вставляем виджет сюда */}
			<GoogleTranslate />
		</div>
	)
}

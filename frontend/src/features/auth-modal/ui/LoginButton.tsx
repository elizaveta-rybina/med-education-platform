import React from 'react'
import { useTranslation } from 'react-i18next'

interface LoginButtonProps {
	onClick: () => void
}

export const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
	const { t } = useTranslation('coursePage')
	const isAuthenticated = localStorage.getItem('auth') === 'true'

	const handleClick = () => {
		if (isAuthenticated) {
			localStorage.removeItem('auth')
		}
		onClick()
	}

	return (
		<button
			onClick={handleClick}
			className='block text-black bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center border-gray-200 border-1'
			type='button'
		>
			{isAuthenticated ? t('auth.logout') : t('auth.button')}
		</button>
	)
}

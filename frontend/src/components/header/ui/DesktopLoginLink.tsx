import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const DesktopLoginLink: React.FC = () => {
	const { t } = useTranslation('header')

	return (
		<Link
			to='/signin'
			className='text-base font-semibold text-gray-900 hover:text-purple-500 transition-colors'
			onClick={() => console.log('Navigating to /signin')}
		>
			{t('login')} <span aria-hidden={true}>→</span>
		</Link>
	)
}

export default DesktopLoginLink

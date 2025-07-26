import * as React from 'react'
import { Link } from 'react-router-dom'

const DesktopLoginLink: React.FC = () => {
	return (
		<Link
			to='/signin'
			className='text-base font-semibold text-gray-900 hover:text-purple-500 transition-colors'
			onClick={() => console.log('Navigating to /signin')}
		>
			Войти <span aria-hidden={true}>→</span>
		</Link>
	)
}

export default DesktopLoginLink

import * as React from 'react'
import { Link } from 'react-router-dom'

interface MobileLoginLinkProps {
	setMobileMenuOpen?: (open: boolean) => void
}

const MobileLoginLink: React.FC<MobileLoginLinkProps> = ({
	setMobileMenuOpen
}) => {
	return (
		<div className='py-6'>
			<Link
				to='/signin'
				className='block rounded-lg px-10 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors'
				onClick={() => {
					console.log('Navigating to /signin')
					setMobileMenuOpen?.(false)
				}}
			>
				Войти
			</Link>
		</div>
	)
}

export default MobileLoginLink

import * as React from 'react'
import { Link } from 'react-router-dom'
import { navLinks } from '../data/constants'
import { User } from '../data/types'
import MobileCoursesDropdown from './MobileCoursesDropdown'
import MobileLoginLink from './MobileLoginLink'
import MobileUserDropdown from './MobileUserDropdown'

interface MobileNavProps {
	user: User | null
	handleLogout: () => void
	setMobileMenuOpen?: (open: boolean) => void
}

const MobileNav: React.FC<MobileNavProps> = ({
	user,
	handleLogout,
	setMobileMenuOpen
}) => {
	return (
		<div className='-my-6 divide-y divide-gray-500/10'>
			<div className='space-y-2 py-6'>
				<MobileCoursesDropdown setMobileMenuOpen={setMobileMenuOpen} />
				{navLinks.map(link => (
					<Link
						key={link.name}
						to={link.to}
						className='block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors'
						onClick={() => setMobileMenuOpen?.(false)}
					>
						{link.name}
					</Link>
				))}
				{user && (
					<MobileUserDropdown
						user={user}
						handleLogout={handleLogout}
						setMobileMenuOpen={setMobileMenuOpen}
					/>
				)}
			</div>
			{!user && <MobileLoginLink setMobileMenuOpen={setMobileMenuOpen} />}
		</div>
	)
}

export default MobileNav

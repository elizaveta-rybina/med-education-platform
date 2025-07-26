import * as React from 'react'
import { User } from '../data/types'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

interface NavItemsProps {
	user: User | null
	handleLogout: () => void
	isMobile: boolean
	setMobileMenuOpen?: (open: boolean) => void
}

const NavItems: React.FC<NavItemsProps> = ({
	user,
	handleLogout,
	isMobile,
	setMobileMenuOpen
}) => {
	if (isMobile) {
		return (
			<MobileNav
				user={user}
				handleLogout={handleLogout}
				setMobileMenuOpen={setMobileMenuOpen}
			/>
		)
	}

	return <DesktopNav user={user} handleLogout={handleLogout} />
}

export default NavItems

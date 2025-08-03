import { LanguageToggleButton } from '@/components/common/LanguageToggleButton'
import { ThemeToggleButton } from '@/components/common/ThemeToggleButton'
import { PopoverGroup } from '@headlessui/react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { navLinks } from '../data/constants'
import { User } from '../data/types'
import DesktopCoursesDropdown from './DesktopCoursesDropdown'
import DesktopLoginLink from './DesktopLoginLink'
import DesktopUserDropdown from './DesktopUserDropdown'

interface DesktopNavProps {
	user: User | null
	handleLogout: () => void
}

const DesktopNav: React.FC<DesktopNavProps> = ({ user, handleLogout }) => {
	return (
		<>
			<PopoverGroup className='hidden lg:flex lg:gap-x-12'>
				<DesktopCoursesDropdown />
				{navLinks.map(link => (
					<Link
						key={link.name}
						to={link.to}
						className='text-base font-semibold text-gray-900 hover:text-purple-500 transition-colors'
					>
						{link.name}
					</Link>
				))}
			</PopoverGroup>
			<div className='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4'>
				{user ? (
					<DesktopUserDropdown user={user} handleLogout={handleLogout} />
				) : (
					<div className='flex justify-between items-center gap-x-4'>
						<ThemeToggleButton />
						<LanguageToggleButton />
						<DesktopLoginLink />
					</div>
				)}
			</div>
		</>
	)
}

export default DesktopNav

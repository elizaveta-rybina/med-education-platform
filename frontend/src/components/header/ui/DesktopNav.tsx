import LanguageToggleButton from '@/components/common/LanguageToggleButton'
import { ThemeToggleButton } from '@/components/common/ThemeToggleButton'
import { PopoverGroup } from '@headlessui/react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useNavLinks } from '../data/constants'
import { User } from '../data/types'
import DesktopCoursesDropdown from './DesktopCoursesDropdown'
import DesktopLoginLink from './DesktopLoginLink'
import DesktopUserDropdown from './DesktopUserDropdown'

interface DesktopNavProps {
	user: User | null
	handleLogout: () => void
}

const DesktopNav: React.FC<DesktopNavProps> = ({ user, handleLogout }) => {
	const navLinks = useNavLinks()

	return (
		<>
			<PopoverGroup className='hidden lg:flex lg:gap-x-12'>
				<DesktopCoursesDropdown />
				{navLinks.map(link => (
					<Link
						key={link.name}
						to={link.to}
						className='text-base font-semibold text-gray-900 hover:text-purple-500 transition-colors dark:text-gray-100 dark:hover:text-purple-300'
					>
						{link.name}
					</Link>
				))}
			</PopoverGroup>
			<div className='hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4'>
				{user ? (
					<div className='flex justify-between items-center gap-x-4'>
						<ThemeToggleButton />
						<LanguageToggleButton />
						<DesktopUserDropdown user={user} handleLogout={handleLogout} />
					</div>
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

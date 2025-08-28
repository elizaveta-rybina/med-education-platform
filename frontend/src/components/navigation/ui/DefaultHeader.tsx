import logo from '@/assets/logo.png'
import { LanguageToggleButton } from '@/components/common/LanguageToggleButton'
import { ThemeToggleButton } from '@/components/common/ThemeToggleButton'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SidebarToggleButton } from './SidebarToggleButton'

export const DefaultHeader: React.FC = ({}) => {
	const { t } = useTranslation()

	return (
		<header className='sticky top-0 flex w-full bg-white border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900'>
			<div className='container mx-auto flex items-center justify-between p-4 lg:p-6'>
				{/* Left side: Sidebar Toggle and Logo */}
				<div className='flex items-center gap-4'>
					<SidebarToggleButton />
					<Link to='/' className='p-1.5'>
						<span className='sr-only text-lg'>{t('platformName')}</span>
						<img
							alt={t('logo')}
							src={logo}
							className='h-10 w-auto sm:h-12 lg:h-12 dark:hidden'
						/>
					</Link>
				</div>

				{/* Right side: Buttons and Hamburger Menu */}
				<div className='flex items-center gap-2 sm:gap-4'>
					<div className='flex items-center gap-2 2xsm:gap-3'>
						<ThemeToggleButton />
						<LanguageToggleButton />
					</div>
				</div>

				{/* Mobile Menu Dropdown */}
				{/* {isApplicationMenuOpen && (
					<div className='absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 lg:hidden'>
						<div className='container mx-auto p-4'>
							<div className='flex flex-col gap-4'>
								<div className='flex items-center gap-2'>
									<ThemeToggleButton />
									<LanguageToggleButton />
								</div>
							</div>
						</div>
					</div>
				)} */}
			</div>
		</header>
	)
}

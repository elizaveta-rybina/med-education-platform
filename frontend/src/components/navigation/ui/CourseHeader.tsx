import logo from '@/assets/logo.png'
import { LanguageToggleButton } from '@/components/common/LanguageToggleButton'
import { ThemeToggleButton } from '@/components/common/ThemeToggleButton'
import { useSidebar } from '@/context/SidebarContext'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface CourseHeaderProps {
	isMobileMenuOpen: boolean
	toggleMobileMenu: () => void
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({
	isMobileMenuOpen,
	toggleMobileMenu
}) => {
	const { t } = useTranslation()
	const { isMobileOpen, toggleMobileSidebar, toggleSidebar } = useSidebar()

	const handleSidebarToggle = () => {
		if (window.innerWidth >= 1024) {
			toggleSidebar() // Toggle desktop sidebar (isExpanded)
		} else {
			toggleMobileSidebar() // Toggle mobile sidebar (isMobileOpen)
		}
	}

	return (
		<header className='sticky top-0 flex w-full bg-white border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900 lg:border-b'>
			<div className='flex flex-col items-center justify-between w-full lg:flex-row lg:px-6'>
				<nav
					aria-label='Global'
					className='flex items-center justify-between w-full p-4 lg:p-6'
				>
					{/* Left side: Sidebar Toggle (Three Dots on Mobile) */}
					<button
						onClick={handleSidebarToggle}
						className='flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:w-11 lg:h-11 lg:border lg:border-gray-200 dark:lg:border-gray-800'
						aria-label={isMobileOpen ? 'Закрыть сайдбар' : 'Открыть сайдбар'}
					>
						{isMobileOpen && window.innerWidth < 1024 ? (
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z'
									fill='currentColor'
								/>
							</svg>
						) : (
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z'
									fill='currentColor'
								/>
							</svg>
						)}
					</button>

					{/* Center: Logo */}
					<div className='flex items-center justify-center'>
						<Link to='/' className='p-1.5'>
							<span className='sr-only text-lg'>{t('platformName')}</span>
							<img
								alt={t('logo')}
								src={logo}
								className='h-10 w-auto sm:h-12 lg:h-12 dark:hidden'
							/>
						</Link>
					</div>

					{/* Right side: Hamburger Menu (mobile only) */}
					<div className='flex items-center gap-2 2xsm:gap-3'>
						<div className='hidden lg:flex items-center gap-2'>
							<ThemeToggleButton />
							<LanguageToggleButton />
						</div>
						<button
							onClick={toggleMobileMenu}
							className='flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden'
							aria-label='Toggle Mobile Menu'
						>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z'
									fill='currentColor'
								/>
							</svg>
						</button>
					</div>
				</nav>

				{/* Mobile Menu Dropdown */}
				{isMobileMenuOpen && (
					<div className='flex w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 lg:hidden shadow-theme-md'>
						<div className='container mx-auto p-4'>
							<div className='flex flex-col gap-4'>
								<div className='flex items-center gap-2'>
									<ThemeToggleButton />
									<LanguageToggleButton />
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	)
}

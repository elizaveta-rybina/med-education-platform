import logo from '@/assets/logo.png'
import { LanguageToggleButton } from '@/components/common/LanguageToggleButton'
//import { ThemeToggleButton } from '@/components/common/ThemeToggleButton'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const DefaultHeader: React.FC = ({}) => {
	const { t } = useTranslation()

	return (
		<header className='sticky top-0 flex w-full bg-[#7D4F93]  z-50 h-[68px]'>
			<nav className='container mx-auto flex items-center justify-between p-4 lg:p-6'>
				<div className='flex items-center gap-4'>
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
						{/* <ThemeToggleButton /> */}
						<LanguageToggleButton />
					</div>
				</div>
			</nav>
		</header>
	)
}

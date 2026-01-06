import { LoginButton, LoginModal } from '@/features/auth-modal'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logo from '/assets/logo.png'

interface HeaderProps {
	backgroundColor?: string
}

export const Header: React.FC<HeaderProps> = ({
	backgroundColor = '#7D4F93'
}) => {
	const { t } = useTranslation()
	const [isModalOpen, setIsModalOpen] = useState(false)

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen)
	}

	return (
		<header
			className='sticky top-0 flex w-full z-50 h-[68px]'
			style={{ backgroundColor }}
		>
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
						{/* <LanguageToggleButton /> */}
						<LoginButton onClick={toggleModal} />
					</div>
				</div>
			</nav>
			<LoginModal isOpen={isModalOpen} onClose={toggleModal} />
		</header>
	)
}

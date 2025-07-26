import { selectUser } from '@/app/store/auth/selectors'
import { useAppSelector } from '@/app/store/hooks'
import { useAuthActions } from '@/hooks/auth/useAuthActions'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from 'assets/logo.png'
import * as React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavItems from './NavItems'

export const Header: React.FC = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const user = useAppSelector(selectUser)
	const { logout } = useAuthActions()

	return (
		<header className='bg-white z-20'>
			<nav
				aria-label='Global'
				className='mx-auto flex max-w-7xl items-center justify-between p-4 lg:p-6'
			>
				<div className='flex lg:flex-1'>
					<Link to='/' className='-m-1.5 p-1.5'>
						<span className='sr-only text-lg'>Med Education Platform</span>
						<img alt='Логотип' src={logo} className='h-12 w-auto' />
					</Link>
				</div>
				<div className='flex lg:hidden'>
					<button
						type='button'
						onClick={() => setMobileMenuOpen(true)}
						className='inline-flex items-center justify-center p-3 text-gray-700 hover:text-purple-500 transition-colors'
						aria-label='Открыть меню'
					>
						<Bars3Icon className='h-8 w-8' aria-hidden={true} />
					</button>
				</div>
				<NavItems user={user} handleLogout={logout} isMobile={false} />
			</nav>
			<Dialog
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
				className='lg:hidden'
			>
				<div className='fixed inset-0 z-10 bg-black/30' aria-hidden={true} />
				<Transition
					show={mobileMenuOpen}
					enter='transition ease-out duration-200'
					enterFrom='opacity-0 translate-x-full'
					enterTo='opacity-100 translate-x-0'
					leave='transition ease-in duration-150'
					leaveFrom='opacity-100 translate-x-0'
					leaveTo='opacity-0 translate-x-full'
				>
					<Dialog.Panel className='fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10'>
						<div className='flex items-center justify-between'>
							<Link to='/' className='-m-1.5 p-1.5'>
								<span className='sr-only text-lg'>Med Education Platform</span>
								<img alt='Логотип' src={logo} className='h-10 w-auto' />
							</Link>
							<button
								type='button'
								onClick={() => setMobileMenuOpen(false)}
								className='rounded-md p-3 text-gray-700 hover:text-purple-500 transition-colors'
								aria-label='Закрыть меню'
							>
								<XMarkIcon className='h-8 w-8' aria-hidden={true} />
							</button>
						</div>
						<div className='mt-6 flow-root'>
							<NavItems
								user={user}
								handleLogout={logout}
								isMobile={true}
								setMobileMenuOpen={setMobileMenuOpen}
							/>
						</div>
					</Dialog.Panel>
				</Transition>
			</Dialog>
		</header>
	)
}

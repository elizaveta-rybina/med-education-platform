import { Disclosure, DisclosureButton } from '@headlessui/react'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { User } from '../data/types'

interface MobileUserDropdownProps {
	user: User
	handleLogout: () => void
	setMobileMenuOpen?: (open: boolean) => void
}

const MobileUserDropdown: React.FC<MobileUserDropdownProps> = ({
	user,
	handleLogout,
	setMobileMenuOpen
}) => {
	return (
		<Disclosure as='div' className='-mx-3'>
			{({ open }) => (
				<>
					<DisclosureButton className='flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors'>
						<div className='flex items-center gap-3'>
							{user.avatar ? (
								<img
									src={user.avatar}
									alt='User avatar'
									className='h-8 w-8 rounded-full object-cover'
								/>
							) : (
								<UserIcon
									className='h-8 w-8 text-gray-400 rounded-full bg-gray-200 p-1'
									aria-hidden={true}
								/>
							)}
							<span>{user.name || 'Профиль'}</span>
						</div>
						<ChevronDownIcon
							className={`h-5 w-5 flex-none transform transition-transform ${
								open ? 'rotate-180' : ''
							}`}
							aria-hidden={true}
						/>
					</DisclosureButton>
					<Disclosure.Panel className='mt-2 space-y-2'>
						<Link
							to='/profile'
							className='block rounded-lg py-2 pl-10 pr-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors'
							onClick={() => setMobileMenuOpen?.(false)}
						>
							Перейти в профиль
						</Link>
						<Link
							to='/profile#courses'
							className='block rounded-lg py-2 pl-10 pr-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors'
							onClick={() => setMobileMenuOpen?.(false)}
						>
							Мои курсы
						</Link>
						<Link
							to='/profile#achievements'
							className='block rounded-lg py-2 pl-10 pr-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors'
							onClick={() => setMobileMenuOpen?.(false)}
						>
							Достижения
						</Link>
						<Link
							to='/profile#settings'
							className='block rounded-lg py-2 pl-10 pr-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors'
							onClick={() => setMobileMenuOpen?.(false)}
						>
							Настройки
						</Link>
						<div className='border-t border-gray-200 dark:border-gray-700 my-2' />
						<button
							onClick={() => {
								handleLogout()
								setMobileMenuOpen?.(false)
							}}
							className='block w-full text-left rounded-lg py-2 pl-10 pr-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors'
						>
							Выйти
						</button>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default MobileUserDropdown

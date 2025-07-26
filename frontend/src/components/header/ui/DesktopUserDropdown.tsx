import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition
} from '@headlessui/react'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { User } from '../data/types'

interface DesktopUserDropdownProps {
	user: User
	handleLogout: () => void
}

const DesktopUserDropdown: React.FC<DesktopUserDropdownProps> = ({
	user,
	handleLogout
}) => {
	return (
		<Popover className='relative'>
			{({ open }) => (
				<>
					<PopoverButton className='flex items-center gap-x-1 text-base font-semibold text-gray-900 hover:text-purple-500 transition-colors'>
						{user.avatar ? (
							<img
								src={user.avatar}
								alt='User avatar'
								className='h-8 w-8 rounded-full object-cover mr-2'
							/>
						) : (
							<UserIcon
								className='h-8 w-8 text-gray-400 rounded-full bg-gray-200 p-1 mr-2'
								aria-hidden={true}
							/>
						)}
						<span>{user.name || 'Профиль'}</span>
						<ChevronDownIcon
							className={`h-5 w-5 flex-none transform transition-transform ${
								open ? 'rotate-180' : ''
							}`}
							aria-hidden={true}
						/>
					</PopoverButton>
					<Transition
						as={React.Fragment}
						enter='transition ease-out duration-200'
						enterFrom='opacity-0 translate-y-1'
						enterTo='opacity-100 translate-y-0'
						leave='transition ease-in duration-150'
						leaveFrom='opacity-100 translate-y-0'
						leaveTo='opacity-0 translate-y-1'
					>
						<PopoverPanel className='absolute right-0 top-full z-10 mt-3 w-64 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-800 dark:bg-gray-800'>
							<div className='px-2 mb-2 border-b border-gray-200 pb-2 dark:border-gray-700'>
								<span className='block font-medium text-gray-700 text-base dark:text-gray-300'>
									{user.name || 'Пользователь'}
								</span>
								<span className='block text-xs text-gray-500 dark:text-gray-400'>
									{user.email || 'example@mail.com'}
								</span>
							</div>
							<Link
								to='/profile'
								className='block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200'
							>
								Перейти в профиль
							</Link>
							<Link
								to='/profile#courses'
								className='block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200'
							>
								Мои курсы
							</Link>
							<Link
								to='/profile#achievements'
								className='block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200'
							>
								Достижения
							</Link>
							<Link
								to='/profile#settings'
								className='block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200'
							>
								Настройки
							</Link>
							<div className='border-t border-gray-200 dark:border-gray-700 my-2' />
							<button
								onClick={handleLogout}
								className='block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200'
							>
								Выйти
							</button>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default DesktopUserDropdown

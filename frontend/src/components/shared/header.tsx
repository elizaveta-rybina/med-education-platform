import { selectUser } from '@/app/store/auth/selectors'
import { useAppSelector } from '@/app/store/hooks'
import {
	Dialog,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
	ArrowPathIcon,
	Bars3Icon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
	XMarkIcon
} from '@heroicons/react/24/outline'
import logo from 'assets/logo.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const products = [
	{
		name: 'Теория',
		description: 'Изучайте актуальные медицинские специальности',
		to: '/courses/theory',
		icon: ChartPieIcon
	},
	{
		name: 'Вебинары',
		description: 'Онлайн-мероприятия с ведущими экспертами',
		to: '/courses/webinars',
		icon: CursorArrowRaysIcon
	},
	{
		name: 'Сертификация',
		description: 'Получите сертификаты по завершении курсов',
		to: '/courses/certification',
		icon: FingerPrintIcon
	},
	{
		name: 'Ресурсы',
		description: 'Доступ к учебным материалам и библиотеке',
		to: '/resources',
		icon: SquaresPlusIcon
	},
	{
		name: 'Поддержка',
		description: 'Помощь и консультации от наших специалистов',
		to: '/support',
		icon: ArrowPathIcon
	}
]

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const user = useAppSelector(selectUser)

	return (
		<header className='bg-white z-20'>
			<nav
				aria-label='Global'
				className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
			>
				<div className='flex lg:flex-1'>
					<Link to='/' className='-m-1.5 p-1.5'>
						<img alt='logo' src={logo} className='h-10 w-auto' />
					</Link>
				</div>
				<div className='flex lg:hidden'>
					<button
						type='button'
						onClick={() => setMobileMenuOpen(true)}
						className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
					>
						<span className='sr-only'>Открыть меню</span>
						<Bars3Icon aria-hidden='true' className='size-6 text-black' />
					</button>
				</div>
				<PopoverGroup className='hidden lg:flex lg:gap-x-12'>
					<Popover className='relative'>
						<PopoverButton className='flex items-center gap-x-1 text-base font-semibold text-black'>
							Курсы
							<ChevronDownIcon
								aria-hidden='true'
								className='size-5 flex-none text-gray-400'
							/>
						</PopoverButton>
						<PopoverPanel
							transition
							className='absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in'
						>
							<div className='p-4'>
								{products.map(item => (
									<div
										key={item.name}
										className='group relative flex items-center gap-x-6 rounded-lg p-4 text-base hover:bg-gray-50'
									>
										<div className='flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
											<item.icon
												aria-hidden='true'
												className='size-6 text-gray-600 group-hover:text-purple-500'
											/>
										</div>
										<div className='flex-auto'>
											<Link
												to={item.to}
												className='block font-semibold text-gray-900'
											>
												{item.name}
												<span className='absolute inset-0' />
											</Link>
											<p className='mt-1 text-gray-600'>{item.description}</p>
										</div>
									</div>
								))}
							</div>
						</PopoverPanel>
					</Popover>
					<Link to='/contacts' className='text-base font-semibold text-black'>
						Контакты
					</Link>
					<Link to='/about' className='text-base font-semibold text-black'>
						Подробнее
					</Link>
					<Link to='/company' className='text-base font-semibold text-black'>
						О нас
					</Link>
				</PopoverGroup>
				<div className='hidden lg:flex lg:flex-1 lg:justify-end'>
					{user ? (
						<Link to='/profile' className='text-base font-semibold text-black'>
							Профиль <span aria-hidden='true'>→</span>
						</Link>
					) : (
						<Link
							to='/signin'
							onClick={() => console.log('Navigating to /signin')}
							className='text-base font-semibold text-black'
						>
							Войти <span aria-hidden='true'>→</span>
						</Link>
					)}
				</div>
			</nav>
			<Dialog
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
				className='lg:hidden'
			>
				<div className='fixed inset-0 z-10' />
				<DialogPanel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
					<div className='flex items-center justify-between'>
						<Link to='/' className='-m-1.5 p-1.5'>
							<span className='sr-only'>Ваша компания</span>
							<img alt='logo' src={logo} className='h-8 w-auto' />
						</Link>
						<button
							type='button'
							onClick={() => setMobileMenuOpen(false)}
							className='-m-2.5 rounded-md p-2.5 text-gray-700'
						>
							<span className='sr-only'>Закрыть меню</span>
							<XMarkIcon aria-hidden='true' className='size-6' />
						</button>
					</div>
					<div className='mt-6 flow-root'>
						<div className='-my-6 divide-y divide-gray-500/10'>
							<div className='space-y-2 py-6'>
								<Disclosure as='div' className='-mx-3'>
									<DisclosureButton className='group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'>
										Курсы
										<ChevronDownIcon
											aria-hidden='true'
											className='size-5 flex-none group-data-open:rotate-180'
										/>
									</DisclosureButton>
									<Disclosure.Panel className='mt-2 space-y-2'>
										{products.map(item => (
											<Link
												key={item.name}
												to={item.to}
												className='block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold text-gray-900 hover:bg-gray-50'
											>
												<div className='flex items-center gap-x-4'>
													<item.icon
														aria-hidden='true'
														className='size-6 text-gray-600'
													/>
													<div>
														<span>{item.name}</span>
														<p className='mt-1 text-xs text-gray-600'>
															{item.description}
														</p>
													</div>
												</div>
											</Link>
										))}
									</Disclosure.Panel>
								</Disclosure>
								<Link
									to='/contacts'
									className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
								>
									Контакты
								</Link>
								<Link
									to='/about'
									className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
								>
									Подробнее
								</Link>
								<Link
									to='/company'
									className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
								>
									О нас
								</Link>
							</div>
							<div className='py-6'>
								{user ? (
									<Link
										to='/profile'
										className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
									>
										Профиль
									</Link>
								) : (
									<Link
										to='/signin'
										onClick={() => console.log('Navigating to /signin')}
										className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
									>
										Войти
									</Link>
								)}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	)
}

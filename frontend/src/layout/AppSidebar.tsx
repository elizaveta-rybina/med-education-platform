import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useSidebar } from '../context/SidebarContext'
import { BookIcon, ChevronDownIcon, GridIcon, PageIcon } from '../icons'

type NavItem = {
	name: string
	icon: React.ReactNode
	path?: string
	subItems?: { name: string; path: string; new?: boolean }[]
}

const navItems: NavItem[] = [
	{
		icon: <GridIcon />,
		name: 'Главная',
		path: '/admin/dashboard'
	},
	{
		icon: <PageIcon />,
		name: 'Курсы',
		subItems: [
			{ name: 'Все курсы', path: '/admin/courses' },
			{ name: 'Создать курс', path: '/admin/courses/new' }
		]
	}
]

const othersItems: NavItem[] = [
	{
		icon: <BookIcon />,
		name: 'Конструктор игр',
		path: '/games'
	}
]

const AppSidebar: React.FC = () => {
	const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
	const location = useLocation()

	const [openSubmenu, setOpenSubmenu] = useState<{
		type: 'main' | 'others'
		index: number
	} | null>(null)
	const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
	const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

	const isActive = useCallback(
		(path: string) => location.pathname === path,
		[location.pathname]
	)

	useEffect(() => {
		let submenuMatched = false
		;['main', 'others'].forEach(menuType => {
			const items = menuType === 'main' ? navItems : othersItems
			items.forEach((nav, index) => {
				if (nav.subItems) {
					nav.subItems.forEach(subItem => {
						if (isActive(subItem.path)) {
							setOpenSubmenu({
								type: menuType as 'main' | 'others',
								index
							})
							submenuMatched = true
						}
					})
				}
			})
		})

		if (!submenuMatched) {
			setOpenSubmenu(null)
		}
	}, [location, isActive])

	useEffect(() => {
		if (openSubmenu !== null) {
			const key = `${openSubmenu.type}-${openSubmenu.index}`
			if (subMenuRefs.current[key]) {
				setSubMenuHeight(prevHeights => ({
					...prevHeights,
					[key]: subMenuRefs.current[key]?.scrollHeight || 0
				}))
			}
		}
	}, [openSubmenu])

	const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
		setOpenSubmenu(prevOpenSubmenu => {
			if (
				prevOpenSubmenu &&
				prevOpenSubmenu.type === menuType &&
				prevOpenSubmenu.index === index
			) {
				return null
			}
			return { type: menuType, index }
		})
	}

	const renderMenuItems = (items: NavItem[], menuType: 'main' | 'others') => (
		<ul className='flex flex-col gap-1'>
			{items.map((nav, index) => (
				<li key={nav.name}>
					{nav.subItems ? (
						<button
							onClick={() => handleSubmenuToggle(index, menuType)}
							className={`flex items-center w-full px-4 py-3 text-sm rounded-lg transition-colors ${
								openSubmenu?.type === menuType && openSubmenu?.index === index
									? 'bg-purple-50 text-perple-600 dark:bg-purple-900/20 dark:text-purple-400'
									: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
							} ${
								!isExpanded && !isHovered
									? 'lg:justify-center'
									: 'lg:justify-start'
							}`}
						>
							<span className='flex-shrink-0'>{nav.icon}</span>
							{(isExpanded || isHovered || isMobileOpen) && (
								<>
									<span className='ml-3'>{nav.name}</span>
									<ChevronDownIcon
										className={`ml-auto w-4 h-4 transition-transform duration-200 ${
											openSubmenu?.type === menuType &&
											openSubmenu?.index === index
												? 'rotate-180'
												: ''
										}`}
									/>
								</>
							)}
						</button>
					) : (
						nav.path && (
							<Link
								to={nav.path}
								className={`flex items-center w-full px-4 py-3 text-sm rounded-lg transition-colors ${
									isActive(nav.path)
										? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
										: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
								} ${
									!isExpanded && !isHovered
										? 'lg:justify-center'
										: 'lg:justify-start'
								}`}
							>
								<span className='flex-shrink-0'>{nav.icon}</span>
								{(isExpanded || isHovered || isMobileOpen) && (
									<span className='ml-3'>{nav.name}</span>
								)}
							</Link>
						)
					)}
					{nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
						<div
							ref={el => {
								subMenuRefs.current[`${menuType}-${index}`] = el
							}}
							className='overflow-hidden transition-all duration-300'
							style={{
								height:
									openSubmenu?.type === menuType && openSubmenu?.index === index
										? `${subMenuHeight[`${menuType}-${index}`]}px`
										: '0px'
							}}
						>
							<ul className='py-1 pl-12 space-y-1'>
								{nav.subItems.map(subItem => (
									<li key={subItem.name}>
										<Link
											to={subItem.path}
											className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
												isActive(subItem.path)
													? 'text-purple-600 dark:text-purple-400'
													: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
											}`}
										>
											{subItem.name}
											{subItem.new && (
												<span className='ml-auto px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'>
													new
												</span>
											)}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</li>
			))}
		</ul>
	)

	return (
		<aside
			className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-3 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? 'w-64' : isHovered ? 'w-64' : 'w-20'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
			onMouseEnter={() => !isExpanded && setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className='flex flex-col h-full overflow-y-auto'>
				<div
					className={`py-6 flex ${
						!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
					}`}
				>
					<Link to='/admin'>
						{isExpanded || isHovered || isMobileOpen ? (
							<span className='text-xl font-bold text-purple-600 dark:text-purple-400'>
								Доктор VR
							</span>
						) : (
							<span className='text-xl font-bold text-purple-600 dark:text-purple-400'>
								Dr.VR
							</span>
						)}
					</Link>
				</div>

				<nav className='flex-1 space-y-6'>
					<div>{renderMenuItems(navItems, 'main')}</div>

					<div className='pt-4 border-t border-gray-200 dark:border-gray-800'>
						{renderMenuItems(othersItems, 'others')}
					</div>
				</nav>

				<div className='p-4 mt-auto text-xs text-gray-500 dark:text-gray-400'>
					{isExpanded || isHovered || isMobileOpen ? 'EduSystem v1.0' : 'v1.0'}
				</div>
			</div>
		</aside>
	)
}

export default AppSidebar

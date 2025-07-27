import { useCourse } from '@/hooks/useCourse'
import { useEffect, useState } from 'react'
import { FaBars, FaCheckCircle, FaRegCircle, FaTimes } from 'react-icons/fa'

const SideBarCourse = () => {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [currentHash, setCurrentHash] = useState('')
	const { course } = useCourse()

	const toggleSidebar = () => setIsCollapsed(!isCollapsed)

	// Следим за изменением хэша
	useEffect(() => {
		const handleHashChange = () => {
			setCurrentHash(window.location.hash.substring(1))
		}

		// Инициализация при монтировании
		handleHashChange()

		window.addEventListener('hashchange', handleHashChange)
		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [])

	// Собираем все главы из всех модулей
	const allChapters = course.modules.flatMap(module => module.chapters)

	if (isCollapsed) {
		return (
			<button
				onClick={toggleSidebar}
				className='relative left-0 z-30 bg-white p-3 border border-r-0 border-gray-200 h-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-all'
			>
				<FaBars className='w-5 h-5 text-gray-600' />
			</button>
		)
	}

	return (
		<div className='w-72 bg-white h-max border-r border-gray-200 flex flex-col h-full border-t-1'>
			<div className='flex justify-between items-center p-4 border-b border-gray-200'>
				<h2 className='text-lg font-semibold text-gray-800'>{course.title}</h2>
				<button
					onClick={toggleSidebar}
					className='text-gray-400 hover:text-gray-600 transition-colors'
					aria-label='Скрыть меню'
				>
					<FaTimes className='w-5 h-5' />
				</button>
			</div>

			<div className='flex-1 overflow-y-auto'>
				<nav>
					<ul className='divide-y divide-gray-200'>
						{allChapters.map(chapter => (
							<li key={chapter.id}>
								<a
									href={`#${chapter.hash}`}
									className={`w-full flex items-start p-4 hover:bg-gray-50 text-left transition-colors ${
										chapter.isRead ? 'bg-green-50' : ''
									} ${currentHash === chapter.hash ? 'bg-gray-100' : ''}`}
								>
									<span className='mt-0.5 mr-3 flex-shrink-0'>
										{chapter.isRead ? (
											<FaCheckCircle className='text-green-500 w-5 h-5' />
										) : (
											<FaRegCircle className='text-gray-300 w-5 h-5' />
										)}
									</span>
									<span
										className={`text-sm ${
											chapter.isRead ? 'text-gray-500' : 'text-gray-800'
										} ${currentHash === chapter.hash ? 'font-medium' : ''}`}
									>
										{chapter.title}
									</span>
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default SideBarCourse

import { useCourse } from '@/hooks/useCourse'
import { useEffect, useState } from 'react'
import {
	FaArrowLeft,
	FaArrowRight,
	FaCheckCircle,
	FaRegCircle
} from 'react-icons/fa'

const SideBarCourse = () => {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [currentHash, setCurrentHash] = useState('')
	const { course } = useCourse()

	// Toggle sidebar collapse state
	const toggleSidebar = () => setIsCollapsed(!isCollapsed)

	// Handle hash changes for navigation
	useEffect(() => {
		const handleHashChange = () => {
			setCurrentHash(window.location.hash.substring(1))
		}

		handleHashChange()
		window.addEventListener('hashchange', handleHashChange)
		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [])

	// Flatten chapters from all modules
	const allChapters = course.modules.flatMap(module => module.chapters)

	return (
		<div className='flex h-max border-t-1'>
			{/* Collapsed state: vertical button spanning content height */}
			{isCollapsed && (
				<button
					onClick={toggleSidebar}
					className='flex items-center justify-center w-12 bg-white border-r border-gray-200 hover:bg-gray-100 transition-all duration-300 h-full border-t-1'
					aria-label='Развернуть меню'
				>
					<FaArrowRight className='w-5 h-10 text-gray-600' />
				</button>
			)}

			{/* Sidebar */}
			<div
				className={`bg-white h-full border-r border-gray-200 transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-0 overflow-hidden' : 'w-80'}`}
			>
				{/* Header */}
				<div className='flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50'>
					<h2 className='text-lg font-bold text-gray-800 truncate'>
						{course.title}
					</h2>
					<button
						onClick={toggleSidebar}
						className='text-gray-500 hover:text-gray-700 transition-colors'
						aria-label='Свернуть меню'
					>
						<FaArrowLeft className='w-5 h-5' />
					</button>
				</div>

				{/* Chapters list */}
				<div className='p-2'>
					<nav>
						<ul className='space-y-1'>
							{allChapters.map(chapter => (
								<li key={chapter.id}>
									<a
										href={`#${chapter.hash}`}
										className={`flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200
                      ${chapter.isRead ? 'bg-green-50' : ''} 
                      ${
												currentHash === chapter.hash
													? 'bg-gray-200 font-medium'
													: ''
											}`}
									>
										<span className='mr-3 flex-shrink-0'>
											{chapter.isRead ? (
												<FaCheckCircle className='text-green-500 w-5 h-5' />
											) : (
												<FaRegCircle className='text-gray-400 w-5 h-5' />
											)}
										</span>
										<span
											className={`text-sm leading-tight ${
												chapter.isRead ? 'text-gray-600' : 'text-gray-800'
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
		</div>
	)
}

export default SideBarCourse

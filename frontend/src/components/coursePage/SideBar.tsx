import { useSidebar } from '@/context/SidebarContext'
import { useCourse } from '@/hooks/useCourse'
import { useEffect, useState } from 'react'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

const SideBarCourse = () => {
	const { isMobileOpen, isExpanded, toggleMobileSidebar, toggleSidebar } =
		useSidebar()
	const [currentHash, setCurrentHash] = useState('')
	const { course } = useCourse()

	useEffect(() => {
		const handleHashChange = () => {
			setCurrentHash(window.location.hash.substring(1))
		}

		handleHashChange()
		window.addEventListener('hashchange', handleHashChange)
		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [])

	const allChapters = course.modules.flatMap(module => module.chapters)

	// Toggle function based on screen size
	const handleToggle = () => {
		if (window.innerWidth >= 1024) {
			toggleSidebar() // Toggle desktop sidebar (isExpanded)
		} else {
			toggleMobileSidebar() // Toggle mobile sidebar (isMobileOpen)
		}
	}

	return (
		<aside
			className={`bg-white dark:bg-gray-900 dark:border-gray-800 min-h-screen transition-all duration-300 ease-in-out border-r border-gray-200 ${
				isMobileOpen ? 'block w-full' : 'hidden'
			} lg:block ${isExpanded ? 'w-80' : 'w-12'}`}
		>
			<div className='flex flex-col h-full overflow-y-auto'>
				{/* Header */}
				<div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800'>
					{(isExpanded || isMobileOpen) && (
						<h2 className='text-lg font-bold text-gray-800 dark:text-gray-200 truncate'>
							{course.title}
						</h2>
					)}
					<button
						onClick={handleToggle}
						className='flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800'
						aria-label={
							isExpanded || isMobileOpen ? 'Свернуть меню' : 'Развернуть меню'
						}
					>
						{isExpanded || isMobileOpen ? (
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
								width='16'
								height='12'
								viewBox='0 0 16 12'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z'
									fill='currentColor'
								/>
							</svg>
						)}
					</button>
				</div>

				{/* Chapters list */}
				{(isExpanded || isMobileOpen) && (
					<nav className='flex-1 p-2'>
						<ul className='space-y-1'>
							{allChapters.map(chapter => (
								<li key={chapter.id}>
									<a
										href={`#${chapter.hash}`}
										className={`flex items-center w-full px-4 py-3 text-sm rounded-lg transition-colors ${
											currentHash === chapter.hash
												? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
												: chapter.isRead
												? 'bg-green-50 text-gray-600 dark:bg-green-900/20 dark:text-gray-300'
												: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
										}`}
									>
										<span className='flex-shrink-0 mr-3'>
											{chapter.isRead ? (
												<FaCheckCircle className='text-green-500 w-5 h-5' />
											) : (
												<FaRegCircle className='text-gray-400 w-5 h-5' />
											)}
										</span>
										<span
											className={`text-sm leading-tight ${
												currentHash === chapter.hash ? 'font-medium' : ''
											}`}
										>
											{chapter.title}
										</span>
									</a>
								</li>
							))}
						</ul>
					</nav>
				)}

				{/* Footer */}
				{(isExpanded || isMobileOpen) && (
					<div className='p-4 mt-auto text-xs text-gray-500 dark:text-gray-400'>
						Course v1.0
					</div>
				)}
			</div>
		</aside>
	)
}

export default SideBarCourse

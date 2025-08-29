import { Content, SideBarCourse } from '@/components/courseInner'
import { CourseHeader } from '@/components/navigation/ui/CourseHeader'
import { CourseProvider } from '@/context/CourseContext'
import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import { useState } from 'react'

const Backdrop: React.FC = () => {
	const { isMobileOpen, toggleMobileSidebar } = useSidebar()

	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
				isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
			onClick={toggleMobileSidebar}
		/>
	)
}

const CourseLayoutContent: React.FC = () => {
	const { isExpanded, isHovered, isMobileOpen } = useSidebar()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(prev => !prev)
	}

	return (
		<div className='min-h-screen xl:flex'>
			<div>
				<SideBarCourse />
				<Backdrop />
			</div>
			<div
				className={`flex-1 transition-all duration-300 ease-in-out ${
					isExpanded || isHovered ? 'lg:ml-[320px]' : 'lg:ml-[48px]'
				} ${isMobileOpen ? 'ml-0' : ''}`}
			>
				<CourseHeader
					isMobileMenuOpen={isMobileMenuOpen}
					toggleMobileMenu={toggleMobileMenu}
				/>
				<div className='max-w-[1536px]'>
					<Content />
				</div>
			</div>
		</div>
	)
}

const CourseInnerPage: React.FC = () => {
	return (
		<CourseProvider>
			<SidebarProvider>
				<CourseLayoutContent />
			</SidebarProvider>
		</CourseProvider>
	)
}

export default CourseInnerPage

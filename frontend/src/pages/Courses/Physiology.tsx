import { Content, SideBarCourse } from '@/components/coursePage'
import { CourseProvider } from '@/context/CourseContext'
import { SidebarProvider } from '@/context/SidebarContext'

const CourseInnerPage = () => {
	return (
		<CourseProvider>
			<SidebarProvider>
				<div className='flex min-h-screen w-full'>
					<SideBarCourse />
					<main className='flex-1'>
						<Content />
					</main>
				</div>
			</SidebarProvider>
		</CourseProvider>
	)
}

export default CourseInnerPage

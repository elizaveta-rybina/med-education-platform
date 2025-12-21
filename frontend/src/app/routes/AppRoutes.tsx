import { ErrorBoundary, ScrollToTop } from '@/components/common'
import AdminLayout from '@/layout/AdminLayout'
import AppLayout from '@/layout/AppLayout'
import { CoursePage, NotFound } from '@/pages'
import { CourseAll } from '@/pages/Admin/CourseAll'
import CourseCreatePage from '@/pages/Admin/CourseCreatePage'
import CourseEditPage from '@/pages/Admin/CourseEditPage'
import CourseViewPage from '@/pages/Admin/CourseViewPage'
import ModuleViewPage from '@/pages/Admin/ModuleViewPage'
import TopicContentPage from '@/pages/Admin/TopicContentPage'
import { SignIn } from '@/pages/AuthPages'
import CourseInnerPage from '@/pages/Courses/Physiology'
import HomeAdmin from '@/pages/Dashboard/Home'
import GDevelopEditor from '@/pages/GDevelop/GDevelopEditor'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const router = createBrowserRouter([
	{
		element: (
			<ErrorBoundary>
				<ScrollToTop />
				<AppLayout />
			</ErrorBoundary>
		),
		children: [
			{ path: '/', element: <CoursePage /> },
			{
				path: '/course/:courseId',
				element: (
					<ProtectedRoute>
						<CourseInnerPage />
					</ProtectedRoute>
				)
			}
		]
	},
	{
		element: (
			<ErrorBoundary>
				<ScrollToTop />
				<AdminLayout />
			</ErrorBoundary>
		),
		children: [
			{
				path: '/admin/dashboard',
				element: (
					<ProtectedRoute>
						<HomeAdmin />
					</ProtectedRoute>
				)
			},
			{
				path: '/admin/courses',
				element: (
					<ProtectedRoute>
						<CourseAll />
					</ProtectedRoute>
				)
			},
			{
				path: '/admin/courses/:courseId',
				element: (
					<ProtectedRoute>
						<CourseViewPage />
					</ProtectedRoute>
				)
			},
			{
				path: '/admin/courses/new',
				element: (
					<ProtectedRoute>
						<CourseCreatePage />
					</ProtectedRoute>
				)
			},
			{
				path: '/admin/courses/:courseId/edit',
				element: (
					<ProtectedRoute>
						<CourseEditPage />
					</ProtectedRoute>
				)
			},
			{
				path: '/admin/modules/:moduleId',
				element: (
					<ProtectedRoute>
						<ModuleViewPage />
					</ProtectedRoute>
				)
			},
			{
				path: '/admin/topics/:topicId',
				element: (
					<ProtectedRoute>
						<TopicContentPage />
					</ProtectedRoute>
				)
			}
		]
	},
	{ path: '/admin', element: <SignIn /> },
	{ path: '/games', element: <GDevelopEditor /> },
	{ path: '*', element: <NotFound /> }
])

export const AppRouter = () => {
	return (
		<ErrorBoundary>
			<RouterProvider router={router} />
		</ErrorBoundary>
	)
}

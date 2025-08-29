import { ErrorBoundary, ScrollToTop } from '@/components/common'
import AdminLayout from '@/layout/AdminLayout'
import AppLayout from '@/layout/AppLayout'
import { CoursePage, NotFound } from '@/pages'
import { CourseAll } from '@/pages/Admin/CourseAll'
import CourseCreatePage from '@/pages/Admin/CourseCreatePage'
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
				element: <CourseInnerPage />
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
				path: '/admin/courses/new',
				element: (
					<ProtectedRoute>
						<CourseCreatePage />
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

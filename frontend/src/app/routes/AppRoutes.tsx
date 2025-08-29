import ErrorBoundary from '@/components/common/ErrorBoundary'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import AdminLayout from '@/layout/AdminLayout'
import AppLayout from '@/layout/AppLayout'
import { CoursePage, NotFound } from '@/pages'
import { CourseAll } from '@/pages/Admin/CourseAll'
import CourseCreatePage from '@/pages/Admin/CourseCreatePage'
import StudentUsers from '@/pages/Admin/StudentUsers'
import TeacherUsers from '@/pages/Admin/TeacherUsers'
import SignIn from '@/pages/AuthPages/SignIn'
import SignUp from '@/pages/AuthPages/SignUp'
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
				path: '/admin/teachers',
				element: (
					<ProtectedRoute>
						<TeacherUsers />
					</ProtectedRoute>
				)
			},
			{
				path: '/admin/students',
				element: (
					<ProtectedRoute>
						<StudentUsers />
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
	{ path: '/signup', element: <SignUp /> },
	{ path: '*', element: <NotFound /> }
])

export const AppRouter = () => {
	return (
		<ErrorBoundary>
			<RouterProvider router={router} />
		</ErrorBoundary>
	)
}

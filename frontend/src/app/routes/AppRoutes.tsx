import AuthProvider from '@/app/providers/AuthProvider'
import { selectUser } from '@/app/store/auth/selectors'
import { useAppSelector } from '@/app/store/hooks'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import AdminLayout from '@/layout/AdminLayout'
import AppLayout from '@/layout/AppLayout'
import { CoursePage, HomePage, NotFound } from '@/pages'
import PersonalAccountStudent from '@/pages/Account/PersonalAccountStudent'
import CourseCreatePage from '@/pages/Admin/CourseCreatePage'
import StudentUsers from '@/pages/Admin/StudentUsers'
import TeacherUsers from '@/pages/Admin/TeacherUsers'
import SignIn from '@/pages/AuthPages/SignIn'
import SignUp from '@/pages/AuthPages/SignUp'
import CourseInnerPage from '@/pages/Courses/Physiology'
import HomeAdmin from '@/pages/Dashboard/Home'
import GDevelopEditor from '@/pages/GDevelop/GDevelopEditor'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

// Компонент для защиты маршрутов
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useAppSelector(selectUser)
	return user ? <>{children}</> : <Navigate to='/signin' replace />
}

const router = createBrowserRouter([
	{
		element: (
			<ErrorBoundary>
				<AuthProvider>
					<ScrollToTop />
					<AppLayout />
				</AuthProvider>
			</ErrorBoundary>
		),
		children: [
			{
				path: '/',
				element: <HomePage />
			},
			{
				path: '/course/:id',
				element: <CoursePage /> // No ProtectedRoute, accessible to all
			},
			{
				path: '/course/physiology',
				element: (
					<ProtectedRoute>
						<CourseInnerPage /> // Protect inner content
					</ProtectedRoute>
				)
			},
			{
				path: '/profile',
				element: (
					<ProtectedRoute>
						<PersonalAccountStudent />
					</ProtectedRoute>
				)
			}
		]
	},
	{
		element: (
			<ErrorBoundary>
				<AuthProvider>
					<ScrollToTop />
					<AdminLayout />
				</AuthProvider>
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
				path: '/admin/courses/new',
				element: (
					<ProtectedRoute>
						<CourseCreatePage />
					</ProtectedRoute>
				)
			}
		]
	},
	{
		path: '/signin',
		element: (
			<AuthProvider>
				<SignIn />
			</AuthProvider>
		)
	},
	{
		path: '/games',
		element: (
			<AuthProvider>
				<GDevelopEditor />
			</AuthProvider>
		)
	},
	{
		path: '/signup',
		element: (
			<AuthProvider>
				<SignUp />
			</AuthProvider>
		)
	},
	// Fallback route
	{
		path: '*',
		element: (
			<AuthProvider>
				<NotFound />
			</AuthProvider>
		)
	}
])

export const AppRouter = () => {
	return <RouterProvider router={router} />
}

import { ReactNode, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
	children: ReactNode
}

export const ADMIN_STORAGE_KEY = 'admin_access_granted'

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const location = useLocation()
	const isAdminRoute = location.pathname.startsWith('/admin')

	useEffect(() => {
		if (isAdminRoute) {
			const metaRobots = document.createElement('meta')
			metaRobots.name = 'robots'
			metaRobots.content = 'noindex, nofollow'
			document.head.appendChild(metaRobots)

			return () => {
				document.head.removeChild(metaRobots)
			}
		}
	}, [isAdminRoute])

	if (!isAdminRoute) {
		return <>{children}</>
	}

	const hasAccess = localStorage.getItem(ADMIN_STORAGE_KEY) === 'true'

	if (!hasAccess) {
		const redirectTo = location.pathname + location.search
		return (
			<Navigate
				to={`/signin?redirectTo=${encodeURIComponent(redirectTo)}`}
				replace
			/>
		)
	}

	return <>{children}</>
}

export default ProtectedRoute

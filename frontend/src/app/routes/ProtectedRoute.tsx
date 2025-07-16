import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/app/store/hooks'
import { selectUser, selectAuthStatus } from '@/app/store/auth/selectors'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
	children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const user = useAppSelector(selectUser)
	const status = useAppSelector(selectAuthStatus)
	const location = useLocation()

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	if (!user) {
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

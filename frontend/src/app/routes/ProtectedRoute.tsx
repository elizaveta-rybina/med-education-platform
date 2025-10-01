// import { selectAuthStatus, selectUser } from '@/app/store/auth/selectors'
// import { useAppSelector } from '@/app/store/hooks'
// import { ReactNode } from 'react'
// import { Navigate, useLocation } from 'react-router-dom'

// interface ProtectedRouteProps {
// 	children: ReactNode
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
// 	const user = useAppSelector(selectUser)
// 	const status = useAppSelector(selectAuthStatus)
// 	const location = useLocation()

// 	// console.log('ProtectedRoute:', {
// 	// 	status,
// 	// 	user,
// 	// 	pathname: location.pathname,
// 	// 	localStorage: localStorage.getItem('persist:auth')
// 	// })

// 	if (status === 'loading') {
// 		return <div>Loading...</div>
// 	}

// 	if (!user) {
// 		const redirectTo = location.pathname + location.search
// 		console.log('Redirecting to signin, no user found:', { redirectTo })
// 		return (
// 			<Navigate
// 				to={`/signin?redirectTo=${encodeURIComponent(redirectTo)}`}
// 				replace
// 			/>
// 		)
// 	}

// 	return <>{children}</>
// }

// export default ProtectedRoute

import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
	children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const location = useLocation()
	const isAuthenticated = localStorage.getItem('auth') === 'true'

	if (!isAuthenticated) {
		const redirectTo = location.pathname + location.search
		console.log('Redirecting to root, no auth found:', { redirectTo })
		return <Navigate to='/' replace />
	}

	return <>{children}</>
}

export default ProtectedRoute

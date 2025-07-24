import { clearAuthToken, setAuthToken } from '@/app/api/client'
import { ApiError } from '@/app/api/errorHandler'
import { LoginData } from '@/app/store/auth/model'
import {
	clearError,
	resetAuthState,
	setRememberedEmail
} from '@/app/store/auth/slice'
import { fetchUser, login, logout } from '@/app/store/auth/thunks'
import { useAppDispatch } from '@/app/store/hooks'
import { useCallback } from 'react'
import {
	useLocation,
	useNavigate,
	NavigateFunction,
	Location
} from 'react-router-dom'

export const useAuthActions = () => {
	const dispatch = useAppDispatch()
	let navigate: NavigateFunction | undefined
	let location: Location | undefined

	try {
		navigate = useNavigate()
		location = useLocation()
	} catch (err) {
		console.warn(
			'useNavigate/useLocation not available in useAuthActions. Ensure this hook is used within RouterProvider.',
			err
		)
	}

	const handleLogin = useCallback(
		async (data: LoginData) => {
			try {
				const result = await dispatch(login(data)).unwrap()
				setAuthToken(result.loginData.token)
				await dispatch(fetchUser()).unwrap()
				if (navigate && location) {
					const query = new URLSearchParams(location.search)
					const redirectTo =
						query.get('redirectTo') ||
						(data.email.toLowerCase() === 'admin@example.com'
							? '/admin/dashboard'
							: '/profile')
					navigate(redirectTo)
				} else {
					console.warn('Navigation skipped: navigate or location not available')
				}
			} catch (err) {
				const errorMessage =
					err instanceof ApiError ? err.message : 'Failed to login'
				throw new ApiError(
					errorMessage,
					err instanceof ApiError ? err.statusCode : 500,
					'LoginError'
				)
			}
		},
		[dispatch, navigate, location]
	)

	const handleLogout = useCallback(async () => {
		try {
			await dispatch(logout()).unwrap()
			dispatch(resetAuthState())
			clearAuthToken()
			if (navigate) {
				navigate('/signin')
			} else {
				console.warn('Navigation skipped: navigate not available')
			}
		} catch (err) {
			const errorMessage =
				err instanceof ApiError ? err.message : 'Failed to logout'
			throw new ApiError(
				errorMessage,
				err instanceof ApiError ? err.statusCode : 500,
				'LogoutError'
			)
		}
	}, [dispatch, navigate])

	const handleSetRememberedEmail = useCallback(
		(email: string) => {
			dispatch(setRememberedEmail(email))
		},
		[dispatch]
	)

	const handleClearError = useCallback(() => {
		dispatch(clearError())
	}, [dispatch])

	return {
		login: handleLogin,
		logout: handleLogout,
		setRememberedEmail: handleSetRememberedEmail,
		clearError: handleClearError
	}
}

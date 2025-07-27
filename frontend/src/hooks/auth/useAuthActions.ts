import { clearAuthToken, setAuthToken } from '@/app/api/client'
import { ApiError } from '@/app/api/errorHandler'
import { AppDispatch } from '@/app/store'
import { LoginData, User } from '@/app/store/auth/model'
import {
	clearError,
	resetAuthState,
	setRememberedEmail
} from '@/app/store/auth/slice'
import { fetchUser, login, logout } from '@/app/store/auth/thunks'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export const useAuthActions = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const location = useLocation()
	const [localError, setLocalError] = useState<string | null>(null)

	const handleLogin = useCallback(
		async (data: LoginData) => {
			setLocalError(null)
			try {
				const loginResult = await dispatch(login(data)).unwrap()
				setAuthToken(loginResult.loginData.token)
				console.log('Token set after login:', localStorage.getItem('token'))

				const userResult = (await dispatch(fetchUser()).unwrap()) as User

				const redirectTo =
					new URLSearchParams(location.search).get('redirectTo') ||
					(userResult.roles.includes('admin') ? '/admin/dashboard' : '/profile')
				navigate(redirectTo)
				return userResult
			} catch (err) {
				const error = err as ApiError
				const errorMessage = error.message || 'Не удалось войти'
				setLocalError(errorMessage)
				throw new ApiError(errorMessage, error.statusCode || 500, 'LoginError')
			}
		},
		[dispatch, navigate, location]
	)

	const handleLogout = useCallback(async () => {
		try {
			await dispatch(logout()).unwrap()
		} catch (err) {
			console.warn('Logout API call failed:', err)
		} finally {
			dispatch(resetAuthState())
			clearAuthToken()
			navigate('/signin')
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
		setLocalError(null)
	}, [dispatch])

	return {
		login: handleLogin,
		logout: handleLogout,
		setRememberedEmail: handleSetRememberedEmail,
		clearError: handleClearError,
		error: localError
	}
}

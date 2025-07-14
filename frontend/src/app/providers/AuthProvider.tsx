import { clearAuthToken, setAuthToken } from '@/app/api/client'
import { ApiError } from '@/app/api/errorHandler'
import { LoginData, LoginResponse, User } from '@/app/store/auth/model'
import { selectAuth } from '@/app/store/auth/selectors'
import {
	clearError,
	resetAuthState,
	setRememberedEmail
} from '@/app/store/auth/slice'
import { fetchUser, login, logout } from '@/app/store/auth/thunks'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { AuthContext } from '@/context/AuthContext'
import { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Interface for AuthContext value
 */
interface AuthContextValue {
	user: User | null
	authToken: LoginResponse | null
	rememberedEmail: string | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
	login: (data: LoginData) => Promise<void>
	logout: () => Promise<void>
	setRememberedEmail: (email: string) => void
	clearError: () => void
}

/**
 * Props for AuthProvider component
 */
interface AuthProviderProps {
	children: ReactNode
}

/**
 * AuthProvider component to manage authentication context
 */
const AuthProvider = ({ children }: AuthProviderProps) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { user, authToken, rememberedEmail, status, error } =
		useAppSelector(selectAuth)

	/**
	 * Initialize auth state from localStorage
	 */
	useEffect(() => {
		const initializeAuth = async () => {
			const storedToken = localStorage.getItem('token')
			const storedEmail = localStorage.getItem('rememberedEmail')

			if (storedToken && !user) {
				try {
					await dispatch(fetchUser()).unwrap()
				} catch (err) {
					console.error('Failed to initialize auth:', err)
					clearAuthToken()
				}
			}

			if (storedEmail && !rememberedEmail) {
				dispatch(setRememberedEmail(storedEmail))
			}
		}

		initializeAuth()
	}, [dispatch, user, rememberedEmail])

	/**
	 * Handle user login
	 * @param data - Login credentials
	 */
	const handleLogin = useCallback(
		async (data: LoginData) => {
			try {
				const result = await dispatch(login(data)).unwrap()
				setAuthToken(result.loginData.token)
				navigate('/')
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
		[dispatch, navigate]
	)

	/**
	 * Handle user logout
	 */
	const handleLogout = useCallback(async () => {
		try {
			await dispatch(logout()).unwrap()
			dispatch(resetAuthState())
			clearAuthToken()
			navigate('/login')
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

	/**
	 * Set remembered email
	 * @param email - Email to remember
	 */
	const handleSetRememberedEmail = useCallback(
		(email: string) => {
			dispatch(setRememberedEmail(email))
		},
		[dispatch]
	)

	/**
	 * Clear authentication error
	 */
	const handleClearError = useCallback(() => {
		dispatch(clearError())
	}, [dispatch])

	/**
	 * Memoized context value
	 */
	const contextValue = useMemo<AuthContextValue>(
		() => ({
			user,
			authToken,
			rememberedEmail,
			status,
			error,
			login: handleLogin,
			logout: handleLogout,
			setRememberedEmail: handleSetRememberedEmail,
			clearError: handleClearError
		}),
		[
			user,
			authToken,
			rememberedEmail,
			status,
			error,
			handleLogin,
			handleLogout,
			handleSetRememberedEmail,
			handleClearError
		]
	)

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	)
}

export default AuthProvider

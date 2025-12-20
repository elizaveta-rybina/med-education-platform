import { authApi } from '@/app/api/auth/auth.api'
import type {
	LoginRequest,
	RegisterRequest,
	User
} from '@/app/api/auth/auth.types'
import { isTokenValid } from '@/app/api/auth/authToken'
import { useCallback, useEffect, useState } from 'react'

/**
 * Auth hook for managing authentication state
 */
export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	/**
	 * Check if user is authenticated
	 */
	const isAuthenticated = useCallback((): boolean => {
		return isTokenValid()
	}, [])

	/**
	 * Load user data if token is valid
	 */
	const loadUser = useCallback(async () => {
		if (!isAuthenticated()) {
			setUser(null)
			setIsLoading(false)
			return
		}

		try {
			setIsLoading(true)
			const response = await authApi.getMe()
			setUser(response.user)
			setError(null)
		} catch (err) {
			console.error('Failed to load user:', err)
			setUser(null)
			setError('Failed to load user data')
		} finally {
			setIsLoading(false)
		}
	}, [isAuthenticated])

	/**
	 * Login user
	 */
	const login = useCallback(
		async (credentials: LoginRequest) => {
			try {
				setIsLoading(true)
				setError(null)
				await authApi.login(credentials)
				await loadUser()
			} catch (err: any) {
				const errorMessage = err?.response?.data?.message || 'Login failed'
				setError(errorMessage)
				throw new Error(errorMessage)
			} finally {
				setIsLoading(false)
			}
		},
		[loadUser]
	)

	/**
	 * Register new user
	 */
	const register = useCallback(
		async (data: RegisterRequest) => {
			try {
				setIsLoading(true)
				setError(null)
				const response = await authApi.register(data)

				// If token is returned, load user
				if (response.token) {
					await loadUser()
				} else {
					// Registration successful but no token, user might need to verify email
					setUser(response.user || null)
				}
			} catch (err: any) {
				const errorMessage =
					err?.response?.data?.message || 'Registration failed'
				setError(errorMessage)
				throw new Error(errorMessage)
			} finally {
				setIsLoading(false)
			}
		},
		[loadUser]
	)

	/**
	 * Logout user
	 */
	const logout = useCallback(async () => {
		try {
			setIsLoading(true)
			await authApi.logout()
		} catch (err) {
			console.error('Logout error:', err)
		} finally {
			setUser(null)
			setError(null)
			setIsLoading(false)
		}
	}, [])

	/**
	 * Refresh auth token
	 */
	const refreshToken = useCallback(async () => {
		try {
			await authApi.refresh()
			await loadUser()
		} catch (err) {
			console.error('Token refresh failed:', err)
			setUser(null)
		}
	}, [loadUser])

	// Load user on mount if token exists
	useEffect(() => {
		loadUser()
	}, [loadUser])

	return {
		user,
		isLoading,
		error,
		isAuthenticated: isAuthenticated(),
		login,
		register,
		logout,
		refreshToken,
		refetchUser: loadUser
	}
}

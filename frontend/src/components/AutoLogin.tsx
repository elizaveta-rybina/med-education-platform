import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

/**
 * Auto-login component for development
 * Automatically logs in with hardcoded credentials on mount
 */
export const AutoLogin = () => {
	const { login, isAuthenticated, isLoading } = useAuth()
	const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false)

	useEffect(() => {
		const attemptAutoLogin = async () => {
			// Skip if already authenticated or already tried to login
			if (isAuthenticated || hasAttemptedLogin || isLoading) {
				return
			}

			try {
				setHasAttemptedLogin(true)
				console.log('🔐 Auto-logging in with admin credentials...')

				await login({
					email: 'admin@example.com',
					password: 'password'
				})

				console.log('✅ Auto-login successful')
			} catch (error) {
				console.error('❌ Auto-login failed:', error)
			}
		}

		attemptAutoLogin()
	}, [login, isAuthenticated, hasAttemptedLogin, isLoading])

	// This component doesn't render anything
	return null
}

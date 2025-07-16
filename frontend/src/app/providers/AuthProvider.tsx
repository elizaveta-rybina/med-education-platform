import { useMemo } from 'react'
import { useAppSelector } from '@/app/store/hooks'
import { selectAuth } from '@/app/store/auth/selectors'
import {
	AuthContext,
	AuthContextValue,
	AuthProviderProps
} from '@/context/AuthContext'
import { useAuthInitializer } from '@/hooks/auth/useAuthInitializer'
import { useAuthActions } from '@/hooks/auth/useAuthActions'

const AuthProvider = ({ children }: AuthProviderProps) => {
	const { user, authToken, rememberedEmail, status, error } =
		useAppSelector(selectAuth)
	const { login, logout, setRememberedEmail, clearError } = useAuthActions()

	useAuthInitializer()

	const contextValue = useMemo<AuthContextValue>(
		() => ({
			user,
			authToken,
			rememberedEmail,
			status,
			error,
			login,
			logout,
			setRememberedEmail,
			clearError
		}),
		[
			user,
			authToken,
			rememberedEmail,
			status,
			error,
			login,
			logout,
			setRememberedEmail,
			clearError
		]
	)

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	)
}

export default AuthProvider

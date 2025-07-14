import { LoginData, LoginResponse, User } from '@/app/store/auth/model'
import { createContext, useContext } from 'react'

/**
 * Interface for AuthContext values
 */
interface AuthContextType {
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
 * Auth context with default undefined value
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Hook to access auth context
 * @throws Error if used outside AuthProvider
 */
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

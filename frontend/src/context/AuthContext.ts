// src/context/AuthContext.ts
import { LoginData, LoginResponse, User } from '@/app/store/auth/model'
import { createContext, ReactNode, useContext } from 'react'

export interface AuthContextValue {
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

export interface AuthProviderProps {
	children: ReactNode
}

export const AuthContext = createContext<AuthContextValue | undefined>(
	undefined
)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

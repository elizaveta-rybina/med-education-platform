import type {
	LoginRequest,
	LoginResponse,
	LogoutResponse,
	MeResponse,
	RegisterRequest,
	RegisterResponse
} from '@/app/api/auth/auth.types'
import {
	clearAuthToken,
	setAuthTokenFromLoginResponse
} from '@/app/api/auth/authToken'
import { baseApi } from '@/app/api/baseApi'

/**
 * Auth API service
 */
export const authApi = {
	/**
	 * Register a new user
	 * @param data Registration data
	 * @returns Registration response with optional token
	 */
	register: async (data: RegisterRequest): Promise<RegisterResponse> => {
		const response = await baseApi.post<RegisterResponse>(
			'/auth/register',
			data
		)

		// If token is returned, save it
		if (response.data.token) {
			setAuthTokenFromLoginResponse({
				token: response.data.token,
				token_type: response.data.token_type || 'bearer',
				expires_in: response.data.expires_in || 900
			})
		}

		return response.data
	},

	/**
	 * Login user
	 * @param credentials User credentials (email, password)
	 * @returns Login response with token
	 */
	login: async (credentials: LoginRequest): Promise<LoginResponse> => {
		const response = await baseApi.post<LoginResponse>(
			'/auth/login',
			credentials
		)

		// Save token
		setAuthTokenFromLoginResponse({
			token: response.data.token,
			token_type: response.data.token_type,
			expires_in: response.data.expires_in
		})

		return response.data
	},

	/**
	 * Logout user
	 * @returns Logout response
	 */
	logout: async (): Promise<LogoutResponse> => {
		try {
			const response = await baseApi.post<LogoutResponse>('/auth/logout')
			return response.data
		} finally {
			// Always clear token on logout
			clearAuthToken()
		}
	},

	/**
	 * Refresh auth token
	 * @returns New token
	 */
	refresh: async (): Promise<LoginResponse> => {
		const response = await baseApi.post<LoginResponse>('/auth/refresh')

		// Update token
		setAuthTokenFromLoginResponse({
			token: response.data.token,
			token_type: response.data.token_type,
			expires_in: response.data.expires_in
		})

		return response.data
	},

	/**
	 * Get current authenticated user
	 * @returns User data
	 */
	getMe: async (): Promise<MeResponse> => {
		const response = await baseApi.get<MeResponse>('/auth/me')
		return response.data
	}
}

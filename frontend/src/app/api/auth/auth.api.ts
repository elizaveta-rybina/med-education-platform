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
import { ApiClient } from '@/app/api/apiClient'

const handleTokenResponse = (response: LoginResponse) => {
	setAuthTokenFromLoginResponse({
		token: response.token,
		token_type: response.token_type,
		expires_in: response.expires_in
	})
	return response
}

export const authApi = {
	register: async (data: RegisterRequest): Promise<RegisterResponse> => {
		const response = await ApiClient.post<RegisterResponse>(
			'/auth/register',
			data
		)
		if (response.token) {
			setAuthTokenFromLoginResponse({
				token: response.token,
				token_type: response.token_type || 'bearer',
				expires_in: response.expires_in || 900
			})
		}
		return response
	},

	login: async (credentials: LoginRequest): Promise<LoginResponse> => {
		const response = await ApiClient.post<LoginResponse>(
			'/auth/login',
			credentials
		)
		return handleTokenResponse(response)
	},

	logout: async (): Promise<LogoutResponse> => {
		try {
			return await ApiClient.post<LogoutResponse>('/auth/logout')
		} finally {
			clearAuthToken()
		}
	},

	refresh: async (): Promise<LoginResponse> => {
		const response = await ApiClient.post<LoginResponse>('/auth/refresh')
		return handleTokenResponse(response)
	},

	getMe: async (): Promise<MeResponse> => {
		return ApiClient.get<MeResponse>('/auth/me')
	}
}

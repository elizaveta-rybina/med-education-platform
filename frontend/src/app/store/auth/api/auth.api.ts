import { baseApi } from '@/app/api/baseApi'
import { handleApiError } from '@/app/api/errorHandler'
import {
	AuthMeResponse,
	AuthResponse,
	LoginData,
	LoginResponse,
	RegisterData
} from '@/app/store/auth/model'

/**
 * Auth API service for handling authentication-related requests
 */
export const authApi = {
	/**
	 * Logs in a user with provided credentials
	 * @param data - Login credentials
	 * @returns Login response with token and metadata
	 */
	login: async (data: LoginData): Promise<LoginResponse> => {
		try {
			const response = await baseApi.post<LoginResponse>('/auth/login', data)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Registers a new user
	 * @param data - Registration data
	 * @returns Registration response with token and message
	 */
	register: async (data: RegisterData): Promise<AuthResponse> => {
		try {
			const response = await baseApi.post<AuthResponse>('/auth/register', data)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Fetches authenticated user data
	 * @returns Authenticated user data
	 */
	getMe: async (): Promise<AuthMeResponse> => {
		try {
			const response = await baseApi.get<AuthMeResponse>('/auth/me')
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Logs out the current user
	 * @returns Void on successful logout
	 */
	logout: async (): Promise<void> => {
		try {
			await baseApi.post('/auth/logout')
		} catch (error) {
			return handleApiError(error)
		}
	}
}

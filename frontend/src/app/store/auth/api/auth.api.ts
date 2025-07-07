import { baseApi } from '@/app/api/baseApi'
import {
	AuthMeResponse,
	AuthResponse,
	LoginData,
	LoginResponse,
	RegisterData
} from '../model'

export const authApi = {
	login: async (data: LoginData): Promise<LoginResponse> => {
		const response = await baseApi.post<LoginResponse>('auth/login', data)
		return response.data
	},

	register: async (data: RegisterData): Promise<AuthResponse> => {
		const response = await baseApi.post<AuthResponse>('auth/register', data)
		return response.data
	},

	getMe: async (): Promise<AuthMeResponse> => {
		const response = await baseApi.get<AuthMeResponse>('auth/me')
		return response.data
	}
}

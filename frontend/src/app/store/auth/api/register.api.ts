import { baseApi } from '@/app/api/baseApi'
import { AuthResponse, RegisterData } from '../model'

export const registerApi = {
	register: async (data: RegisterData): Promise<AuthResponse> => {
		const response = await baseApi.post<AuthResponse>('auth/register', data)
		return response.data
	}
}

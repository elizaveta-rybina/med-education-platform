import { baseApi } from '@/app/api/baseApi'
import { LoginData, LoginResponse } from '../model'

export const loginApi = {
	login: async (data: LoginData): Promise<LoginResponse> => {
		const response = await baseApi.post<LoginResponse>('/login', data)
		return response.data
	}
}

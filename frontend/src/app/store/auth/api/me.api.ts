import { baseApi } from '@/app/api/baseApi'
import { AuthMeResponse } from '../model'

export const meApi = {
	getMe: async (): Promise<AuthMeResponse> => {
		const response = await baseApi.get<AuthMeResponse>('auth/me')
		return response.data
	}
}

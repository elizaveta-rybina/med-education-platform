import { baseApi } from '@/app/api/baseApi'
import type {
	Module,
	ModuleBulkCreateRequest,
	ModuleResponse
} from '@/app/api/modules/modules.types'

export const modulesApi = {
	bulkCreate: async (payload: ModuleBulkCreateRequest): Promise<ModuleResponse> => {
		const { data } = await baseApi.post<ModuleResponse>(
			'/admin/content/modules/bulk',
			payload
		)
		return data
	},

	getById: async (id: number): Promise<Module> => {
		const { data } = await baseApi.get<Module>(`/admin/content/modules/${id}`)
		return data
	},

	update: async (id: number, payload: Partial<Module>): Promise<ModuleResponse> => {
		const { data } = await baseApi.put<ModuleResponse>(
			`/admin/content/modules/${id}`,
			payload
		)
		return data
	},

	delete: async (id: number): Promise<{ message?: string }> => {
		const { data } = await baseApi.delete<{ message?: string }>(
			`/admin/content/modules/${id}`
		)
		return data
	}
}

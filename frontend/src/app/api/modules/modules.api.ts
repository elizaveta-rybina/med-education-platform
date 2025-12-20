import { ApiClient } from '@/app/api/apiClient'
import type {
	Module,
	ModuleBulkCreateRequest,
	ModuleResponse
} from '@/app/api/modules/modules.types'

const BASE_URL = '/admin/content/modules'

export const modulesApi = {
	bulkCreate: (payload: ModuleBulkCreateRequest) =>
		ApiClient.post<ModuleResponse>(`${BASE_URL}/bulk`, payload),

	getById: (id: number) => ApiClient.get<Module>(`${BASE_URL}/${id}`),

	update: (id: number, payload: Partial<Module>) =>
		ApiClient.put<ModuleResponse>(`${BASE_URL}/${id}`, payload),

	delete: (id: number) => ApiClient.delete(`${BASE_URL}/${id}`)
}

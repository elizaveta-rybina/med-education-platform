import { ApiClient } from '@/app/api/apiClient'
import type {
	Module,
	ModuleBulkCreateRequest,
	ModuleBulkCreateResponse,
	ModuleResponse
} from '@/app/api/modules/modules.types'

const BASE_URL = '/admin/content/modules'

export const modulesApi = {
	create: (
		courseId: number,
		payload: Omit<Module, 'id' | 'created_at' | 'updated_at'>
	) =>
		ApiClient.post<ModuleBulkCreateResponse>(`${BASE_URL}/bulk`, {
			course_id: courseId,
			modules: [
				{
					title: payload.module_title,
					description: payload.module_description ?? null,
					order_number: (payload.order_number as number) ?? 1
				}
			]
		}),

	bulkCreate: (payload: ModuleBulkCreateRequest) =>
		ApiClient.post<ModuleBulkCreateResponse>(`${BASE_URL}/bulk`, payload),

	getById: (id: number) => ApiClient.get<Module>(`${BASE_URL}/${id}`),

	update: (id: number, payload: Partial<Module>) =>
		ApiClient.put<ModuleResponse>(`${BASE_URL}/${id}`, {
			title: payload.module_title,
			description: payload.module_description,
			order_number: payload.order_number
		}),

	delete: (id: number) => ApiClient.delete(`${BASE_URL}/${id}`)
}

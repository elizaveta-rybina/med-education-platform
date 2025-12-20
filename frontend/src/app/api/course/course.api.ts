import { ApiClient } from '@/app/api/apiClient'
import type {
	CourseCreateRequest,
	CourseDetailResponse,
	CourseListResponse,
	CourseModulesResponse,
	CourseResponse,
	CourseUpdateRequest
} from '@/app/api/course/course.types'

const BASE_URL = '/admin/content/courses'

export const courseApi = {
	getAll: () => ApiClient.get<CourseListResponse>(BASE_URL),

	getById: (id: number) =>
		ApiClient.get<CourseResponse | CourseDetailResponse>(`${BASE_URL}/${id}`),

	create: (payload: CourseCreateRequest) =>
		ApiClient.post<CourseResponse>(BASE_URL, payload),

	update: (id: number, payload: CourseUpdateRequest) =>
		ApiClient.put<CourseResponse>(`${BASE_URL}/${id}`, payload),

	delete: (id: number) =>
		ApiClient.delete<{ message: string }>(`${BASE_URL}/${id}`),

	getModules: (id: number) =>
		ApiClient.get<CourseModulesResponse[]>(`${BASE_URL}/${id}/modules`)
}

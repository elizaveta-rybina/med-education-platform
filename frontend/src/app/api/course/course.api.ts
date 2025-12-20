import { baseApi } from '@/app/api/baseApi'
import type {
	CourseCreateRequest,
	CourseDetailResponse,
	CourseListResponse,
	CourseModulesResponse,
	CourseResponse,
	CourseUpdateRequest
} from '@/app/api/course/course.types'

export const courseApi = {
	getAll: async (): Promise<CourseListResponse> => {
		const { data } = await baseApi.get<CourseListResponse>(
			'/admin/content/courses'
		)
		return data
	},

	getById: async (
		id: number
	): Promise<CourseResponse | CourseDetailResponse> => {
		console.log('Fetching course with ID:', id)
		const { data } = await baseApi.get<CourseResponse | CourseDetailResponse>(
			`/admin/content/courses/${id}`
		)
		console.log('Course response:', data)
		return data
	},

	create: async (payload: CourseCreateRequest): Promise<CourseResponse> => {
		const { data } = await baseApi.post<CourseResponse>(
			'/admin/content/courses',
			payload
		)
		return data
	},

	update: async (
		id: number,
		payload: CourseUpdateRequest
	): Promise<CourseResponse> => {
		const { data } = await baseApi.put<CourseResponse>(
			`/admin/content/courses/${id}`,
			payload
		)
		return data
	},

	delete: async (id: number): Promise<{ message: string }> => {
		console.log(
			'Deleting course with ID:',
			id,
			'URL:',
			`/admin/content/courses/${id}`
		)
		const { data } = await baseApi.delete<{ message: string }>(
			`/admin/content/courses/${id}`
		)
		console.log('Delete response:', data)
		return data
	},

	getModules: async (id: number): Promise<CourseModulesResponse[]> => {
		const { data } = await baseApi.get<CourseModulesResponse[]>(
			`/admin/content/courses/${id}/modules`
		)
		return data
	}
}

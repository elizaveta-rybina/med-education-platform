import { baseApi } from '@/app/api/baseApi'
import { handleApiError } from '@/app/api/errorHandler'
import {
	Course,
	CourseRequest,
	CourseResponse,
	DeleteCourseResponse
} from '@/app/store/courses/model/course-types'

/**
 * API сервис для работы с курсами
 */
export const coursesApi = {
	/**
	 * Создает новый курс
	 * @param data - Данные курса
	 * @returns Ответ с созданным курсом
	 */
	createCourse: async (data: CourseRequest): Promise<CourseResponse> => {
		try {
			const response = await baseApi.post<CourseResponse>(
				'/admin/content/courses',
				data
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Получает список всех курсов
	 * @returns Список курсов
	 */
	getCourses: async (): Promise<Course[]> => {
		try {
			const response = await baseApi.get<Course[]>('/admin/content/courses')
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Получает данные конкретного курса
	 * @param id - ID курса
	 * @returns Данные курса
	 */
	getCourseById: async (id: number): Promise<Course> => {
		try {
			const response = await baseApi.get<Course>(`/admin/content/courses/${id}`)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Обновляет данные курса
	 * @param id - ID курса
	 * @param data - Обновленные данные курса
	 * @returns Ответ с обновленным курсом
	 */
	updateCourse: async (
		id: number,
		data: CourseRequest
	): Promise<CourseResponse> => {
		try {
			const response = await baseApi.put<CourseResponse>(
				`/admin/content/courses/${id}`,
				data
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Удаляет курс
	 * @param id - ID курса
	 * @returns Ответ об успешном удалении
	 */
	deleteCourse: async (id: number): Promise<DeleteCourseResponse> => {
		try {
			const response = await baseApi.delete<DeleteCourseResponse>(
				`/admin/content/courses/${id}`
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	}
}

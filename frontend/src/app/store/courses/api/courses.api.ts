import { baseApi } from '@/app/api/baseApi'
import { handleApiError } from '@/app/api/errorHandler'
import {
	Course,
	CourseRequest,
	CourseResponse
} from '@/app/store/courses/model/course-types'

/**
 * API сервис для работы с курсами
 */
export const coursesApi = {
	/**
	 * Получает все курсы
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
	 * Создает новый курс
	 * @param data - Данные для создания курса
	 * @returns Созданный курс
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
	 * Обновляет курс
	 * @param id - ID курса
	 * @param data - Данные для обновления
	 * @returns Обновленный курс
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
	 * @returns Void
	 */
	deleteCourse: async (id: number): Promise<void> => {
		try {
			await baseApi.delete(`/admin/content/courses/${id}`)
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Регистрирует пользователя на курс
	 * @param id - ID курса
	 * @returns Ответ о регистрации
	 */
	registerForCourse: async (id: number): Promise<{ message: string }> => {
		try {
			const response = await baseApi.post<{ message: string }>(
				`/admin/content/courses/${id}/register`
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	}
}

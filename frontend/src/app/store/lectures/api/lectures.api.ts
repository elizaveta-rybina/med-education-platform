import { baseApi } from '@/app/api/baseApi'
import { handleApiError } from '@/app/api/errorHandler'
import {
	DeleteLectureResponse,
	Lecture,
	LectureRequest,
	LectureResponse
} from '@/app/store/lectures/model/lecture-types'

/**
 * API сервис для работы с лекциями тем
 */
export const lecturesApi = {
	/**
	 * Создает новую лекцию
	 * @param data - Данные для создания лекции
	 * @returns Ответ с созданной лекцией
	 */
	createLecture: async (data: LectureRequest): Promise<LectureResponse> => {
		try {
			const response = await baseApi.post<LectureResponse>(
				'/admin/content/lectures',
				data
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Получает все лекции для указанной темы
	 * @param topicId - ID темы
	 * @returns Список лекций
	 */
	getLecturesByTopicId: async (topicId: number): Promise<Lecture[]> => {
		try {
			const response = await baseApi.get<Lecture[]>(
				`/admin/content/topics/${topicId}/lectures`
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Получает данные конкретной лекции
	 * @param id - ID лекции
	 * @returns Данные лекции
	 */
	getLectureById: async (id: number): Promise<Lecture> => {
		try {
			const response = await baseApi.get<Lecture>(
				`/admin/content/lectures/${id}`
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Обновляет данные лекции
	 * @param id - ID лекции
	 * @param data - Обновленные данные лекции
	 * @returns Ответ с обновленной лекцией
	 */
	updateLecture: async (
		id: number,
		data: LectureRequest
	): Promise<LectureResponse> => {
		try {
			const response = await baseApi.put<LectureResponse>(
				`/admin/content/lectures/${id}`,
				data
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Удаляет лекцию
	 * @param id - ID лекции
	 * @returns Ответ об успешном удалении
	 */
	deleteLecture: async (id: number): Promise<DeleteLectureResponse> => {
		try {
			const response = await baseApi.delete<DeleteLectureResponse>(
				`/admin/content/lectures/${id}`
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	}
}

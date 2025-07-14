import { baseApi } from '@/app/api/baseApi'
import { handleApiError } from '@/app/api/errorHandler'
import {
	BulkTopicRequest,
	DeleteTopicResponse,
	Topic,
	TopicRequest,
	TopicResponse
} from '@/app/store/topics/model/topic-types'

/**
 * API сервис для работы с темами модулей
 */
export const topicsApi = {
	/**
	 * Массовое создание тем для модуля
	 * @param data - Данные для создания тем
	 * @returns Ответ с созданными темами
	 */
	createTopicsBulk: async (data: BulkTopicRequest): Promise<TopicResponse> => {
		try {
			const response = await baseApi.post<TopicResponse>(
				'/admin/content/topics/bulk',
				data
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Получает все темы для указанного модуля
	 * @param moduleId - ID модуля
	 * @returns Список тем
	 */
	getTopicsByModuleId: async (moduleId: number): Promise<Topic[]> => {
		try {
			const response = await baseApi.get<Topic[]>(
				`/admin/content/modules/${moduleId}/topics`
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Получает данные конкретной темы
	 * @param id - ID темы
	 * @returns Данные темы
	 */
	getTopicById: async (id: number): Promise<Topic> => {
		try {
			const response = await baseApi.get<Topic>(`/admin/content/topics/${id}`)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Обновляет данные темы
	 * @param id - ID темы
	 * @param data - Обновленные данные темы
	 * @returns Ответ с обновленной темой
	 */
	updateTopic: async (
		id: number,
		data: TopicRequest
	): Promise<TopicResponse> => {
		try {
			const response = await baseApi.put<TopicResponse>(
				`/admin/content/topics/${id}`,
				data
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Удаляет тему
	 * @param id - ID темы
	 * @returns Ответ об успешном удалении
	 */
	deleteTopic: async (id: number): Promise<DeleteTopicResponse> => {
		try {
			const response = await baseApi.delete<DeleteTopicResponse>(
				`/admin/content/topics/${id}`
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	}
}

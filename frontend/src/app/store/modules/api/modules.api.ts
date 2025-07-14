import { baseApi } from '@/app/api/baseApi'
import { handleApiError } from '@/app/api/errorHandler'
import {
	BulkModuleRequest,
	DeleteModuleResponse,
	Module,
	ModuleRequest,
	ModuleResponse
} from '@/app/store/modules/model/module-types'

/**
 * API сервис для работы с модулями курсов
 */
export const modulesApi = {
	/**
	 * Массовое создание модулей для курса
	 * @param data - Данные для создания модулей
	 * @returns Ответ с созданными модулями
	 */
	createModulesBulk: async (
		data: BulkModuleRequest
	): Promise<ModuleResponse> => {
		try {
			const response = await baseApi.post<ModuleResponse>(
				'/admin/content/modules/bulk',
				data
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Получает все модули для указанного курса
	 * @param courseId - ID курса
	 * @returns Список модулей
	 */
	getModulesByCourseId: async (courseId: number): Promise<Module[]> => {
		try {
			const response = await baseApi.get<Module[]>(
				`/admin/content/courses/${courseId}/modules`
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Получает данные конкретного модуля
	 * @param id - ID модуля
	 * @returns Данные модуля
	 */
	getModuleById: async (id: number): Promise<Module> => {
		try {
			const response = await baseApi.get<Module>(`/admin/content/modules/${id}`)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Обновляет данные модуля
	 * @param id - ID модуля
	 * @param data - Обновленные данные модуля
	 * @returns Ответ с обновленным модулем
	 */
	updateModule: async (
		id: number,
		data: ModuleRequest
	): Promise<ModuleResponse> => {
		try {
			const response = await baseApi.put<ModuleResponse>(
				`/admin/content/modules/${id}`,
				data
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	},

	/**
	 * Удаляет модуль
	 * @param id - ID модуля
	 * @returns Ответ об успешном удалении
	 */
	deleteModule: async (id: number): Promise<DeleteModuleResponse> => {
		try {
			const response = await baseApi.delete<DeleteModuleResponse>(
				`/admin/content/modules/${id}`
			)
			return response.data
		} catch (error) {
			return handleApiError(error)
		}
	}
}

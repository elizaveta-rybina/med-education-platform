import { ApiError } from '@/app/api/errorHandler'
import { modulesApi } from '@/app/store/modules/api/modules.api'
import {
	BulkModuleRequest,
	ModuleRequest
} from '@/app/store/modules/model/module-types'
import { createAsyncThunk } from '@reduxjs/toolkit'

/**
 * Создает несколько модулей для курса
 * @param data - Данные для массового создания модулей
 * @returns Созданные модули
 */
export const createModulesBulk = createAsyncThunk(
	'modules/createModulesBulk',
	async (data: BulkModuleRequest, { rejectWithValue }) => {
		try {
			const response = await modulesApi.createModulesBulk(data)
			return response.modules || []
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось создать модули')
		}
	}
)

/**
 * Получает все модули для курса
 * @param courseId - ID курса
 * @returns Список модулей
 */
export const getModulesByCourseId = createAsyncThunk(
	'modules/getModulesByCourseId',
	async (courseId: number, { rejectWithValue }) => {
		try {
			return await modulesApi.getModulesByCourseId(courseId)
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось загрузить модули')
		}
	}
)

/**
 * Получает модуль по ID
 * @param id - ID модуля
 * @returns Данные модуля
 */
export const getModuleById = createAsyncThunk(
	'modules/getModuleById',
	async (id: number, { rejectWithValue }) => {
		try {
			return await modulesApi.getModuleById(id)
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось загрузить модуль')
		}
	}
)

/**
 * Обновляет модуль
 * @param params - ID модуля и данные для обновления
 * @returns Обновленный модуль
 */
export const updateModule = createAsyncThunk(
	'modules/updateModule',
	async (
		{ id, data }: { id: number; data: ModuleRequest },
		{ rejectWithValue }
	) => {
		try {
			const response = await modulesApi.updateModule(id, data)
			if (!response.module) {
				throw new ApiError(
					'Модуль не возвращен в ответе',
					500,
					'UpdateModuleError'
				)
			}
			return response.module
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось обновить модуль')
		}
	}
)

/**
 * Удаляет модуль
 * @param id - ID модуля
 * @returns ID удаленного модуля
 */
export const deleteModule = createAsyncThunk(
	'modules/deleteModule',
	async (id: number, { rejectWithValue }) => {
		try {
			await modulesApi.deleteModule(id)
			return id
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось удалить модуль')
		}
	}
)

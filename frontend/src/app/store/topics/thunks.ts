import { ApiError } from '@/app/api/errorHandler'
import { topicsApi } from '@/app/store/topics/api/topics.api'
import {
	BulkTopicRequest,
	TopicRequest
} from '@/app/store/topics/model/topic-types'
import { createAsyncThunk } from '@reduxjs/toolkit'

/**
 * Создает несколько тем для модуля
 * @param data - Данные для массового создания тем
 * @returns Созданные темы
 */
export const createTopicsBulk = createAsyncThunk(
	'topics/createTopicsBulk',
	async (data: BulkTopicRequest, { rejectWithValue }) => {
		try {
			const response = await topicsApi.createTopicsBulk(data)
			return response.topics || []
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось создать темы')
		}
	}
)

/**
 * Получает все темы для модуля
 * @param moduleId - ID модуля
 * @returns Список тем
 */
export const getTopicsByModuleId = createAsyncThunk(
	'topics/getTopicsByModuleId',
	async (moduleId: number, { rejectWithValue }) => {
		try {
			return await topicsApi.getTopicsByModuleId(moduleId)
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось загрузить темы')
		}
	}
)

/**
 * Получает тему по ID
 * @param id - ID темы
 * @returns Данные темы
 */
export const getTopicById = createAsyncThunk(
	'topics/getTopicById',
	async (id: number, { rejectWithValue }) => {
		try {
			return await topicsApi.getTopicById(id)
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось загрузить тему')
		}
	}
)

/**
 * Обновляет тему
 * @param params - ID темы и данные для обновления
 * @returns Обновленная тема
 */
export const updateTopic = createAsyncThunk(
	'topics/updateTopic',
	async (
		{ id, data }: { id: number; data: TopicRequest },
		{ rejectWithValue }
	) => {
		try {
			const response = await topicsApi.updateTopic(id, data)
			if (!response.topic) {
				throw new ApiError(
					'Тема не возвращена в ответе',
					500,
					'UpdateTopicError'
				)
			}
			return response.topic
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось обновить тему')
		}
	}
)

/**
 * Удаляет тему
 * @param id - ID темы
 * @returns ID удаленной темы
 */
export const deleteTopic = createAsyncThunk(
	'topics/deleteTopic',
	async (id: number, { rejectWithValue }) => {
		try {
			await topicsApi.deleteTopic(id)
			return id
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось удалить тему')
		}
	}
)

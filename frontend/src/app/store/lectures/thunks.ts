import { ApiError } from '@/app/api/errorHandler'
import { lecturesApi } from '@/app/store/lectures/api/lectures.api'
import { LectureRequest } from '@/app/store/lectures/model/lecture-types'
import { createAsyncThunk } from '@reduxjs/toolkit'

/**
 * Создает новую лекцию
 * @param data - Данные для создания лекции
 * @returns Созданная лекция
 */
export const createLecture = createAsyncThunk(
	'lectures/createLecture',
	async (data: LectureRequest, { rejectWithValue }) => {
		try {
			const response = await lecturesApi.createLecture(data)
			if (!response.lecture) {
				throw new ApiError(
					'Лекция не возвращена в ответе',
					500,
					'CreateLectureError'
				)
			}
			return response.lecture
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось создать лекцию')
		}
	}
)

/**
 * Получает все лекции для темы
 * @param topicId - ID темы
 * @returns Список лекций
 */
export const getLecturesByTopicId = createAsyncThunk(
	'lectures/getLecturesByTopicId',
	async (topicId: number, { rejectWithValue }) => {
		try {
			return await lecturesApi.getLecturesByTopicId(topicId)
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось загрузить лекции')
		}
	}
)

/**
 * Получает лекцию по ID
 * @param id - ID лекции
 * @returns Данные лекции
 */
export const getLectureById = createAsyncThunk(
	'lectures/getLectureById',
	async (id: number, { rejectWithValue }) => {
		try {
			return await lecturesApi.getLectureById(id)
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось загрузить лекцию')
		}
	}
)

/**
 * Обновляет лекцию
 * @param params - ID лекции и данные для обновления
 * @returns Обновленная лекция
 */
export const updateLecture = createAsyncThunk(
	'lectures/updateLecture',
	async (
		{ id, data }: { id: number; data: LectureRequest },
		{ rejectWithValue }
	) => {
		try {
			const response = await lecturesApi.updateLecture(id, data)
			if (!response.lecture) {
				throw new ApiError(
					'Лекция не возвращена в ответе',
					500,
					'UpdateLectureError'
				)
			}
			return response.lecture
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось обновить лекцию')
		}
	}
)

/**
 * Удаляет лекцию
 * @param id - ID лекции
 * @returns ID удаленной лекции
 */
export const deleteLecture = createAsyncThunk(
	'lectures/deleteLecture',
	async (id: number, { rejectWithValue }) => {
		try {
			await lecturesApi.deleteLecture(id)
			return id
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось удалить лекцию')
		}
	}
)

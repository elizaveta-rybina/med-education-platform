import { ApiError } from '@/app/api/errorHandler'
import { coursesApi } from '@/app/store/courses/api/courses.api'
import { CourseRequest } from '@/app/store/courses/model/course-types'
import { createAsyncThunk } from '@reduxjs/toolkit'

/**
 * Создает новый курс
 * @param data - Данные для создания курса
 * @returns Созданный курс
 */
export const createCourse = createAsyncThunk(
	'courses/createCourse',
	async (data: CourseRequest, { rejectWithValue }) => {
		try {
			const response = await coursesApi.createCourse(data)
			return response.course
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось создать курс')
		}
	}
)

/**
 * Получает список всех курсов
 * @returns Список курсов
 */
export const fetchCourses = createAsyncThunk(
	'courses/fetchCourses',
	async (_, { rejectWithValue }) => {
		try {
			return await coursesApi.getCourses()
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось загрузить курсы')
		}
	}
)

/**
 * Получает курс по ID
 * @param id - ID курса
 * @returns Данные курса
 */
export const fetchCourseById = createAsyncThunk(
	'courses/fetchCourseById',
	async (id: number, { rejectWithValue }) => {
		try {
			return await coursesApi.getCourseById(id)
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось загрузить курс')
		}
	}
)

/**
 * Обновляет курс
 * @param params - ID курса и данные для обновления
 * @returns Обновленный курс
 */
export const updateCourse = createAsyncThunk(
	'courses/updateCourse',
	async (
		{ id, data }: { id: number; data: CourseRequest },
		{ rejectWithValue }
	) => {
		try {
			const response = await coursesApi.updateCourse(id, data)
			return response.course
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось обновить курс')
		}
	}
)

/**
 * Удаляет курс
 * @param id - ID курса
 * @returns ID удаленного курса
 */
export const deleteCourse = createAsyncThunk(
	'courses/deleteCourse',
	async (id: number, { rejectWithValue }) => {
		try {
			await coursesApi.deleteCourse(id)
			return id
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось удалить курс')
		}
	}
)

/**
 * Регистрирует пользователя на курс
 * @param courseId - ID курса
 * @returns Ответ о регистрации
 */
export const registerForCourse = createAsyncThunk(
	'courses/registerForCourse',
	async (courseId: number, { rejectWithValue }) => {
		try {
			const response = await coursesApi.registerForCourse(courseId)
			return response
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Не удалось зарегистрироваться на курс')
		}
	}
)

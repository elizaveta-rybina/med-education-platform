import { Course } from '@/app/store/courses/model/course-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	createCourse,
	deleteCourse,
	fetchCourseById,
	fetchCourses,
	updateCourse
} from './thunks'

export interface CoursesState {
	courses: Course[]
	selectedCourse: Course | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: CoursesState = {
	courses: [],
	selectedCourse: null,
	status: 'idle',
	error: null
}

const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		/**
		 * Очищает состояние ошибки
		 */
		clearError(state) {
			state.error = null
		},
		/**
		 * Сбрасывает состояние к начальному
		 */
		resetCoursesState(state) {
			state.courses = initialState.courses
			state.selectedCourse = initialState.selectedCourse
			state.status = initialState.status
			state.error = initialState.error
		}
	},
	extraReducers: builder => {
		// Создание курса
		builder
			.addCase(createCourse.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				createCourse.fulfilled,
				(state, action: PayloadAction<Course>) => {
					state.status = 'succeeded'
					state.courses.push(action.payload)
					state.error = null
				}
			)
			.addCase(createCourse.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось создать курс'
			})
			// Получение списка курсов
			.addCase(fetchCourses.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				fetchCourses.fulfilled,
				(state, action: PayloadAction<Course[]>) => {
					state.status = 'succeeded'
					state.courses = action.payload
					state.error = null
				}
			)
			.addCase(fetchCourses.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось загрузить курсы'
			})
			// Получение курса по ID
			.addCase(fetchCourseById.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				fetchCourseById.fulfilled,
				(state, action: PayloadAction<Course>) => {
					state.status = 'succeeded'
					state.selectedCourse = action.payload
					state.error = null
				}
			)
			.addCase(fetchCourseById.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось загрузить курс'
				state.selectedCourse = null
			})
			// Обновление курса
			.addCase(updateCourse.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				updateCourse.fulfilled,
				(state, action: PayloadAction<Course>) => {
					state.status = 'succeeded'
					state.courses = state.courses.map(course =>
						course.id === action.payload.id ? action.payload : course
					)
					if (state.selectedCourse?.id === action.payload.id) {
						state.selectedCourse = action.payload
					}
					state.error = null
				}
			)
			.addCase(updateCourse.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось обновить курс'
			})
			// Удаление курса
			.addCase(deleteCourse.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				deleteCourse.fulfilled,
				(state, action: PayloadAction<number>) => {
					state.status = 'succeeded'
					state.courses = state.courses.filter(
						course => course.id !== action.payload
					)
					if (state.selectedCourse?.id === action.payload) {
						state.selectedCourse = null
					}
					state.error = null
				}
			)
			.addCase(deleteCourse.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось удалить курс'
			})
	}
})

export const { clearError, resetCoursesState } = coursesSlice.actions

export default coursesSlice.reducer

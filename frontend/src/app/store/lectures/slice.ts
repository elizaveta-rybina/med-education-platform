import { Lecture } from '@/app/store/lectures/model/lecture-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	createLecture,
	deleteLecture,
	getLectureById,
	getLecturesByTopicId,
	updateLecture
} from './thunks'

export interface LecturesState {
	lectures: Lecture[]
	selectedLecture: Lecture | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: LecturesState = {
	lectures: [],
	selectedLecture: null,
	status: 'idle',
	error: null
}

const lecturesSlice = createSlice({
	name: 'lectures',
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
		resetLecturesState(state) {
			state.lectures = initialState.lectures
			state.selectedLecture = initialState.selectedLecture
			state.status = initialState.status
			state.error = initialState.error
		}
	},
	extraReducers: builder => {
		// Создание лекции
		builder
			.addCase(createLecture.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				createLecture.fulfilled,
				(state, action: PayloadAction<Lecture>) => {
					state.status = 'succeeded'
					state.lectures.push(action.payload)
					state.error = null
				}
			)
			.addCase(createLecture.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось создать лекцию'
			})
			// Получение лекций темы
			.addCase(getLecturesByTopicId.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				getLecturesByTopicId.fulfilled,
				(state, action: PayloadAction<Lecture[]>) => {
					state.status = 'succeeded'
					state.lectures = action.payload
					state.error = null
				}
			)
			.addCase(getLecturesByTopicId.rejected, (state, action) => {
				state.status = 'failed'
				state.error =
					(action.payload as string) || 'Не удалось загрузить лекции'
			})
			// Получение лекции по ID
			.addCase(getLectureById.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				getLectureById.fulfilled,
				(state, action: PayloadAction<Lecture>) => {
					state.status = 'succeeded'
					state.selectedLecture = action.payload
					state.error = null
				}
			)
			.addCase(getLectureById.rejected, (state, action) => {
				state.status = 'failed'
				state.error =
					(action.payload as string) || 'Не удалось загрузить лекцию'
				state.selectedLecture = null
			})
			// Обновление лекции
			.addCase(updateLecture.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				updateLecture.fulfilled,
				(state, action: PayloadAction<Lecture>) => {
					state.status = 'succeeded'
					state.lectures = state.lectures.map(lecture =>
						lecture.id === action.payload.id ? action.payload : lecture
					)
					if (state.selectedLecture?.id === action.payload.id) {
						state.selectedLecture = action.payload
					}
					state.error = null
				}
			)
			.addCase(updateLecture.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось обновить лекцию'
			})
			// Удаление лекции
			.addCase(deleteLecture.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				deleteLecture.fulfilled,
				(state, action: PayloadAction<number>) => {
					state.status = 'succeeded'
					state.lectures = state.lectures.filter(
						lecture => lecture.id !== action.payload
					)
					if (state.selectedLecture?.id === action.payload) {
						state.selectedLecture = null
					}
					state.error = null
				}
			)
			.addCase(deleteLecture.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось удалить лекцию'
			})
	}
})

export const { clearError, resetLecturesState } = lecturesSlice.actions

export default lecturesSlice.reducer

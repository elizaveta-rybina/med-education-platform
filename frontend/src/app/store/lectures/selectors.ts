import { RootState } from '@/app/store'
import { Lecture } from '@/app/store/lectures/model/lecture-types'
import { createSelector } from '@reduxjs/toolkit'
import { LecturesState } from './slice'

/**
 * Выбирает состояние лекций
 */
export const selectLecturesState = (state: RootState): LecturesState =>
	state.lectures

/**
 * Выбирает список всех лекций
 */
export const selectLectures = createSelector(
	[selectLecturesState],
	(lecturesState): Lecture[] => lecturesState.lectures
)

/**
 * Выбирает выбранную лекцию
 */
export const selectSelectedLecture = createSelector(
	[selectLecturesState],
	(lecturesState): Lecture | null => lecturesState.selectedLecture
)

/**
 * Выбирает статус загрузки лекций
 */
export const selectLecturesStatus = createSelector(
	[selectLecturesState],
	(lecturesState): 'idle' | 'loading' | 'succeeded' | 'failed' =>
		lecturesState.status
)

/**
 * Выбирает ошибку лекций
 */
export const selectLecturesError = createSelector(
	[selectLecturesState],
	(lecturesState): string | null => lecturesState.error
)

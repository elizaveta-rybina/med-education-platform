import { Course } from '@/app/store/courses/model/course-types'
import { RootState } from '@/app/store/mainStore'
import { createSelector } from '@reduxjs/toolkit'
import { CoursesState } from './slice'

/**
 * Выбирает состояние курсов
 */
export const selectCoursesState = (state: RootState): CoursesState =>
	state.courses

/**
 * Выбирает список всех курсов
 */
export const selectCourses = createSelector(
	[selectCoursesState],
	(coursesState): Course[] => coursesState.courses
)

/**
 * Выбирает выбранный курс
 */
export const selectSelectedCourse = createSelector(
	[selectCoursesState],
	(coursesState): Course | null => coursesState.selectedCourse
)

/**
 * Выбирает статус загрузки курсов
 */
export const selectCoursesStatus = createSelector(
	[selectCoursesState],
	(coursesState): 'idle' | 'loading' | 'succeeded' | 'failed' =>
		coursesState.status
)

/**
 * Выбирает ошибку курсов
 */
export const selectCoursesError = createSelector(
	[selectCoursesState],
	(coursesState): string | null => coursesState.error
)

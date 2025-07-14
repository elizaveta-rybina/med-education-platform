import { RootState } from '@/app/store/mainStore'
import { Topic } from '@/app/store/topics/model/topic-types'
import { createSelector } from '@reduxjs/toolkit'
import { TopicsState } from './slice'

/**
 * Выбирает состояние тем
 */
export const selectTopicsState = (state: RootState): TopicsState => state.topics

/**
 * Выбирает список всех тем
 */
export const selectTopics = createSelector(
	[selectTopicsState],
	(topicsState): Topic[] => topicsState.topics
)

/**
 * Выбирает выбранную тему
 */
export const selectSelectedTopic = createSelector(
	[selectTopicsState],
	(topicsState): Topic | null => topicsState.selectedTopic
)

/**
 * Выбирает статус загрузки тем
 */
export const selectTopicsStatus = createSelector(
	[selectTopicsState],
	(topicsState): 'idle' | 'loading' | 'succeeded' | 'failed' =>
		topicsState.status
)

/**
 * Выбирает ошибку тем
 */
export const selectTopicsError = createSelector(
	[selectTopicsState],
	(topicsState): string | null => topicsState.error
)

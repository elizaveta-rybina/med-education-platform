import { Topic } from '@/app/store/topics/model/topic-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	createTopicsBulk,
	deleteTopic,
	getTopicById,
	getTopicsByModuleId,
	updateTopic
} from './thunks'

export interface TopicsState {
	topics: Topic[]
	selectedTopic: Topic | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: TopicsState = {
	topics: [],
	selectedTopic: null,
	status: 'idle',
	error: null
}

const topicsSlice = createSlice({
	name: 'topics',
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
		resetTopicsState(state) {
			state.topics = initialState.topics
			state.selectedTopic = initialState.selectedTopic
			state.status = initialState.status
			state.error = initialState.error
		}
	},
	extraReducers: builder => {
		// Массовое создание тем
		builder
			.addCase(createTopicsBulk.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				createTopicsBulk.fulfilled,
				(state, action: PayloadAction<Topic[]>) => {
					state.status = 'succeeded'
					state.topics = [...state.topics, ...action.payload]
					state.error = null
				}
			)
			.addCase(createTopicsBulk.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось создать темы'
			})
			// Получение тем модуля
			.addCase(getTopicsByModuleId.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				getTopicsByModuleId.fulfilled,
				(state, action: PayloadAction<Topic[]>) => {
					state.status = 'succeeded'
					state.topics = action.payload
					state.error = null
				}
			)
			.addCase(getTopicsByModuleId.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось загрузить темы'
			})
			// Получение темы по ID
			.addCase(getTopicById.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				getTopicById.fulfilled,
				(state, action: PayloadAction<Topic>) => {
					state.status = 'succeeded'
					state.selectedTopic = action.payload
					state.error = null
				}
			)
			.addCase(getTopicById.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось загрузить тему'
				state.selectedTopic = null
			})
			// Обновление темы
			.addCase(updateTopic.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(updateTopic.fulfilled, (state, action: PayloadAction<Topic>) => {
				state.status = 'succeeded'
				state.topics = state.topics.map(topic =>
					topic.id === action.payload.id ? action.payload : topic
				)
				if (state.selectedTopic?.id === action.payload.id) {
					state.selectedTopic = action.payload
				}
				state.error = null
			})
			.addCase(updateTopic.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось обновить тему'
			})
			// Удаление темы
			.addCase(deleteTopic.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				deleteTopic.fulfilled,
				(state, action: PayloadAction<number>) => {
					state.status = 'succeeded'
					state.topics = state.topics.filter(
						topic => topic.id !== action.payload
					)
					if (state.selectedTopic?.id === action.payload) {
						state.selectedTopic = null
					}
					state.error = null
				}
			)
			.addCase(deleteTopic.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось удалить тему'
			})
	}
})

export const { clearError, resetTopicsState } = topicsSlice.actions

export default topicsSlice.reducer

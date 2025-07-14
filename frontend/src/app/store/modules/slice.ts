import { Module } from '@/app/store/modules/model/module-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	createModulesBulk,
	deleteModule,
	getModuleById,
	getModulesByCourseId,
	updateModule
} from './thunks'

export interface ModulesState {
	modules: Module[]
	selectedModule: Module | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: ModulesState = {
	modules: [],
	selectedModule: null,
	status: 'idle',
	error: null
}

const modulesSlice = createSlice({
	name: 'modules',
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
		resetModulesState(state) {
			state.modules = initialState.modules
			state.selectedModule = initialState.selectedModule
			state.status = initialState.status
			state.error = initialState.error
		}
	},
	extraReducers: builder => {
		// Массовое создание модулей
		builder
			.addCase(createModulesBulk.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				createModulesBulk.fulfilled,
				(state, action: PayloadAction<Module[]>) => {
					state.status = 'succeeded'
					state.modules = [...state.modules, ...action.payload]
					state.error = null
				}
			)
			.addCase(createModulesBulk.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось создать модули'
			})
			// Получение модулей курса
			.addCase(getModulesByCourseId.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				getModulesByCourseId.fulfilled,
				(state, action: PayloadAction<Module[]>) => {
					state.status = 'succeeded'
					state.modules = action.payload
					state.error = null
				}
			)
			.addCase(getModulesByCourseId.rejected, (state, action) => {
				state.status = 'failed'
				state.error =
					(action.payload as string) || 'Не удалось загрузить модули'
			})
			// Получение модуля по ID
			.addCase(getModuleById.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				getModuleById.fulfilled,
				(state, action: PayloadAction<Module>) => {
					state.status = 'succeeded'
					state.selectedModule = action.payload
					state.error = null
				}
			)
			.addCase(getModuleById.rejected, (state, action) => {
				state.status = 'failed'
				state.error =
					(action.payload as string) || 'Не удалось загрузить модуль'
				state.selectedModule = null
			})
			// Обновление модуля
			.addCase(updateModule.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				updateModule.fulfilled,
				(state, action: PayloadAction<Module>) => {
					state.status = 'succeeded'
					state.modules = state.modules.map(module =>
						module.id === action.payload.id ? action.payload : module
					)
					if (state.selectedModule?.id === action.payload.id) {
						state.selectedModule = action.payload
					}
					state.error = null
				}
			)
			.addCase(updateModule.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось обновить модуль'
			})
			// Удаление модуля
			.addCase(deleteModule.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				deleteModule.fulfilled,
				(state, action: PayloadAction<number>) => {
					state.status = 'succeeded'
					state.modules = state.modules.filter(
						module => module.id !== action.payload
					)
					if (state.selectedModule?.id === action.payload) {
						state.selectedModule = null
					}
					state.error = null
				}
			)
			.addCase(deleteModule.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Не удалось удалить модуль'
			})
	}
})

export const { clearError, resetModulesState } = modulesSlice.actions

export default modulesSlice.reducer

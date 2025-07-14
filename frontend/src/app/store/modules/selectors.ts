import { RootState } from '@/app/store/mainStore'
import { Module } from '@/app/store/modules/model/module-types'
import { createSelector } from '@reduxjs/toolkit'
import { ModulesState } from './slice'

/**
 * Выбирает состояние модулей
 */
export const selectModulesState = (state: RootState): ModulesState =>
	state.modules

/**
 * Выбирает список всех модулей
 */
export const selectModules = createSelector(
	[selectModulesState],
	(modulesState): Module[] => modulesState.modules
)

/**
 * Выбирает выбранный модуль
 */
export const selectSelectedModule = createSelector(
	[selectModulesState],
	(modulesState): Module | null => modulesState.selectedModule
)

/**
 * Выбирает статус загрузки модулей
 */
export const selectModulesStatus = createSelector(
	[selectModulesState],
	(modulesState): 'idle' | 'loading' | 'succeeded' | 'failed' =>
		modulesState.status
)

/**
 * Выбирает ошибку модулей
 */
export const selectModulesError = createSelector(
	[selectModulesState],
	(modulesState): string | null => modulesState.error
)

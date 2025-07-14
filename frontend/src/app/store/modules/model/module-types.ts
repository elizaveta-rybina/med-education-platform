/**
 * Данные для создания или обновления модуля
 */
export interface ModuleRequest {
	title: string
	description: string
	order_number: number
}

/**
 * Данные для массового создания модулей
 */
export interface BulkModuleRequest {
	course_id: number
	modules: ModuleRequest[]
}

/**
 * Ответ на создание или обновление модуля
 */
export interface ModuleResponse {
	message: string
	module?: Module
	modules?: Module[]
}

/**
 * Данные модуля
 */
export interface Module {
	id: number
	course_id: number
	title: string
	description: string
	order_number: number
	created_at: string
	updated_at: string
}

/**
 * Ответ на удаление модуля
 */
export interface DeleteModuleResponse {
	message: string
}

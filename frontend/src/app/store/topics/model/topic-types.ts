/**
 * Данные для создания или обновления темы
 */
export interface TopicRequest {
	title: string
	description: string
	order_number: number
}

/**
 * Данные для массового создания тем
 */
export interface BulkTopicRequest {
	module_id: number
	topics: TopicRequest[]
}

/**
 * Ответ на создание или обновление темы
 */
export interface TopicResponse {
	message: string
	topic?: Topic
	topics?: Topic[]
}

/**
 * Данные темы
 */
export interface Topic {
	id: number
	module_id: number
	title: string
	description: string
	order_number: number
	created_at: string
	updated_at: string
}

/**
 * Ответ на удаление темы
 */
export interface DeleteTopicResponse {
	message: string
}

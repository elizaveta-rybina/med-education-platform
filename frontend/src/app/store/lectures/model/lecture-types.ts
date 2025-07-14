/**
 * Данные для создания или обновления лекции
 */
export interface LectureRequest {
	topic_id: number
	title: string
	order_number: number
}

/**
 * Ответ на создание или обновление лекции
 */
export interface LectureResponse {
	message: string
	lecture?: Lecture
}

/**
 * Данные лекции
 */
export interface Lecture {
	id: number
	topic_id: number
	title: string
	order_number: number
	created_at: string
	updated_at: string
}

/**
 * Ответ на удаление лекции
 */
export interface DeleteLectureResponse {
	message: string
}

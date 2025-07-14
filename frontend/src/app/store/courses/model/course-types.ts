/**
 * Данные для создания или обновления курса
 */
export interface CourseRequest {
	title: string
	description: string
	skills: string[]
	description_modules: string
}

/**
 * Ответ на создание или обновление курса
 */
export interface CourseResponse {
	message: string
	course: Course
}

/**
 * Данные курса
 */
export interface Course {
	id: number
	title: string
	description: string
	skills: string[]
	description_modules: string
	created_at: string
	updated_at: string
}

/**
 * Ответ на удаление курса
 */
export interface DeleteCourseResponse {
	message: string
}

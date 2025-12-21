import { ApiClient } from '@/app/api/apiClient'
import type { Course } from './course.types'

interface Topic {
	id: number
	title: string
	description?: string
	cover_image?: string | null
	order_number?: number
}

interface PublicCourseResponse {
	course_title: string
	course_description: string
	modules: PublicModuleResponse[]
}

export interface PublicModuleResponse {
	id: number
	module_title: string
	module_description: string
	topics_count: number
	topics?: Topic[]
	order_number?: number
}

interface ModuleTopicsResponse {
	success: boolean
	data: {
		id: number
		title: string
		description?: string
		topics: Topic[]
	}
}

export const publicCourseApi = {
	/**
	 * Получить список всех доступных курсов
	 */
	getAllCourses: async () => {
		const res = await ApiClient.get<Course[]>('/content/courses')
		return res
	},

	/**
	 * Получить информацию о курсе с модулями и темами (публичный эндпоинт)
	 */
	getCourseWithModules: async (courseId: number) => {
		const res = await ApiClient.get<PublicCourseResponse>(
			`/content/courses/${courseId}`
		)
		return res
	},

	/**
	 * Получить все темы модуля с полной информацией (описание, обложка и т.д.)
	 */
	getModuleTopics: async (moduleId: number) => {
		const res = await ApiClient.get<ModuleTopicsResponse | Topic[]>(
			`/content/modules/${moduleId}/topics`
		)

		// Бэкенд возвращает { data: [...] }, поэтому извлекаем корректно
		const payload: any = res as any
		const data = payload?.data
		const topics = Array.isArray(data?.data)
			? data.data
			: Array.isArray(data?.topics)
			? data.topics
			: Array.isArray(data)
			? data
			: []

		return topics as Topic[]
	}
}

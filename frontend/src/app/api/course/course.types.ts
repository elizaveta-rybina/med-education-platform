export interface Course {
	id: number
	title: string
	description: string
	skills: string[]
	description_modules: string
	created_at: string
	updated_at: string
}

export interface CourseCreateRequest {
	title: string
	description: string
	skills: string[]
	description_modules: string
}

export interface CourseUpdateRequest {
	title?: string
	description?: string
	skills?: string[]
	description_modules?: string
}

export interface CourseListResponse extends Array<Course> {}

export interface CourseResponse {
	message?: string
	course?: Course
}

// Альтернативный формат ответа от API
export interface CourseDetailResponse {
	course_title?: string
	course_description?: string
	skills?: string[]
	description_modules?: string
	modules?: any[]
	created_at?: string
	updated_at?: string
	[key: string]: any
}

export interface CourseModulesResponse {
	id: number
	title: string
	description?: string
	order_number?: number
	course_id: number
	created_at: string
	updated_at: string
}

export interface CourseModulesListResponse {
	course_id: number
	modules: CourseModulesResponse[]
}

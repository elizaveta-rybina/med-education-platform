export interface ModuleTopicSummary {
	id?: number
	title?: string
	description?: string | null
	topics_count?: number
}

export interface Module {
	id?: number
	course_id?: number
	module_title: string
	module_description?: string | null
	topics_count?: number
	topics?: ModuleTopicSummary[]
	order_number?: number
	created_at?: string
	updated_at?: string
}

export interface ModulePayload {
	course_id?: number
	module_title: string
	module_description?: string | null
	order_number?: number
}

export interface ModuleBulkCreateRequest {
	course_id: number
	modules: Array<{
		title: string
		description?: string | null
		order_number: number
	}>
}

export interface ModuleResponse {
	message?: string
	module?: Module
}

export interface ModuleBulkCreateResponse {
	message?: string
	data?: Array<{
		id: number
		course_id: number
		title: string
		description?: string | null
		order_number: number
		created_at: string
		updated_at: string
	}>
}

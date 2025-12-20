export interface Topic {
	id?: number
	module_id: number
	title: string
	description?: string | null
	order_number?: number
	is_published?: boolean | number
	created_at?: string
	updated_at?: string
}

export interface TopicPayload {
	module_id: number
	title: string
	description?: string | null
	order_number?: number
	is_published?: boolean | number
}

export interface TopicBulkCreateRequest {
	topics: TopicPayload[]
}

export interface TopicResponse {
	message?: string
	topic?: Topic
	data?: Topic
}

export interface TopicContent {
	id?: number
	topic_id?: number
	content_type?: string
	payload?: Record<string, unknown>
	[key: string]: unknown
}

export interface TopicContentResponse {
	message?: string
	item?: TopicContent
	data?: TopicContent | TopicContent[]
}

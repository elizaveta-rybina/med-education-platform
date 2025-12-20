export interface Lecture {
	id?: number
	topic_id: number
	title: string
	content?: string | null
	content_type?: 'html' | 'markdown' | 'text' | string
	order_number?: number
	is_published?: boolean | number
	created_at?: string
	updated_at?: string
}

export interface LecturePayload {
	topic_id: number
	title: string
	content?: string | null
	content_type?: 'html' | 'markdown' | 'text' | string
	order_number?: number
	is_published?: boolean | number
}

export interface LectureResponse {
	message?: string
	lecture?: Lecture
	data?: Lecture
}

export interface LectureAttachmentResponse {
	message?: string
	[id: string]: unknown
}

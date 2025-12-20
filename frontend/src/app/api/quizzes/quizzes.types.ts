export interface Quiz {
	id?: number
	title?: string
	description?: string | null
	quiz_type?: string | null
	module_id?: number | null
	lecture_id?: number | null
	topic_id?: number | null
	time_limit?: number | null
	is_published?: boolean | number
	created_at?: string
	updated_at?: string
}

export interface QuizPayload {
	title: string
	description?: string | null
	quiz_type?: string | null
	module_id?: number | null
	lecture_id?: number | null
	topic_id?: number | null
	time_limit?: number | null
	is_published?: boolean | number
}

export interface QuizQuestionPayload {
	question_text: string
	question_type?: string
	options?: Record<string, unknown>[]
	correct_option_ids?: (number | string)[]
	order_number?: number
	[key: string]: unknown
}

export interface QuizResponse {
	message?: string
	quiz?: Quiz
	data?: Quiz
}

export interface QuizQuestionResponse {
	message?: string
	question?: Record<string, unknown>
	data?: Record<string, unknown>
}

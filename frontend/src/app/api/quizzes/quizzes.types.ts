export type QuizEntityType = 'module' | 'topic' | 'lecture' | 'assignment'

export type QuizType =
	| 'topic_final'
	| 'module_final'
	| 'additional'
	| 'practice'
	| 'embedded'
	| 'standard'
	| 'table'
	| 'interactive'
	| 'input'
	| 'free-input'
	| 'ordering'

export type QuizQuestionType =
	| 'single_choice'
	| 'multiple_choice'
	| 'table'
	| 'ordering'
	| 'interactive_experience'
	| 'input_answer'
	| 'text_input'
	| 'matching'
	| 'ordering'
	| 'free-input'

export interface QuizOptionPayload {
	text: string
	is_correct?: boolean
	order: number
}

export interface QuizTableMetadataColumn {
	name: string
	type: 'text' | 'multi_select'
}

export interface QuizTableMetadataRow {
	cells: (string | string[])[]
	correct_option_ids: number[]
}

export interface QuizTableMetadata {
	columns: QuizTableMetadataColumn[]
	rows: QuizTableMetadataRow[]
}

export interface QuizQuestionPayload {
	id?: number
	text: string
	question_type: QuizQuestionType
	points: number
	is_auto_graded?: boolean
	options?: QuizOptionPayload[]
	metadata?: QuizTableMetadata | string | Record<string, unknown>
	order_number?: number
	max_length?: number | null
	placeholder?: string | null
	created_at?: string
	updated_at?: string
}

export interface Quiz {
	id?: number
	title?: string
	description?: string | null
	quiz_type?: QuizType | null
	max_attempts?: number | null
	passing_score?: number | null
	time_limit_minutes?: number | null
	time_limit_seconds?: number | null
	entity_type?: QuizEntityType | null
	quizable_id?: number | null
	module_id?: number | null
	lecture_id?: number | null
	topic_id?: number | null
	order_number?: number | null
	is_published?: boolean | number
	file_name?: string | null
	game_path?: string | null
	created_at?: string
	updated_at?: string
	questions?: QuizQuestionPayload[]
}

export interface QuizPayload {
	title: string
	description?: string | null
	quiz_type: QuizType
	max_attempts?: number
	passing_score?: number
	time_limit_minutes?: number | null
	time_limit_seconds?: number | null
	entity_type: QuizEntityType
	quizable_id: number
	questions?: QuizQuestionPayload[]
	order_number?: number
	is_published?: boolean | number
	file_name?: string | null
	game_path?: string | null
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

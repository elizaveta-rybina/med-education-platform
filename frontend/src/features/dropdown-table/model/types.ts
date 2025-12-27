export interface DropdownOption {
	id: string
	content: string | React.ReactNode
}

export interface DropdownTableBlock {
	id: string
	title: string
	tableTitle: string
	columns: { id: string; title: string; width?: string }[]
	rows: {
		id: string
		values: (string | React.ReactNode)[]
		cellOptions?: Record<string, DropdownOption[]> // Варианты для каждой ячейки, например: { 'col2': [{ id: 'ans1', content: 'Ответ 1' }, ...] }
	}[]
	correctAnswers: Record<string, string> // Формат: { 'rowId-colIndex': answerId }
	columnOptions?: Record<string, DropdownOption[]> // Опционально для обратной совместимости
}

// types.ts

export interface QuizOption {
	id: number
	question_id: number
	text: string
	is_correct: boolean
	order: number
}

export interface TableColumn {
	name: string
	type: 'text' | 'select'
}

export interface TableCell {
	type: 'text' | 'select'
	value?: string // для типа text
	cell_key?: string // для типа select (например, "row0_col1")
	available_option_ids?: number[] // для типа select
}

export interface TableRow {
	cells: TableCell[]
	correct_answers?: Record<string, number[]> // map: cell_key -> [correct_id]
}

export interface QuestionMetadata {
	rows: TableRow[]
	columns: TableColumn[]
}

export interface QuizQuestion {
	id: number
	text: string
	question_type: 'table'
	metadata: QuestionMetadata
	options: QuizOption[]
	points: number
}

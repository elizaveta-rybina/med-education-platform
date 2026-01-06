export interface DragDropTableBlock {
	id: string
	type: 'drag-drop-table'
	title: string
	tableTitle: string
	description?: string // Описание с поддержкой markdown и изображений
	columns: {
		id: string
		title: string
		width?: string
	}[]
	rows: {
		id: string
		title?: string | React.ReactNode // Для первой колонки (факторы)
		characteristic?: string | React.ReactNode // Для второй колонки (характеристики)
	}[]
	answers: {
		id: string
		content: string | React.ReactNode
	}[]
	correctAnswers: Record<string, string[] | { anyOf: string[] }>
}

export interface DraggableAnswerProps {
	id: string
	children: React.ReactNode
}

export interface DroppableCellProps {
	id: string
	children: React.ReactNode
	isOver?: boolean
}

export interface DragDropTableComponentProps {
	block: DragDropTableBlock
	onComplete?: (
		isCorrect: boolean,
		stats?: { correct: number; total: number }
	) => void
}

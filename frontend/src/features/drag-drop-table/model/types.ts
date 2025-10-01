export interface DragDropTableBlock {
	id: string
	type: 'drag-drop-table'
	title: string
	tableTitle: string
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
	correctAnswers: Record<string, string[]> // Формат: { [rowId_columnId]: answerId[] }
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
	onComplete?: (isCorrect: boolean) => void
}

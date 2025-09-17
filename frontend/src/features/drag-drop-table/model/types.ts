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
		column1: string | React.ReactNode
		column2: string | React.ReactNode
	}[]
	answers: {
		id: string
		content: string | React.ReactNode
	}[]
	correctAnswers: Record<string, string[]>
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

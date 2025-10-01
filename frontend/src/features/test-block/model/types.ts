export interface QuestionBlock {
	type: 'question'
	id: string
	question: string
	options: { id: string; text: string }[]
}

export interface DropdownTableBlock {
	type: 'drag-drop-table'
	id: string
	title: string
	tableTitle: string
	columns: { id: string; title: string; width?: string }[]
	rows: { id: string; values: string[] }[]
	columnOptions: Record<string, { id: string; content: string }[]>
	correctAnswers: Record<string, string>
}

export interface TestBlockProps {
	block: QuestionBlock | DropdownTableBlock
	moduleId: string
	chapterId: string
	questionIndex: number
	totalQuestions: number
	onNext: () => void
}

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

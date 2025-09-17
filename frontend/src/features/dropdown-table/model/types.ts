export interface DropdownOption {
	id: string
	content: string
}

export interface DropdownTableBlock {
	id: string
	title: string
	tableTitle: string
	columns: { id: string; title: string; width?: string }[]
	rows: { id: string; values: string[] }[]
	columnOptions: Record<string, DropdownOption[]>
	correctAnswers: Record<string, string>
}

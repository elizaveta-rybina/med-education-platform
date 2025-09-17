import { DragDropTableBlock } from '../types'

export const useGroupedRows = (block: DragDropTableBlock) => {
	return block.rows.reduce<
		{ system: string; effects: Array<{ id: string; effect: string }> }[]
	>((acc, row) => {
		if (!row.id || !row.column1 || !row.column2) return acc
		const existingGroup = acc.find(group => group.system === row.column1)
		if (existingGroup) {
			existingGroup.effects.push({ id: row.id, effect: row.column2 as string })
		} else {
			acc.push({
				system: row.column1 as string,
				effects: [{ id: row.id, effect: row.column2 as string }]
			})
		}
		return acc
	}, [])
}

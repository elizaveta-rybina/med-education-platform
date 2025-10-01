import { DragDropTableBlock } from '../types'

export const useGroupedRows = (block: DragDropTableBlock) => {
	return block.rows.reduce<
		{
			title: string | React.ReactNode
			subRows: { id: string; characteristic?: string | React.ReactNode }[]
		}[]
	>((acc, row) => {
		// Пропускаем строки без id
		if (!row.id) return acc

		// Используем title или значение по умолчанию
		const title = row.title || 'Без названия'

		// Находим существующую группу по title
		const existingGroup = acc.find(group => group.title === title)

		if (existingGroup) {
			// Добавляем подстроку в существующую группу
			existingGroup.subRows.push({
				id: row.id,
				characteristic: row.characteristic
			})
		} else {
			// Создаем новую группу
			acc.push({
				title,
				subRows: [
					{
						id: row.id,
						characteristic: row.characteristic
					}
				]
			})
		}

		return acc
	}, [])
}

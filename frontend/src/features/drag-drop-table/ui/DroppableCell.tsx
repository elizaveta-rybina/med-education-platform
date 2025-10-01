import { useDroppable } from '@dnd-kit/core'
import { DroppableCellProps } from '../model/types'

export function DroppableCell({ id, children, isOver }: DroppableCellProps) {
	const { setNodeRef } = useDroppable({ id })

	return (
		<td
			ref={setNodeRef}
			className={`p-3 border ${
				isOver ? 'bg-blue-50' : 'bg-white'
			} min-h-[3rem] transition-colors`}
		>
			{children}
		</td>
	)
}

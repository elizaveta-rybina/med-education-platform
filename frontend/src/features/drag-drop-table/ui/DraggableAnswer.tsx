import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { DraggableAnswerProps } from '../model/types'

export function DraggableAnswer({ id, children }: DraggableAnswerProps) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
	const style = { transform: CSS.Translate.toString(transform) }

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className='px-3 py-2 m-1 bg-white border border-gray-200 rounded-lg shadow-sm cursor-grab hover:shadow-md transition-all active:shadow-sm active:cursor-grabbing'
		>
			{children}
		</div>
	)
}

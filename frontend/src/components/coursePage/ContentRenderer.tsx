import { Block } from '@/data/types'
import { DragDropTableComponent } from './DragDropTableComponent'
import { FreeInputBlock } from './FreeInputBlock'
import { GameBlock } from './GameBlock'
import { TestBlock } from './TestBlock'
import { TheoryBlock } from './TheoryBlock'

interface ContentRendererProps {
	block: Block
	moduleId: string
	chapterId: string
	questionIndex?: number
	totalQuestions?: number
	onNext?: () => void
	onPrev?: () => void
	onComplete?: (isCorrect: boolean) => void
}

export const ContentRenderer = ({
	block,
	moduleId,
	chapterId,
	questionIndex = 0,
	totalQuestions = 0,
	onNext = () => {},
	onComplete = () => {}
}: ContentRendererProps) => {
	switch (block.type) {
		case 'question':
			return (
				<TestBlock
					block={block}
					moduleId={moduleId}
					chapterId={chapterId}
					questionIndex={questionIndex}
					totalQuestions={totalQuestions}
					onNext={onNext}
				/>
			)

		case 'drag-drop-table':
			return <DragDropTableComponent block={block} onComplete={onComplete} />

		case 'free-input':
			return <FreeInputBlock block={block} onComplete={onComplete} />

		case 'game':
			return <GameBlock block={block} onComplete={onComplete} />

		case 'image':
		case 'text':
		default:
			return <TheoryBlock block={block} />
	}
}

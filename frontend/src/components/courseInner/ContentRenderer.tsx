import { Block } from '@/data/types'
import { DragDropTableComponent } from '@/features/drag-drop-table'
import { TestBlockComponent } from '@/features/test-block'
import { FreeInputBlock } from './block/FreeInputBlock'
import { GameBlock } from './block/GameBlock'
import { TheoryBlock } from './block/TheoryBlock'

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
				<TestBlockComponent
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

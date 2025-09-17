import { Block } from '@/data/types'
import { TestBlockComponent } from '@/features/test-block'
import { useTranslation } from 'react-i18next'
import { FreeInputBlock } from '../block'

interface TestSectionProps {
	testBlocks: Block[]
	currentQuestionIndex: number
	moduleId: string
	chapterId: string
	showTest: boolean
	isRead: boolean
	onComplete: (isCorrect: boolean) => void
}

export const TestSection: React.FC<TestSectionProps> = ({
	testBlocks,
	currentQuestionIndex,
	moduleId,
	chapterId,
	showTest,
	isRead,
	onComplete
}) => {
	const { t } = useTranslation('coursePage')
	const currentTestBlock = testBlocks[currentQuestionIndex]

	if (!(showTest || isRead) || testBlocks.length === 0 || !currentTestBlock) {
		return null
	}

	return (
		<div className='lg:sticky lg:top-6 space-y-6'>
			{currentTestBlock.type === 'question' && (
				<div className='bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200'>
					<TestBlockComponent
						block={currentTestBlock}
						moduleId={moduleId}
						chapterId={chapterId}
						questionIndex={currentQuestionIndex}
						totalQuestions={testBlocks.length}
						onNext={() => {
							if (currentQuestionIndex < testBlocks.length - 1) {
								onComplete(true) // Assuming onNext implies correct for simplicity
							}
						}}
					/>
				</div>
			)}
			{currentTestBlock.type === 'free-input' && (
				<div className='bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200'>
					<FreeInputBlock block={currentTestBlock} onComplete={onComplete} />
				</div>
			)}
		</div>
	)
}

import { Block } from '@/data/types'
import { useTranslation } from 'react-i18next'
import { DragDropTableComponent, GameBlock } from '../block'

interface FullScreenBlockProps {
	block: Block
	currentQuestionIndex: number
	totalQuestions: number
	onComplete: (isCorrect: boolean) => void
	onPrev: () => void
	onNext: () => void
	isPrevDisabled: boolean
	isNextDisabled: boolean
}

export const FullScreenBlock: React.FC<FullScreenBlockProps> = ({
	block,
	currentQuestionIndex,
	totalQuestions,
	onComplete,
	onPrev,
	onNext,
	isPrevDisabled,
	isNextDisabled
}) => {
	const { t } = useTranslation('coursePage')

	return (
		<div className='w-full'>
			{block.type === 'drag-drop-table' && (
				<>
					<DragDropTableComponent block={block} onComplete={onComplete} />
					<div className='flex gap-3 mt-6'>
						<button
							onClick={onPrev}
							disabled={isPrevDisabled}
							className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
						>
							{t('back')}
						</button>
						<button
							onClick={onNext}
							disabled={isNextDisabled}
							className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
						>
							{t('next')}
						</button>
					</div>
				</>
			)}
			{block.type === 'game' && (
				<div className='w-full max-w-9xl mx-auto'>
					<GameBlock block={block} onComplete={onComplete} />
				</div>
			)}
		</div>
	)
}

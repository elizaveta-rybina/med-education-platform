import { TextBlock, ImageBlock } from '@/data/types'
import { TheoryBlock } from '../block'
import { useTranslation } from 'react-i18next'

interface TheorySectionProps {
	theoryBlocks: (TextBlock | ImageBlock)[]
	isRead: boolean
	onMarkAsRead: () => void
}

export const TheorySection: React.FC<TheorySectionProps> = ({
	theoryBlocks,
	isRead,
	onMarkAsRead
}) => {
	const { t } = useTranslation('coursePage')
	const hasTheoryBlocks = theoryBlocks.length > 0

	return (
		<div className='space-y-6'>
			{theoryBlocks.map(block => (
				<TheoryBlock key={block.id} block={block} />
			))}
			{!isRead && hasTheoryBlocks && (
				<div className='mt-6 pt-4 border-t border-gray-200'>
					<button
						onClick={onMarkAsRead}
						className='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200'
					>
						{t('markAsCompleted')}
					</button>
				</div>
			)}
		</div>
	)
}

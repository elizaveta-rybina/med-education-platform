import { Module } from '@/data/types'
import { useTranslation } from 'react-i18next'

interface NavigationButtonsProps {
	course: {
		modules: Module[]
	}
	currentModuleIndex: number
	currentChapterIndex: number
	onNavigate: (direction: 'prev' | 'next') => void
}

export const NavigationButtons = ({
	course,
	currentModuleIndex,
	currentChapterIndex,
	onNavigate
}: NavigationButtonsProps) => {
	const { t } = useTranslation('coursePage')
	const isFirstChapter = currentModuleIndex === 0 && currentChapterIndex === 0
	const isLastChapter =
		currentModuleIndex === course.modules.length - 1 &&
		currentChapterIndex ===
			course.modules[currentModuleIndex].chapters.length - 1

	return (
		<div className='mt-12 flex justify-between'>
			<button
				onClick={() => onNavigate('prev')}
				disabled={isFirstChapter}
				className={`flex items-center px-4 py-2 rounded-md ${
					isFirstChapter
						? 'bg-gray-300 cursor-not-allowed'
						: 'bg-gray-800 text-white hover:bg-gray-700'
				}`}
			>
				<svg className='w-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
					<path
						fillRule='evenodd'
						d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
						clipRule='evenodd'
					></path>
				</svg>
				{t('previous')}
			</button>

			<button
				onClick={() => onNavigate('next')}
				disabled={isLastChapter}
				className={`flex items-center px-4 py-2 rounded-md ${
					isLastChapter
						? 'bg-gray-300 cursor-not-allowed'
						: 'bg-gray-800 text-white hover:bg-gray-700'
				}`}
			>
				{t('nextChapter')}
				<svg className='w-5 ml-2' fill='currentColor' viewBox='0 0 20 20'>
					<path
						fillRule='evenodd'
						d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
						clipRule='evenodd'
					></path>
				</svg>
			</button>
		</div>
	)
}

import { Module } from '@/data/types'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

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
				className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm transition-colors ${
					isFirstChapter
						? 'bg-gray-200 text-gray-400 cursor-not-allowed'
						: 'bg-gray-800 text-white hover:bg-gray-700'
				}`}
			>
				<FaArrowLeft className='w-5 h-5' />
				<span className='hidden sm:inline font-medium'>{t('previous')}</span>
			</button>
			<button
				onClick={() => onNavigate('next')}
				disabled={isLastChapter}
				className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm transition-colors ${
					isLastChapter
						? 'bg-gray-200 text-gray-400 cursor-not-allowed'
						: 'bg-fuchsia-700 text-white hover:bg-fuchsia-500'
				}`}
			>
				<span className='hidden sm:inline font-medium'>{t('nextChapter')}</span>
				<FaArrowRight className='w-5 h-5' />
			</button>
		</div>
	)
}

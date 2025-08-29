import { Block, ImageBlock, TextBlock } from '@/data/types'
import { useCourse } from '@/hooks/useCourse'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChapterHeader } from './ChapterHeader'
import { NavigationButtons } from './NavigationButtons'
import { FullScreenBlock, TestSection, TheorySection } from './sections'

export const Content: React.FC = () => {
	const { t } = useTranslation('coursePage')
	const { course, markChapterAsRead } = useCourse()
	const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
	const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
	const [currentModule, setCurrentModule] = useState(course.modules[0])
	const [currentChapter, setCurrentChapter] = useState(
		course.modules[0]?.chapters[0]
	)
	const [showTest, setShowTest] = useState(false)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [testResults, setTestResults] = useState<boolean[]>([])

	const updateCurrentChapter = () => {
		const hash = window.location.hash.substring(1)
		course.modules.forEach((module, mIdx) => {
			module.chapters.forEach((chapter, cIdx) => {
				if (chapter.hash === hash) {
					setCurrentModuleIndex(mIdx)
					setCurrentChapterIndex(cIdx)
					setCurrentModule(module)
					setCurrentChapter(chapter)
					setShowTest(false)
				}
			})
		})
	}

	const handleNextQuestion = () => {
		if (currentQuestionIndex < testBlocks.length - 1) {
			setCurrentQuestionIndex(prev => prev + 1)
		}
	}

	const handlePrevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(prev => prev - 1)
		}
	}

	const handleMarkAsRead = () => {
		markChapterAsRead(currentModule.id, currentChapter.id)
		setShowTest(true)
	}

	const handleQuestionComplete = (isCorrect: boolean) => {
		setTestResults(prev => {
			const newResults = [...prev]
			newResults[currentQuestionIndex] = isCorrect
			return newResults
		})

		if (
			currentTestBlock?.type !== 'drag-drop-table' &&
			currentQuestionIndex < testBlocks.length - 1
		) {
			setTimeout(handleNextQuestion, 1000)
		} else if (currentQuestionIndex === testBlocks.length - 1) {
			markChapterAsRead(currentModule.id, currentChapter.id)
		}
	}

	useEffect(() => {
		updateCurrentChapter()
		window.addEventListener('hashchange', updateCurrentChapter)
		return () => window.removeEventListener('hashchange', updateCurrentChapter)
	}, [course.modules])

	if (!currentModule || !currentChapter)
		return <div className='p-6 text-center text-gray-500'>{t('loading')}</div>

	const testBlocks = currentChapter.blocks.filter(block =>
		['question', 'drag-drop-table', 'free-input', 'game'].includes(block.type)
	) as Block[]

	const theoryBlocks = currentChapter.blocks.filter(block =>
		['text', 'image'].includes(block.type)
	) as TextBlock[] | ImageBlock[]

	const hasDragDrop = currentChapter.blocks.some(
		b => b.type === 'drag-drop-table'
	)
	const hasGame = currentChapter.blocks.some(b => b.type === 'game')
	const hasFreeInput = currentChapter.blocks.some(b => b.type === 'free-input')
	const currentTestBlock = testBlocks[currentQuestionIndex]

	const navigateTo = (direction: 'prev' | 'next') => {
		let newModuleIndex = currentModuleIndex
		let newChapterIndex = currentChapterIndex

		if (direction === 'prev') {
			if (currentChapterIndex > 0) {
				newChapterIndex--
			} else if (currentModuleIndex > 0) {
				newModuleIndex--
				newChapterIndex = course.modules[newModuleIndex].chapters.length - 1
			}
		} else {
			if (currentChapterIndex < currentModule.chapters.length - 1) {
				newChapterIndex++
			} else if (currentModuleIndex < course.modules.length - 1) {
				newModuleIndex++
				newChapterIndex = 0
			}
		}

		const nextChapter =
			course.modules[newModuleIndex]?.chapters[newChapterIndex]
		if (nextChapter) {
			window.location.hash = nextChapter.hash
		}
	}

	return (
		<div className='flex-1 p-4 sm:p-6 min-h-screen border-t-1'>
			<div className='max-w-9xl mx-auto'>
				<ChapterHeader
					title={currentChapter.title}
					isRead={currentChapter.isRead}
				/>
				{(hasDragDrop && currentTestBlock?.type === 'drag-drop-table') ||
				(hasGame && currentTestBlock?.type === 'game') ? (
					<FullScreenBlock
						block={currentTestBlock}
						currentQuestionIndex={currentQuestionIndex}
						totalQuestions={testBlocks.length}
						onComplete={handleQuestionComplete}
						onPrev={handlePrevQuestion}
						onNext={handleNextQuestion}
						isPrevDisabled={currentQuestionIndex === 0}
						isNextDisabled={
							testResults[currentQuestionIndex] === undefined ||
							currentQuestionIndex === testBlocks.length - 1
						}
					/>
				) : (
					<div className='flex flex-col lg:flex-row gap-6'>
						<div className={`${hasFreeInput ? 'lg:w-1/2' : 'lg:w-2/3'} w-full`}>
							<TheorySection
								theoryBlocks={theoryBlocks}
								isRead={currentChapter.isRead}
								onMarkAsRead={handleMarkAsRead}
							/>
						</div>
						<TestSection
							testBlocks={testBlocks}
							currentQuestionIndex={currentQuestionIndex}
							moduleId={currentModule.id}
							chapterId={currentChapter.id}
							showTest={showTest}
							isRead={currentChapter.isRead}
							onComplete={handleQuestionComplete}
						/>
					</div>
				)}
				<NavigationButtons
					course={course}
					currentModuleIndex={currentModuleIndex}
					currentChapterIndex={currentChapterIndex}
					onNavigate={navigateTo}
				/>
			</div>
		</div>
	)
}

export default Content

import { Block, Chapter, ImageBlock, Module, TextBlock } from '@/data/types'
import { useCourse } from '@/hooks/useCourse'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChapterHeader } from './ChapterHeader'
import { NavigationButtons } from './NavigationButtons'
import { FullScreenBlock, TestSection, TheorySection } from './sections'

export const Content: React.FC = () => {
	const { t } = useTranslation('coursePage')
	const { course, markChapterAsRead } = useCourse()
	const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
	const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
	const [currentModule, setCurrentModule] = useState<Module | null>(null)
	const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null)
	const [showTest, setShowTest] = useState(false)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [testResults, setTestResults] = useState<boolean[]>([])
	const [chapterReadStatus, setChapterReadStatus] = useState<
		Record<string, boolean>
	>({})

	// Загрузка состояния isRead из localStorage
	useEffect(() => {
		const savedReadStatus = localStorage.getItem('chapterReadStatus')
		if (savedReadStatus) {
			setChapterReadStatus(JSON.parse(savedReadStatus))
		}
	}, [])

	const updateCurrentChapter = useCallback(() => {
		if (!course) return
		const hash = window.location.hash.substring(1)
		for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
			const module = course.modules[mIdx]
			for (let cIdx = 0; cIdx < module.chapters.length; cIdx++) {
				const chapter = module.chapters[cIdx]
				if (chapter.hash === hash) {
					setCurrentModuleIndex(mIdx)
					setCurrentChapterIndex(cIdx)
					setCurrentModule(module)
					setCurrentChapter(chapter)
					setShowTest(chapterReadStatus[chapter.hash] || chapter.isRead)
					setCurrentQuestionIndex(0)
					return
				}
			}
		}
		setCurrentModule(course.modules[0] || null)
		setCurrentChapter(course.modules[0]?.chapters[0] || null)
		setCurrentQuestionIndex(0)
		setShowTest(
			course.modules[0]?.chapters[0]
				? chapterReadStatus[course.modules[0].chapters[0].hash] ||
						course.modules[0].chapters[0].isRead
				: false
		)
	}, [course, chapterReadStatus])

	const handleNextQuestion = () => {
		if (testBlocks && currentQuestionIndex < testBlocks.length - 1) {
			setCurrentQuestionIndex(prev => prev + 1)
		}
	}

	const handlePrevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(prev => prev - 1)
		}
	}

	const handleMarkAsRead = () => {
		if (!currentModule || !currentChapter) return
		markChapterAsRead(currentModule.id, currentChapter.id)
		setChapterReadStatus(prev => {
			const updatedStatus = { ...prev, [currentChapter.hash]: true }
			localStorage.setItem('chapterReadStatus', JSON.stringify(updatedStatus))
			return updatedStatus
		})
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
			currentQuestionIndex < (testBlocks?.length || 0) - 1
		) {
			setTimeout(handleNextQuestion, 1000)
		} else if (testBlocks && currentQuestionIndex === testBlocks.length - 1) {
			if (currentModule && currentChapter) {
				markChapterAsRead(currentModule.id, currentChapter.id)
				setChapterReadStatus(prev => {
					const updatedStatus = { ...prev, [currentChapter.hash]: true }
					localStorage.setItem(
						'chapterReadStatus',
						JSON.stringify(updatedStatus)
					)
					return updatedStatus
				})
			}
		}
	}

	useEffect(() => {
		if (!course) return
		updateCurrentChapter()
		window.addEventListener('hashchange', updateCurrentChapter)
		return () => window.removeEventListener('hashchange', updateCurrentChapter)
	}, [course, updateCurrentChapter])

	if (!course || !currentModule || !currentChapter) {
		return <div className='p-6 text-center text-gray-500'>{t('loading')}</div>
	}

	const testBlocks = currentChapter.blocks.filter(block =>
		['question', 'drag-drop-table', 'free-input', 'game'].includes(block.type)
	) as Block[]

	const theoryBlocks = currentChapter.blocks.filter(block =>
		['text', 'image'].includes(block.type)
	) as (TextBlock | ImageBlock)[]

	const hasDragDrop = currentChapter.blocks.some(
		b => b.type === 'drag-drop-table'
	)
	const hasGame = currentChapter.blocks.some(b => b.type === 'game')
	const hasFreeInput = currentChapter.blocks.some(b => b.type === 'free-input')
	const currentTestBlock = testBlocks[currentQuestionIndex]

	// Проверяем, заблокирована ли текущая таблица
	const isCurrentTableLocked = () => {
		if (currentTestBlock?.type !== 'drag-drop-table') return true
		const savedData = JSON.parse(localStorage.getItem('dndResults') || '{}')
		const blockData = savedData[currentTestBlock.id] || {}
		return blockData.isLocked || false
	}

	// Определяем, является ли глава прочитанной
	const isChapterRead =
		chapterReadStatus[currentChapter.hash] || currentChapter.isRead

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
			<div className='max-w-9xl mx-auto pb-20'>
				<ChapterHeader title={currentChapter.title} isRead={isChapterRead} />
				{(hasDragDrop && currentTestBlock?.type === 'drag-drop-table') ||
				(hasGame && currentTestBlock?.type === 'game') ? (
					<FullScreenBlock
						block={currentTestBlock}
						testBlocks={testBlocks}
						currentQuestionIndex={currentQuestionIndex}
						totalQuestions={testBlocks.length}
						onComplete={handleQuestionComplete}
						onPrev={handlePrevQuestion}
						onNext={handleNextQuestion}
						isPrevDisabled={currentQuestionIndex === 0}
						isNextDisabled={
							(currentTestBlock?.type === 'drag-drop-table' &&
								!isCurrentTableLocked()) ||
							testResults[currentQuestionIndex] === undefined ||
							currentQuestionIndex === testBlocks.length - 1
						}
					/>
				) : (
					<div className='flex flex-col lg:flex-row gap-6'>
						{isChapterRead ? (
							<TestSection
								testBlocks={testBlocks}
								currentQuestionIndex={currentQuestionIndex}
								moduleId={currentModule.id}
								chapterId={currentChapter.id}
								showTest={showTest}
								isRead={isChapterRead}
								onComplete={handleQuestionComplete}
							/>
						) : (
							<>
								<div className='w-full'>
									<TheorySection
										theoryBlocks={theoryBlocks}
										isRead={isChapterRead}
										onMarkAsRead={handleMarkAsRead}
									/>
								</div>
								<TestSection
									testBlocks={testBlocks}
									currentQuestionIndex={currentQuestionIndex}
									moduleId={currentModule.id}
									chapterId={currentChapter.id}
									showTest={showTest}
									isRead={isChapterRead}
									onComplete={handleQuestionComplete}
								/>
							</>
						)}
					</div>
				)}
			</div>
			<NavigationButtons
				course={course}
				currentModuleIndex={currentModuleIndex}
				currentChapterIndex={currentChapterIndex}
				onNavigate={navigateTo}
			/>
		</div>
	)
}

export default Content

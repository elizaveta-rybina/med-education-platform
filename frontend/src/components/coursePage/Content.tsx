import { ImageBlock, TextBlock } from '@/data/types'
import { useCourse } from '@/hooks/useCourse'
import { useEffect, useState } from 'react'
import { DragDropTableComponent } from './DragDropTableComponent'
import { FreeInputBlock } from './FreeInputBlock'
import { GameBlock } from './GameBlock'
import { NavigationButtons } from './NavigationButtons'
import { TestBlock } from './TestBlock'
import { TheoryBlock } from './TheoryBlock'

const Content = () => {
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
					setCurrentQuestionIndex(0)
					setTestResults([])
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

		if (currentQuestionIndex < testBlocks.length - 1) {
			setTimeout(handleNextQuestion, 1000)
		} else {
			markChapterAsRead(currentModule.id, currentChapter.id)
		}
	}

	useEffect(() => {
		updateCurrentChapter()
		window.addEventListener('hashchange', updateCurrentChapter)
		return () => window.removeEventListener('hashchange', updateCurrentChapter)
	}, [course.modules])

	if (!currentModule || !currentChapter)
		return <div className='p-6 text-center text-gray-500'>Загрузка...</div>

	const testBlocks = currentChapter.blocks.filter(block =>
		['question', 'drag-drop-table', 'free-input', 'game'].includes(block.type)
	)

	const theoryBlocks = currentChapter.blocks.filter(block =>
		['text', 'image'].includes(block.type)
	)

	const hasTheoryBlocks = theoryBlocks.length > 0
	const hasDragDrop = currentChapter.blocks.some(
		b => b.type === 'drag-drop-table'
	)
	const hasFreeInput = currentChapter.blocks.some(b => b.type === 'free-input')
	const hasGame = currentChapter.blocks.some(b => b.type === 'game')
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
		<div className='flex-1 p-4 sm:p-6  min-h-screen'>
			<div className='max-w-9xl mx-auto'>
				<h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center'>
					{currentChapter.title}
					{currentChapter.isRead && (
						<span className='ml-2 text-green-500 text-sm font-normal'>
							✓ Прочитано
						</span>
					)}
				</h1>

				{/* Full-width blocks: drag-drop-table or game */}
				{(hasDragDrop && currentTestBlock?.type === 'drag-drop-table') ||
				(hasGame && currentTestBlock?.type === 'game') ? (
					<div className='w-full'>
						{currentTestBlock?.type === 'drag-drop-table' && (
							<>
								<DragDropTableComponent
									block={currentTestBlock}
									onComplete={handleQuestionComplete}
								/>
								<div className='flex gap-3 mt-6'>
									<button
										onClick={handlePrevQuestion}
										disabled={currentQuestionIndex === 0}
										className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
									>
										Назад
									</button>
									<button
										onClick={handleNextQuestion}
										disabled={currentQuestionIndex === testBlocks.length - 1}
										className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
									>
										Далее
									</button>
								</div>
							</>
						)}
						{currentTestBlock?.type === 'game' && (
							<div className='w-full max-w-9xl mx-auto'>
								<GameBlock
									block={currentTestBlock}
									onComplete={handleQuestionComplete}
								/>
							</div>
						)}
					</div>
				) : (
					<div className='flex flex-col lg:flex-row gap-6'>
						{/* Theory Column */}
						<div className={`${hasFreeInput ? 'lg:w-1/2' : 'lg:w-2/3'} w-full`}>
							<div className='space-y-6'>
								{theoryBlocks.map(block => (
									<TheoryBlock
										key={block.id}
										block={block as TextBlock | ImageBlock}
									/>
								))}
							</div>

							{!currentChapter.isRead && hasTheoryBlocks && (
								<div className='mt-6 pt-4 border-t border-gray-200'>
									<button
										onClick={handleMarkAsRead}
										className='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200'
									>
										Отметить как прочитанное
									</button>
								</div>
							)}
						</div>

						{/* Test/Question Column */}
						{(showTest || currentChapter.isRead) &&
							testBlocks.length > 0 &&
							currentTestBlock && (
								<div
									className={`${hasFreeInput ? 'lg:w-1/2' : 'lg:w-1/3'} w-full`}
								>
									<div className='lg:sticky lg:top-6 space-y-6'>
										{currentTestBlock.type === 'question' && (
											<div className='bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200'>
												<h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-4'>
													Проверка знаний ({currentQuestionIndex + 1}/
													{testBlocks.length})
												</h2>
												<TestBlock
													block={currentTestBlock}
													moduleId={currentModule.id}
													chapterId={currentChapter.id}
													questionIndex={currentQuestionIndex}
													totalQuestions={testBlocks.length}
													onNext={handleNextQuestion}
												/>
											</div>
										)}

										{currentTestBlock.type === 'free-input' && (
											<div className='bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200'>
												<FreeInputBlock
													block={currentTestBlock}
													onComplete={handleQuestionComplete}
												/>
											</div>
										)}

										
									</div>
								</div>
							)}
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

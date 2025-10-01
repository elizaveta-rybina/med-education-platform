import { Block, DragDropTableBlock } from '@/data/types'
import { DragDropTableComponent } from '@/features/drag-drop-table'
import { useCourse } from '@/hooks/useCourse'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GameBlock } from '../block'

interface FullScreenBlockProps {
	block: Block
	testBlocks: Block[]
	currentQuestionIndex: number
	totalQuestions: number
	onComplete: (isCorrect: boolean) => void
	onPrev: () => void
	onNext: () => void
	isPrevDisabled: boolean
	isNextDisabled: boolean
	chapterHash?: string // Added to pass chapterHash explicitly
}

export const FullScreenBlock: React.FC<FullScreenBlockProps> = ({
	block,
	testBlocks,
	currentQuestionIndex,
	totalQuestions,
	onComplete,
	onPrev,
	onNext,
	isPrevDisabled,
	isNextDisabled,
	chapterHash
}) => {
	const { t } = useTranslation('courseInner')
	const { course } = useCourse()

	// Memoization of dragDropTables to prevent array recreation
	const dragDropTables: DragDropTableBlock[] = useMemo(
		() =>
			testBlocks.filter(
				(table): table is DragDropTableBlock => table.type === 'drag-drop-table'
			),
		[testBlocks]
	)

	// State for current table index
	const [currentBlockIndex, setCurrentBlockIndex] = useState(0)

	// Check if the current table is locked
	const isCurrentTableLocked = () => {
		if (!dragDropTables.length || block.type !== 'drag-drop-table') return true
		const savedData = JSON.parse(localStorage.getItem('dndResults') || '{}')
		const blockData = savedData[dragDropTables[currentBlockIndex].id] || {}
		return blockData.isLocked || false
	}

	// Handlers for navigation buttons
	const handleNextTable = () => {
		if (currentBlockIndex < dragDropTables.length - 1) {
			setCurrentBlockIndex(prev => prev + 1)
		} else {
			onNext()
		}
	}

	const handlePrevTable = () => {
		if (currentBlockIndex > 0) {
			setCurrentBlockIndex(prev => prev - 1)
		} else {
			onPrev()
		}
	}

	// Navigate to the first unlocked table on mount
	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem('dndResults') || '{}')
		const firstUnlockedIndex = dragDropTables.findIndex(table => {
			const blockData = savedData[table.id] || {}
			return !blockData.isLocked
		})
		setCurrentBlockIndex(firstUnlockedIndex !== -1 ? firstUnlockedIndex : 0)
	}, [dragDropTables])

	return (
		<div className='w-full'>
			{block.type === 'drag-drop-table' && dragDropTables.length > 0 && (
				<>
					<div className='mb-4'>
						<h3 className='text-xl font-semibold text-gray-800'>
							{t('dnd.taskProgress', {
								current: currentBlockIndex + 1,
								total: dragDropTables.length
							})}
						</h3>
					</div>
					<DragDropTableComponent
						block={dragDropTables[currentBlockIndex]}
						onComplete={isCorrect => {
							onComplete(isCorrect)
							if (
								isCurrentTableLocked() &&
								currentBlockIndex < dragDropTables.length - 1
							) {
								setTimeout(() => setCurrentBlockIndex(prev => prev + 1), 1000)
							} else if (
								isCurrentTableLocked() &&
								currentBlockIndex === dragDropTables.length - 1
							) {
								onNext()
							}
						}}
						chapterHash={chapterHash} // Pass chapterHash to DragDropTableComponent
					/>
					<div className='flex gap-3 mt-6'>
						<button
							onClick={handlePrevTable}
							disabled={currentBlockIndex === 0 && isPrevDisabled}
							className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
						>
							{t('back')}
						</button>
						<button
							onClick={handleNextTable}
							disabled={
								currentBlockIndex === dragDropTables.length - 1 &&
								isNextDisabled
							}
							className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
						>
							{t('next')}
						</button>
					</div>
				</>
			)}
			{block.type === 'game' && (
				<div className='w-full max-w-9xl mx-auto'>
					<GameBlock
						block={block}
						onComplete={onComplete}
						chapterHash={chapterHash}
					/>
				</div>
			)}
		</div>
	)
}

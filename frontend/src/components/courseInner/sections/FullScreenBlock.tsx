import { Block, DragDropTableBlock } from '@/data/types'
import { DragDropTableComponent } from '@/features/drag-drop-table'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GameBlock } from '../block'

const STORAGE_KEY = 'dndResults'

const getStoredData = () => {
	return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
}

const isTableLocked = (tableId: string): boolean => {
	const savedData = getStoredData()
	const blockData = savedData[tableId] || {}
	return blockData.isLocked || false
}

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
	onComplete,
	onPrev,
	onNext,
	isPrevDisabled,
	isNextDisabled,
	chapterHash
}) => {
	const { t } = useTranslation('courseInner')

	const dragDropTables = useMemo<DragDropTableBlock[]>(
		() =>
			testBlocks.filter(
				(table): table is DragDropTableBlock => table.type === 'drag-drop-table'
			),
		[testBlocks]
	)

	const [currentBlockIndex, setCurrentBlockIndex] = useState(0)

	const isCurrentTableLocked = useCallback(() => {
		if (!dragDropTables.length || block.type !== 'drag-drop-table') return true
		return isTableLocked(dragDropTables[currentBlockIndex].id)
	}, [dragDropTables, currentBlockIndex, block.type])

	const isLastTable = currentBlockIndex === dragDropTables.length - 1
	const isFirstTable = currentBlockIndex === 0

	const handleNextTable = useCallback(() => {
		if (!isLastTable) {
			setCurrentBlockIndex(prev => prev + 1)
		} else {
			onNext()
		}
	}, [isLastTable, onNext])

	const handlePrevTable = useCallback(() => {
		if (!isFirstTable) {
			setCurrentBlockIndex(prev => prev - 1)
		} else {
			onPrev()
		}
	}, [isFirstTable, onPrev])

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
							if (!isCurrentTableLocked()) return

							if (!isLastTable) {
								setTimeout(() => setCurrentBlockIndex(prev => prev + 1), 1000)
							} else {
								onNext()
							}
						}}
						chapterHash={chapterHash}
					/>
					<div className='flex gap-3 mt-6'>
						<button
							onClick={handlePrevTable}
							disabled={isFirstTable && isPrevDisabled}
							className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
						>
							{t('back')}
						</button>
						<button
							onClick={handleNextTable}
							disabled={isLastTable && isNextDisabled}
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

import { Block, DragDropTableBlock } from '@/data/types'
import { DragDropTableComponent } from '@/features/drag-drop-table'
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
	isNextDisabled
}) => {
	const { t } = useTranslation('courseInner')

	// Мемоизация dragDropTables для предотвращения пересоздания массива
	const dragDropTables: DragDropTableBlock[] = useMemo(
		() =>
			testBlocks.filter(
				(table): table is DragDropTableBlock => table.type === 'drag-drop-table'
			),
		[testBlocks]
	)

	// Состояние для текущей таблицы
	const [currentBlockIndex, setCurrentBlockIndex] = useState(0)

	// Проверяем, заблокирована ли текущая таблица
	const isCurrentTableLocked = () => {
		if (!dragDropTables.length || block.type !== 'drag-drop-table') return true
		const savedData = JSON.parse(localStorage.getItem('dndResults') || '{}')
		const blockData = savedData[dragDropTables[currentBlockIndex].id] || {}
		return blockData.isLocked || false
	}

	// Обработчики для кнопок
	const handleNextTable = () => {
		if (currentBlockIndex < dragDropTables.length - 1) {
			setCurrentBlockIndex(prev => prev + 1)
		} else {
			// Если последняя таблица, вызываем onNext для перехода к следующему вопросу
			onNext()
		}
	}

	const handlePrevTable = () => {
		if (currentBlockIndex > 0) {
			setCurrentBlockIndex(prev => prev - 1)
		} else {
			// Если первая таблица, вызываем onPrev для перехода к предыдущему вопросу
			onPrev()
		}
	}

	// Переход к первой незалоченной таблице только при первом монтировании
	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem('dndResults') || '{}')
		const firstUnlockedIndex = dragDropTables.findIndex(table => {
			const blockData = savedData[table.id] || {}
			return !blockData.isLocked
		})
		setCurrentBlockIndex(firstUnlockedIndex !== -1 ? firstUnlockedIndex : 0)
	}, []) // Пустой массив зависимостей для выполнения только при монтировании

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
							// Автоматический переход к следующей таблице, если текущая завершена
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
					<GameBlock block={block} onComplete={onComplete} />
				</div>
			)}
		</div>
	)
}

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DragDropTableBlock } from '../model/types'
import { DragDropTableComponent } from './DragDropTableComponent'

interface DragDropTableManagerProps {
	blocks: DragDropTableBlock[]
	onComplete: (isCorrect: boolean) => void
	chapterHash?: string
}

export const DragDropTableManager: React.FC<DragDropTableManagerProps> = ({
	blocks,
	onComplete,
	chapterHash
}) => {
	const { t } = useTranslation('courseInner')
	const [currentBlockIndex, setCurrentBlockIndex] = useState(0)
	const storageKey = 'dndResults'

	if (blocks.length === 0) {
		return <div className='text-red-700'>{t('noTablesAvailable')}</div>
	}

	const currentBlock = blocks[currentBlockIndex]

	const isBlockLocked = () => {
		const savedData = JSON.parse(localStorage.getItem(storageKey) || '{}')
		const blockData = savedData[currentBlock.id] || {}
		return blockData.isLocked || false
	}

	const handleComplete = () => {
		const savedData = JSON.parse(localStorage.getItem(storageKey) || '{}')
		const blockData = savedData[currentBlock.id] || {}
		if (blockData.attempts >= 2 && currentBlockIndex < blocks.length - 1) {
			setCurrentBlockIndex(prev => prev + 1)
		}
		// Если все таблицы заблокированы, вызываем onComplete
		const allTablesLocked = blocks.every(table => {
			const tableData = savedData[table.id] || {}
			return tableData.isLocked || false
		})
		if (allTablesLocked) {
			const allCorrect = blocks.every(table => {
				const tableData = savedData[table.id] || {}
				return tableData.correctCount === table.rows.length
			})
			onComplete(allCorrect)
		}
	}

	// Проверка при монтировании, чтобы перейти к первой незалоченной таблице
	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem(storageKey) || '{}')
		const firstUnlockedIndex = blocks.findIndex(table => {
			const blockData = savedData[table.id] || {}
			return !blockData.isLocked
		})
		if (firstUnlockedIndex !== -1 && firstUnlockedIndex !== currentBlockIndex) {
			setCurrentBlockIndex(firstUnlockedIndex)
		}
	}, [blocks, currentBlockIndex])

	return (
		<div className='max-w-10xl mx-auto'>
			<div className='mb-4'>
				<h3 className='text-xl font-semibold text-gray-800'>
					{t('dnd.taskProgress', {
						current: currentBlockIndex + 1,
						total: blocks.length
					})}
				</h3>
			</div>
			<DragDropTableComponent
				block={currentBlock}
				onComplete={handleComplete}
				chapterHash={chapterHash}
			/>
			{isBlockLocked() && currentBlockIndex < blocks.length - 1 && (
				<button
					onClick={() => {
						// Отмечаем текущее задание как прочитанное
						if (chapterHash) {
							const savedReadStatus = localStorage.getItem('chapterReadStatus')
							const readStatus = savedReadStatus
								? JSON.parse(savedReadStatus)
								: {}
							readStatus[chapterHash] = true
							localStorage.setItem(
								'chapterReadStatus',
								JSON.stringify(readStatus)
							)
							window.dispatchEvent(new Event('chapterReadStatusUpdated'))
						}
						// Переходим к следующей таблице
						setCurrentBlockIndex(prev => prev + 1)
					}}
					className='mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
				>
					{t('dnd.nextTable')}
				</button>
			)}
		</div>
	)
}

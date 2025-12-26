import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
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
			<div className='mb-4'></div>
			{currentBlock.description && (
				<div className='mb-6 prose prose-sm max-w-none'>
					<ReactMarkdown
						components={{
							p: ({ children }) => (
								<p className='mb-2 text-gray-700 leading-relaxed'>{children}</p>
							),
							img: ({ src, alt }) => (
								<img
									src={src}
									alt={alt || 'Description image'}
									className='max-w-full h-auto rounded-lg my-3'
								/>
							),
							h1: ({ children }) => (
								<h1 className='text-2xl font-bold mb-3 mt-4 text-gray-800'>
									{children}
								</h1>
							),
							h2: ({ children }) => (
								<h2 className='text-xl font-bold mb-2 mt-3 text-gray-800'>
									{children}
								</h2>
							),
							h3: ({ children }) => (
								<h3 className='text-lg font-semibold mb-2 mt-2 text-gray-800'>
									{children}
								</h3>
							),
							ul: ({ children }) => (
								<ul className='list-disc list-inside mb-2 ml-4 text-gray-700'>
									{children}
								</ul>
							),
							ol: ({ children }) => (
								<ol className='list-decimal list-inside mb-2 ml-4 text-gray-700'>
									{children}
								</ol>
							),
							li: ({ children }) => <li className='mb-1'>{children}</li>,
							code: ({ children, className }) => {
								const isInline = !className?.includes('language-')
								return isInline ? (
									<code className='bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-600'>
										{children}
									</code>
								) : (
									<pre className='bg-gray-900 text-gray-100 p-3 rounded-lg mb-3 overflow-x-auto'>
										<code className='font-mono text-sm'>{children}</code>
									</pre>
								)
							},
							blockquote: ({ children }) => (
								<blockquote className='border-l-4 border-purple-400 pl-4 italic text-gray-600 my-2'>
									{children}
								</blockquote>
							),
							a: ({ href, children }) => (
								<a
									href={href}
									target='_blank'
									rel='noopener noreferrer'
									className='text-purple-600 hover:text-purple-700 underline'
								>
									{children}
								</a>
							)
						}}
					>
						{currentBlock.description}
					</ReactMarkdown>
				</div>
			)}
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

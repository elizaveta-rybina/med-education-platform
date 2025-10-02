import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDragDropTable } from '../model/hooks/useDragDropTable'
import { useGroupedRows } from '../model/hooks/useGroupedRows'
import { DragDropTableComponentProps } from '../model/types'
import { DraggableAnswer } from './DraggableAnswer'
import { DroppableCell } from './DroppableCell'

interface DragDropTableComponentPropsExtended
	extends DragDropTableComponentProps {
	chapterHash?: string
}

export const DragDropTableComponent: React.FC<
	DragDropTableComponentPropsExtended
> = ({ block, onComplete = () => {}, chapterHash }) => {
	const { t } = useTranslation('courseInner')

	const groupedRows = useGroupedRows(block)
	const {
		assigned,
		availableAnswers,
		activeAnswer,
		errors,
		isCompleted,
		attempts,
		isLocked,
		correctCount,
		handleDragStart,
		handleDragEnd,
		checkAnswers,
		resetAnswers,
		removeAnswer
	} = useDragDropTable(block, onComplete)

	const [hasInteracted, setHasInteracted] = useState(false)

	useEffect(() => {
		// if (
		// 	hasInteracted &&
		// 	availableAnswers.length === 0 &&
		// 	!isCompleted &&
		// 	Object.keys(assigned).some(id => assigned[id].length > 0)
		// ) {
		// 	checkAnswers()
		// }
	}, [availableAnswers, isCompleted, assigned, hasInteracted, checkAnswers])

	// Обработчик для кнопки "Проверить ответы" с отметкой главы как прочитанной
	const handleCheckAnswers = () => {
		if (isLocked || attempts >= 2) return

		checkAnswers()
		if (!chapterHash) {
			console.error('chapterHash is undefined or empty')
			return
		}

		console.log('chapterHash', chapterHash)
		if (chapterHash) {
			const savedReadStatus = localStorage.getItem('chapterReadStatus')
			const readStatus = savedReadStatus ? JSON.parse(savedReadStatus) : {}
			readStatus[chapterHash] = true
			localStorage.setItem('chapterReadStatus', JSON.stringify(readStatus))
		}

		window.dispatchEvent(new Event('chapterReadStatusUpdated'))
	}

	if (block.rows.length === 0 || block.columns.length === 0) {
		return (
			<div className='text-red-700'>{t('dnd.noRowsOrColumnsAvailable')}</div>
		)
	}

	return (
		<div className='max-w-10xl mx-auto bg-white'>
			<div className='mb-4 whitespace-pre-line'>
				{block.tableTitle.split('\n').map((paragraph, i) => (
					<p key={i} className='mb-2'>
						{paragraph}
					</p>
				))}
			</div>

			<h4 className='text-2xl font-semibold mb-4 text-gray-800'>
				{block.title}
			</h4>
			<DndContext
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={e => {
					setHasInteracted(true)
					handleDragEnd(e)
				}}
			>
				<div className='overflow-x-auto mb-8'>
					<table className='w-full border-collapse border-1'>
						<thead>
							<tr className='bg-gray-50'>
								{block.columns.map(column => (
									<th
										key={column.id}
										className='p-4 border-1 text-left font-medium text-gray-700'
										style={{ width: column.width || 'auto' }}
									>
										{column.title}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{groupedRows.map(group =>
								group.subRows.map((subRow, idx) => (
									<tr
										key={`row-${subRow.id}`}
										className={`border-b min-h-[3rem] ${
											errors[`${subRow.id}_effects`]
												? 'bg-red-50/50'
												: 'hover:bg-gray-50/50'
										}`}
									>
										{group.title !== 'Без названия' && idx === 0 && (
											<td
												rowSpan={group.subRows.length}
												className='p-4 border-1 text-gray-700 align-top'
											>
												{group.title}
											</td>
										)}

										{subRow.characteristic && (
											<td className='p-4 border-1 text-gray-700'>
												{subRow.characteristic}
											</td>
										)}

										<DroppableCell id={`${subRow.id}_effects`}>
											<div className='min-h-[2rem] flex flex-wrap gap-2'>
												{assigned[`${subRow.id}_effects`]?.map(answerId => {
													const answer = block.answers.find(
														a => a.id === answerId
													)
													return (
														<div
															key={`answer-${answerId}`}
															className='flex items-center bg-purple-100/80 px-3 py-1 rounded-full text-sm'
														>
															<span>{answer?.content}</span>
															{!isLocked && (
																<button
																	onClick={() =>
																		removeAnswer(
																			`${subRow.id}_effects`,
																			answerId
																		)
																	}
																	className='ml-1.5 text-gray-500 hover:text-gray-700 text-xs'
																	aria-label={t('dnd.removeAnswer')}
																>
																	×
																</button>
															)}
														</div>
													)
												})}
												{!assigned[`${subRow.id}_effects`]?.length && (
													<div className='text-gray-400 text-sm self-center'>
														{t('dnd.dragHere')}
													</div>
												)}
											</div>
										</DroppableCell>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				<div className='mb-6'>
					<h4 className='text-base font-medium mb-3 text-gray-700'>
						{t('dnd.availableAnswers')}
					</h4>
					<div className='flex flex-wrap gap-2 p-3 bg-gray-50/50 rounded-lg border border-dashed border-gray-300 min-h-20'>
						{availableAnswers.length > 0 && !isLocked ? (
							availableAnswers.map(answer => (
								<DraggableAnswer key={`draggable-${answer.id}`} id={answer.id}>
									<span className='text-gray-700'>{answer.content}</span>
								</DraggableAnswer>
							))
						) : (
							<div className='text-gray-400 italic self-center w-full text-center'>
								{isLocked ? t('dnd.tableLocked') : t('dnd.allAnswersUsed')}
							</div>
						)}
					</div>
				</div>

				<DragOverlay>
					{activeAnswer && !isLocked ? (
						<div className='px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-md'>
							{activeAnswer.content}
						</div>
					) : null}
				</DragOverlay>
			</DndContext>

			<div className='flex gap-3 mt-6'>
				{!isLocked && (
					<button
						onClick={handleCheckAnswers}
						disabled={attempts >= 2}
						className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
					>
						{t('dnd.checkAnswers')} ({2 - attempts} {t('dnd.attemptsLeft')})
					</button>
				)}
				{!isLocked && (
					<button
						onClick={resetAnswers}
						className='px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
					>
						{t('dnd.resetAnswers')}
					</button>
				)}
			</div>

			{isCompleted && (
				<div
					className={`mt-4 p-3 rounded-lg ${
						Object.values(errors).some(e => e)
							? 'bg-red-50 text-red-700 border border-red-100'
							: 'bg-green-50 text-green-700 border border-green-100'
					}`}
				>
					{t('dnd.correctAnswersCount', {
						count: correctCount,
						total: block.rows.length
					})}
					{Object.values(errors).some(e => e)
						? ` ${t('dnd.answersIncorrect')}`
						: ` ${t('dnd.answersCorrect')}`}
				</div>
			)}
			{isLocked && (
				<div className='mt-4 p-3 rounded-lg bg-gray-100 text-gray-700 border border-gray-200'>
					{t('dnd.tableLocked')}
				</div>
			)}
		</div>
	)
}

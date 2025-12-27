import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { QuizQuestion } from '../model/types'
import { DropdownCell } from './DropdownCell'

interface DropdownTableComponentProps {
	question: QuizQuestion
	onComplete?: (isCorrect: boolean) => void
	chapterHash?: string
}

export const DropdownTableComponent: React.FC<DropdownTableComponentProps> = ({
	question,
	onComplete = () => {},
	chapterHash
}) => {
	const { t } = useTranslation('courseInner') // Или ваш namespace

	// Состояние: ключом является cell_key (например, "row0_col1"), значением - ID опции (строкой)
	const [selectedAnswers, setSelectedAnswers] = useState<
		Record<string, string>
	>({})

	// Состояние проверки
	const [isChecked, setIsChecked] = useState(false)
	const [errors, setErrors] = useState<Record<string, boolean>>({}) // cell_key -> true (если ошибка)
	const [isLocked, setIsLocked] = useState(false)

	const { metadata, options } = question

	// --- Logic: Local Storage ---

	const storageKey = `quiz_table_${question.id}`

	useEffect(() => {
		const saved = localStorage.getItem(storageKey)
		if (saved) {
			try {
				const parsed = JSON.parse(saved)
				if (parsed.answers && Object.keys(parsed.answers).length > 0) {
					setSelectedAnswers(parsed.answers)
					// Если ответы были сохранены, считаем их "залоченными" или просто восстановленными
					// Если нужно блокировать сразу после перезагрузки - раскомментируйте:
					// setIsLocked(parsed.locked)
					// if (parsed.checked) checkAnswers(parsed.answers)
				}
			} catch (e) {
				console.error('Failed to parse saved answers', e)
			}
		}
	}, [question.id])

	const saveToStorage = (
		answers: Record<string, string>,
		locked: boolean,
		checked: boolean
	) => {
		localStorage.setItem(
			storageKey,
			JSON.stringify({ answers, locked, checked })
		)
	}

	// --- Logic: Handlers ---

	const handleSelectChange = (cellKey: string, value: string) => {
		if (isLocked) return

		const newAnswers = { ...selectedAnswers, [cellKey]: value }
		setSelectedAnswers(newAnswers)

		// Сбрасываем состояние проверки при изменении ответа
		if (isChecked) {
			setIsChecked(false)
			setErrors({})
		}
	}

	const handleCheckAnswers = () => {
		const newErrors: Record<string, boolean> = {}
		let hasError = false
		let allFilled = true

		// Проходим по всем строкам и ячейкам
		metadata.rows.forEach(row => {
			row.cells.forEach(cell => {
				if (cell.type === 'select' && cell.cell_key) {
					const userAnswer = selectedAnswers[cell.cell_key]
					const correctOptions = row.correct_answers?.[cell.cell_key] || []

					// 1. Проверяем, заполнен ли ответ
					if (!userAnswer) {
						allFilled = false
					}

					// 2. Проверяем правильность
					// userAnswer - это string, correctOptions - number[]
					const isCorrect =
						userAnswer && correctOptions.includes(parseInt(userAnswer))

					if (!isCorrect) {
						newErrors[cell.cell_key] = true
						hasError = true
					}
				}
			})
		})

		setErrors(newErrors)
		setIsChecked(true)

		const isSuccess = !hasError && allFilled

		// Если всё верно, блокируем и сохраняем успех
		if (isSuccess) {
			setIsLocked(true)
			saveToStorage(selectedAnswers, true, true)

			// Обновляем статус главы, если передан хэш
			if (chapterHash) {
				const savedReadStatus = localStorage.getItem('chapterReadStatus')
				const readStatus = savedReadStatus ? JSON.parse(savedReadStatus) : {}
				readStatus[chapterHash] = true
				localStorage.setItem('chapterReadStatus', JSON.stringify(readStatus))
				window.dispatchEvent(new Event('chapterReadStatusUpdated'))
			}
		}

		onComplete(isSuccess)
	}

	const handleResetAnswers = () => {
		if (isLocked) return
		setSelectedAnswers({})
		setIsChecked(false)
		setErrors({})
		localStorage.removeItem(storageKey)
	}

	// --- Render ---

	return (
		<div className='max-w-6xl mx-auto bg-white p-6 shadow-sm border border-gray-200 rounded-lg'>
			<h4 className='text-xl font-semibold mb-6 text-gray-800'>
				{question.text}
			</h4>

			<div className='overflow-x-auto rounded-lg border border-gray-200'>
				<table className='w-full table-auto border-collapse text-sm'>
					<thead>
						<tr className='bg-gray-100 text-gray-700'>
							{metadata.columns.map((column, idx) => (
								<th
									key={idx}
									className='text-left px-4 py-3 border-b border-gray-300 font-semibold uppercase text-xs tracking-wider'
								>
									{column.name}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{metadata.rows.map((row, rowIdx) => (
							<tr key={rowIdx} className='hover:bg-gray-50 transition-colors'>
								{row.cells.map((cell, cellIdx) => {
									const uniqueKey = cell.cell_key || `text-${rowIdx}-${cellIdx}`
									return (
										<DropdownCell
											key={uniqueKey}
											cell={cell}
											allOptions={options}
											selectedAnswer={
												cell.cell_key
													? selectedAnswers[cell.cell_key]
													: undefined
											}
											// Состояния валидации
											isChecked={isChecked}
											hasError={cell.cell_key ? errors[cell.cell_key] : false}
											isCorrect={cell.cell_key ? !errors[cell.cell_key] : false}
											onSelectChange={handleSelectChange}
											disabled={isLocked}
										/>
									)
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Кнопки управления */}
			<div className='flex gap-3 mt-6'>
				<button
					onClick={handleCheckAnswers}
					disabled={isLocked}
					className={`px-5 py-2.5 font-medium rounded-md transition-all shadow-sm ${
						isLocked
							? 'bg-purple-300 text-white cursor-not-allowed'
							: 'bg-purple-600 hover:bg-purple-700 text-white active:transform active:scale-95'
					}`}
				>
					{t('checkAnswers', 'Проверить')}
				</button>

				<button
					onClick={handleResetAnswers}
					disabled={isLocked}
					className={`px-5 py-2.5 font-medium rounded-md transition-all border ${
						isLocked
							? 'border-gray-200 text-gray-400 cursor-not-allowed'
							: 'border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100'
					}`}
				>
					{t('resetAnswers', 'Сбросить')}
				</button>
			</div>

			{/* Сообщение о статусе */}
			{isChecked && (
				<div
					className={`mt-4 px-4 py-3 rounded-md text-sm font-medium flex items-center gap-2 ${
						Object.keys(errors).length > 0
							? 'bg-red-50 text-red-700 border border-red-200'
							: 'bg-green-50 text-green-700 border border-green-200'
					}`}
				>
					{Object.keys(errors).length > 0 ? (
						<>
							<svg
								className='w-5 h-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
							{t('answersIncorrect', 'Есть ошибки. Попробуйте еще раз.')}
						</>
					) : (
						<>
							<svg
								className='w-5 h-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
							{t('answersCorrect', 'Все верно! Молодец!')}
						</>
					)}
				</div>
			)}
		</div>
	)
}

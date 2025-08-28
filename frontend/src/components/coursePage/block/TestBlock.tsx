import { DragDropTableBlock, QuestionBlock } from '@/data/types'
import { useTest } from '@/hooks/tests/useTest'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface TestBlockProps {
	block: QuestionBlock | DragDropTableBlock
	moduleId: string
	chapterId: string
	questionIndex: number
	totalQuestions: number
	onNext: () => void
}

export const TestBlock = ({
	block,
	moduleId,
	chapterId,
	questionIndex,
	totalQuestions,
	onNext
}: TestBlockProps) => {
	const { t } = useTranslation('coursePage')
	const { testResults, testError, submitTest, resetTestForChapter } =
		useTest(chapterId)
	const [selectedOptions, setSelectedOptions] = useState<string[]>([])
	const [isTestCompleted, setIsTestCompleted] = useState(!!testResults)
	const [localAnswers, setLocalAnswers] = useState<
		{ questionId: string; selectedOptionIds: string[] }[]
	>([])

	useEffect(() => {
		setSelectedOptions([])
	}, [moduleId, chapterId, questionIndex])

	const handleOptionChange = (optionId: string) => {
		setSelectedOptions(prev =>
			prev.includes(optionId)
				? prev.filter(id => id !== optionId)
				: [...prev, optionId]
		)
	}

	const handleDragDropChange = (rowId: string, answerId: string) => {
		const optionId = `${rowId}:${answerId}`
		setSelectedOptions(prev =>
			prev.includes(optionId)
				? prev.filter(id => id !== optionId)
				: [...prev, optionId]
		)
	}

	const handleNext = async () => {
		if (selectedOptions.length > 0) {
			setLocalAnswers(prev => {
				const existingAnswerIndex = prev.findIndex(
					answer => answer.questionId === block.id
				)
				const newAnswer = {
					questionId: block.id,
					selectedOptionIds: selectedOptions
				}
				if (existingAnswerIndex >= 0) {
					const updatedAnswers = [...prev]
					updatedAnswers[existingAnswerIndex] = newAnswer
					return updatedAnswers
				}
				return [...prev, newAnswer]
			})
		}

		if (questionIndex === totalQuestions - 1) {
			setIsTestCompleted(true)
			submitTest(localAnswers)
		} else {
			onNext()
		}
	}

	const handleReset = () => {
		setIsTestCompleted(false)
		setLocalAnswers([])
		setSelectedOptions([])
		resetTestForChapter()
	}

	if (isTestCompleted || testResults) {
		if (testError) {
			return (
				<div className='my-6 p-4 bg-gray-50 rounded-lg'>
					<h3 className='font-medium text-lg mb-4'>{t('error')}</h3>
					<p className='text-sm mb-4'>{t('errorMessage', { testError })}</p>
					<div className='flex justify-end'>
						<button
							onClick={handleReset}
							className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition'
						>
							{t('tryAgain')}
						</button>
					</div>
				</div>
			)
		}

		if (testResults) {
			const passed = testResults.totalCorrect >= 3
			const bgColor = passed ? 'bg-green-100' : 'bg-red-100'
			const statusText = passed ? t('testPassed') : t('testFailed')

			return (
				<div className={`my-6 p-4 rounded-lg ${bgColor}`}>
					<h3 className='font-medium text-lg mb-4'>{t('testResults')}</h3>
					<p className='text-sm mb-2'>
						{t('testResultsSummary', {
							totalCorrect: testResults.totalCorrect,
							totalQuestions: testResults.totalQuestions
						})}
					</p>
					<p className='text-sm font-semibold'>{statusText}</p>
					{/* <div className='flex justify-end'>
            <button
              onClick={handleReset}
              className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition'
            >
              {t('retakeTest')}
            </button>
          </div> */}
				</div>
			)
		}

		return (
			<div className='my-6 p-4 bg-gray-50 rounded-lg'>
				<h3 className='font-medium text-lg mb-4'>{t('submittingResults')}</h3>
				<div className='flex justify-center'>
					<div className='animate-spin h-5 w-5 border-2 border-purple-500 rounded-full border-t-transparent'></div>
				</div>
			</div>
		)
	}

	if (block.type === 'question') {
		return (
			<div className='my-6 p-4 bg-gray-50 rounded-lg'>
				<div className='flex justify-between items-center mb-4'>
					<h3 className='font-medium text-lg'>
						{t('questionNumber', {
							currentQuestionIndex: questionIndex + 1,
							totalQuestions
						})}
					</h3>
				</div>

				<h4 className='font-medium mb-3'>{block.question}</h4>
				<ul className='space-y-2 mb-6'>
					{block.options.map(option => (
						<li key={option.id}>
							<label className='flex items-center'>
								<input
									type='checkbox'
									name={`question-${block.id}`}
									className='mr-2'
									checked={selectedOptions.includes(option.id)}
									onChange={() => handleOptionChange(option.id)}
								/>
								<span>{option.text}</span>
							</label>
						</li>
					))}
				</ul>

				<div className='flex justify-end'>
					<button
						onClick={handleNext}
						className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition'
					>
						{questionIndex < totalQuestions - 1
							? t('nextQuestion')
							: t('completeTest')}
					</button>
				</div>
			</div>
		)
	}

	if (block.type === 'drag-drop-table') {
		return (
			<div className='my-6 p-4 bg-gray-50 rounded-lg'>
				<div className='flex justify-between items-center mb-4'>
					<h3 className='font-medium text-lg'>
						{t('questionNumber', {
							currentQuestionIndex: questionIndex + 1,
							totalQuestions
						})}
					</h3>
				</div>

				<h4 className='font-medium mb-3'>{block.title}</h4>
				<p className='text-sm mb-4'>{block.tableTitle}</p>
				<table className='w-full mb-6 border-collapse'>
					<thead>
						<tr>
							{block.columns.map(column => (
								<th
									key={column.id}
									style={{ width: column.width }}
									className='border p-2'
								>
									{column.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{block.rows.map(row => (
							<tr key={row.id}>
								<td className='border p-2'>{row.column1}</td>
								<td className='border p-2'>{row.column2}</td>
								<td className='border p-2'>
									<div className='flex flex-wrap gap-2'>
										{block.answers.map(answer => (
											<button
												key={answer.id}
												onClick={() => handleDragDropChange(row.id, answer.id)}
												className={`px-2 py-1 rounded ${
													selectedOptions.includes(`${row.id}:${answer.id}`)
														? 'bg-purple-500 text-white'
														: 'bg-gray-200'
												}`}
											>
												{answer.content}
											</button>
										))}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className='flex justify-end'>
					<button
						onClick={handleNext}
						className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition'
					>
						{questionIndex < totalQuestions - 1
							? t('nextQuestion')
							: t('completeTest')}
					</button>
				</div>
			</div>
		)
	}

	return null
}

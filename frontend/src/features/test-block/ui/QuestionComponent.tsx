import { memo } from 'react'
import { QuestionBlock } from '../model/types'

interface QuestionComponentProps {
	block: QuestionBlock
	questionIndex: number
	totalQuestions: number
	selectedOptions: string[]
	handleOptionChange: (optionId: string) => void
	handleNext: () => void
	t: (key: string, options?: any) => string
	isSubmitting: boolean
}

export const QuestionComponent: React.FC<QuestionComponentProps> = memo(
	({
		block,
		questionIndex,
		totalQuestions,
		selectedOptions,
		handleOptionChange,
		handleNext,
		t,
		isSubmitting
	}) => {
		return (
			<div className='my-6 p-4 bg-gray-50 rounded-lg w-3xl'>
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
						disabled={isSubmitting}
					>
						{questionIndex < totalQuestions - 1
							? t('nextQuestion')
							: t('completeTest')}
					</button>
				</div>
			</div>
		)
	}
)

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
			<div className='bg-white max-w-3xl mx-auto'>
				<div className='flex justify-between items-center mb-6'>
					<h3 className='text-xl font-semibold text-gray-800'>
						{t('questionNumber', {
							currentQuestionIndex: questionIndex + 1,
							totalQuestions
						})}
					</h3>
				</div>

				<h4 className='text-lg font-medium text-gray-700 mb-4'>
					{block.question}
				</h4>
				<ul className='space-y-3 mb-8'>
					{block.options.map(option => (
						<li key={option.id}>
							<label className='flex items-center gap-3 cursor-pointer'>
								<input
									type='checkbox'
									name={`question-${block.id}`}
									className='h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 transition duration-200'
									checked={selectedOptions.includes(option.id)}
									onChange={() => handleOptionChange(option.id)}
									aria-checked={selectedOptions.includes(option.id)}
								/>
								<span className='text-gray-600 text-base'>{option.text}</span>
							</label>
						</li>
					))}
				</ul>

				<div className='flex justify-end'>
					<button
						onClick={handleNext}
						className='px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 disabled:bg-purple-300 disabled:cursor-not-allowed'
						disabled={isSubmitting}
						aria-label={
							questionIndex < totalQuestions - 1
								? t('nextQuestion')
								: t('completeTest')
						}
					>
						{isSubmitting ? (
							<span className='flex items-center gap-2'>
								<svg
									className='animate-spin h-5 w-5 text-white'
									viewBox='0 0 24 24'
								>
									<circle
										className='opacity-25'
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										strokeWidth='4'
										fill='none'
									/>
									<path
										className='opacity-75'
										fill='currentColor'
										d='M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z'
									/>
								</svg>
								{t('submitting')}
							</span>
						) : questionIndex < totalQuestions - 1 ? (
							t('nextQuestion')
						) : (
							t('completeTest')
						)}
					</button>
				</div>
			</div>
		)
	}
)

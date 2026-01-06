import { DropdownTableComponent } from '@/features/dropdown-table'
import { useTestBlock } from '../model/hooks/useTestBlock'
import { QuestionBlock, TestBlockProps } from '../model/types'
import { QuestionComponent } from './QuestionComponent'
import { TestResultComponent } from './TestResultComponent'

export const TestBlockComponent: React.FC<TestBlockProps> = ({
	block,
	moduleId,
	chapterId,
	questionIndex,
	totalQuestions,
	onNext
}) => {
	const {
		t,
		testResults,
		testError,
		isTestCompleted,
		isSubmitting,
		selectedOptions,
		handleOptionChange,
		handleNext,
		handleReset
	} = useTestBlock({
		block,
		moduleId,
		chapterId,
		questionIndex,
		totalQuestions,
		onNext
	})

	if (isTestCompleted || testResults) {
		return (
			<TestResultComponent
				testResults={testResults}
				testError={testError}
				handleReset={handleReset}
				t={t}
			/>
		)
	}

	if (block.type === 'question') {
		return (
			<QuestionComponent
				block={block as QuestionBlock}
				questionIndex={questionIndex}
				totalQuestions={totalQuestions}
				selectedOptions={selectedOptions}
				handleOptionChange={handleOptionChange}
				handleNext={handleNext}
				t={t}
				isSubmitting={isSubmitting}
			/>
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
				<DropdownTableComponent
					question={block as any}
					onComplete={isCorrect => {
						if (isCorrect) handleNext()
					}}
				/>
			</div>
		)
	}

	return null
}

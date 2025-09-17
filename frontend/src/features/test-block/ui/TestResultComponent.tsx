import { memo } from 'react'

interface TestResultComponentProps {
	testResults: { totalCorrect: number; totalQuestions: number } | null
	testError: string | null
	handleReset: () => void
	t: (key: string, options?: any) => string
}

export const TestResultComponent: React.FC<TestResultComponentProps> = memo(
	({ testResults, testError, handleReset, t }) => {
		if (testError) {
			return (
				<div className='my-8 p-6 bg-white rounded-xl shadow-sm border border-red-200 max-w-3xl mx-auto'>
					<h3 className='text-xl font-semibold text-red-700 mb-4'>
						{t('error')}
					</h3>
					<p className='text-base text-gray-600 mb-6'>
						{t('errorMessage', { testError })}
					</p>
					<div className='flex justify-end'>
						<button
							onClick={handleReset}
							className='px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200'
							aria-label={t('tryAgain')}
						>
							{t('tryAgain')}
						</button>
					</div>
				</div>
			)
		}

		if (testResults) {
			const passed = testResults.totalCorrect >= 3
			const bgColor = passed
				? 'bg-green-50 border-green-200'
				: 'bg-red-50 border-red-200'
			const textColor = passed ? 'text-green-700' : 'text-red-700'

			return (
				<div
					className={` p-6 bg-white rounded-xl shadow-sm border ${bgColor} max-w-3xl mx-auto`}
				>
					<h3 className='text-xl font-semibold text-gray-800 mb-4'>
						{t('testResults')}
					</h3>
					<p className='text-base text-gray-600 mb-2'>
						{t('testResultsSummary', {
							totalCorrect: testResults.totalCorrect,
							totalQuestions: testResults.totalQuestions
						})}
					</p>
					<p className={`text-base font-semibold ${textColor}`}>
						{passed ? t('testPassed') : t('testFailed')}
					</p>
				</div>
			)
		}

		return (
			<div className='my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 max-w-3xl mx-auto'>
				<h3 className='text-xl font-semibold text-gray-800 mb-4'>
					{t('submittingResults')}
				</h3>
				<div className='flex justify-center'>
					<svg
						className='animate-spin h-6 w-6 text-purple-600'
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
				</div>
			</div>
		)
	}
)

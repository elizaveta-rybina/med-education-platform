interface TestResultComponentProps {
	testResults: { totalCorrect: number; totalQuestions: number } | null
	testError: string | null
	handleReset: () => void
	t: (key: string, options?: any) => string
}

export const TestResultComponent: React.FC<TestResultComponentProps> = ({
	testResults,
	testError,
	handleReset,
	t
}) => {
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
			</div>
		)
	}

	return (
		<div className='my-6 p-4 bg-gray-50 rounded-lg w-3xl'>
			<h3 className='font-medium text-lg mb-4'>{t('submittingResults')}</h3>
			<div className='flex justify-center'>
				<div className='animate-spin h-5 w-5 border-2 border-purple-500 rounded-full border-t-transparent'></div>
			</div>
		</div>
	)
}

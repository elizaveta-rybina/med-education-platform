import type { AppDispatch, RootState } from '@/app/store'
import {
	selectTestError,
	selectTestResults,
	selectTestStatus
} from '@/app/store/test/selectors'
import { Answer, resetTest } from '@/app/store/test/slice'
import { submitTestAnswers } from '@/app/store/test/thunks'
import { useDispatch, useSelector } from 'react-redux'

export const useTest = (chapterId: string) => {
	const dispatch = useDispatch<AppDispatch>()
	const testResults = useSelector((state: RootState) =>
		selectTestResults(state, chapterId)
	)
	const testStatus = useSelector((state: RootState) => selectTestStatus(state))
	const testError = useSelector((state: RootState) => selectTestError(state))

	const submitTest = (answers: Answer[]) => {
		dispatch(submitTestAnswers({ answers, chapterId }))
	}

	const resetTestForChapter = () => {
		dispatch(resetTest(chapterId))
	}

	return {
		testResults,
		testStatus,
		testError,
		submitTest,
		resetTestForChapter
	}
}

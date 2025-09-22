import type { AppDispatch, RootState } from '@/app/store'
import {
	selectTestError,
	selectTestResults,
	selectTestStatus
} from '@/app/store/test/selectors'
import { Answer, resetTest } from '@/app/store/test/slice'
import { submitTestAnswers } from '@/app/store/test/thunks'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const useTest = (chapterId: string) => {
	const dispatch = useDispatch<AppDispatch>()
	const { courseId } = useParams<{ courseId: string }>()
	const { i18n } = useTranslation()

	const testResults = useSelector((state: RootState) =>
		selectTestResults(state, chapterId)
	)
	const testStatus = useSelector((state: RootState) => selectTestStatus(state))
	const testError = useSelector((state: RootState) => selectTestError(state))

	const submitTest = async (answers: Answer[]) => {
		if (!courseId) {
			console.error('courseId is missing, cannot submit test')
			return
		}

		try {
			await dispatch(
				submitTestAnswers({
					answers,
					chapterId,
					courseId,
					language: i18n.language
				})
			).unwrap()
		} catch (err) {
			console.error(`Failed to submit test for chapter ${chapterId}:`, err)
		}
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

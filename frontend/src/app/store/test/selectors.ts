import { TestState } from './slice'

export const selectAnswers = (state: { test: TestState }) => state.test.answers
export const selectTestResults = (
	state: { test: TestState },
	chapterId: string
) => state.test.results[chapterId] || null
export const selectTestStatus = (state: { test: TestState }) =>
	state.test.status
export const selectTestError = (state: { test: TestState }) => state.test.error

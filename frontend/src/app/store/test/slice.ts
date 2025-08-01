import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { submitTestAnswers } from './thunks'

export interface Answer {
	questionId: string
	selectedOptionIds: string[]
}

export interface TestState {
	answers: Answer[]
	results: {
		[chapterId: string]: { totalCorrect: number; totalQuestions: number }
	}
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const loadResultsFromStorage = (): {
	[chapterId: string]: { totalCorrect: number; totalQuestions: number }
} => {
	try {
		const saved = localStorage.getItem('testResults')
		return saved ? JSON.parse(saved) : {}
	} catch {
		return {}
	}
}

const initialState: TestState = {
	answers: [],
	results: loadResultsFromStorage(),
	status: 'idle',
	error: null
}

const saveResultsToStorage = (results: {
	[chapterId: string]: { totalCorrect: number; totalQuestions: number }
}) => {
	try {
		localStorage.setItem('testResults', JSON.stringify(results))
	} catch {
		console.error('Failed to save test results to localStorage')
	}
}

const testSlice = createSlice({
	name: 'test',
	initialState,
	reducers: {
		addAnswer: (state, action: PayloadAction<Answer>) => {
			const existingAnswerIndex = state.answers.findIndex(
				answer => answer.questionId === action.payload.questionId
			)
			if (existingAnswerIndex >= 0) {
				state.answers[existingAnswerIndex] = action.payload
			} else {
				state.answers.push(action.payload)
			}
		},
		resetTest: (state, action: PayloadAction<string>) => {
			const chapterId = action.payload
			delete state.results[chapterId]
			state.answers = []
			state.status = 'idle'
			state.error = null
			saveResultsToStorage(state.results)
		}
	},
	extraReducers: builder => {
		builder
			.addCase(submitTestAnswers.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(submitTestAnswers.fulfilled, (state, action) => {
				state.status = 'succeeded'
				const { chapterId } = action.meta.arg
				state.results[chapterId] = action.payload
				saveResultsToStorage(state.results)
			})
			.addCase(submitTestAnswers.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload ?? 'Unknown error'
			})
	}
})

export const { addAnswer, resetTest } = testSlice.actions
export default testSlice.reducer

import { baseApi } from '@/app/api/baseApi'
import type {
	Quiz,
	QuizPayload,
	QuizQuestionPayload,
	QuizQuestionResponse,
	QuizResponse
} from '@/app/api/quizzes/quizzes.types'

export const quizzesApi = {
	getAll: async (): Promise<Quiz[]> => {
		const { data } = await baseApi.get<Quiz[]>(`/admin/content/quizzes`)
		return data
	},

	create: async (payload: QuizPayload): Promise<QuizResponse> => {
		const { data } = await baseApi.post<QuizResponse>(
			'/admin/content/quizzes',
			payload
		)
		return data
	},

	getById: async (id: number): Promise<QuizResponse> => {
		const { data } = await baseApi.get<QuizResponse>(
			`/admin/content/quizzes/${id}`
		)
		return data
	},

	update: async (
		id: number,
		payload: Partial<QuizPayload>
	): Promise<QuizResponse> => {
		const { data } = await baseApi.put<QuizResponse>(
			`/admin/content/quizzes/${id}`,
			payload
		)
		return data
	},

	delete: async (id: number): Promise<{ message?: string }> => {
		const { data } = await baseApi.delete<{ message?: string }>(
			`/admin/content/quizzes/${id}`
		)
		return data
	},

	createQuestion: async (
		quizId: number,
		payload: QuizQuestionPayload
	): Promise<QuizQuestionResponse> => {
		const { data } = await baseApi.post<QuizQuestionResponse>(
			`/admin/content/quizzes/${quizId}/questions`,
			payload
		)
		return data
	},

	updateQuestion: async (
		quizId: number,
		questionId: number,
		payload: Partial<QuizQuestionPayload>
	): Promise<QuizQuestionResponse> => {
		const { data } = await baseApi.put<QuizQuestionResponse>(
			`/admin/content/quizzes/${quizId}/questions/${questionId}`,
			payload
		)
		return data
	},

	deleteQuestion: async (
		quizId: number,
		questionId: number
	): Promise<{ message?: string }> => {
		const { data } = await baseApi.delete<{ message?: string }>(
			`/admin/content/quizzes/${quizId}/questions/${questionId}`
		)
		return data
	}
}

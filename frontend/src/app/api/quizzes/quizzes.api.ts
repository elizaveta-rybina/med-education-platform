import { ApiClient } from '@/app/api/apiClient'
import type {
	Quiz,
	QuizPayload,
	QuizQuestionPayload,
	QuizQuestionResponse,
	QuizResponse
} from '@/app/api/quizzes/quizzes.types'

const BASE_URL = '/admin/content/quizzes'

export const quizzesApi = {
	getAll: () => ApiClient.get<Quiz[]>(BASE_URL),

	create: (payload: QuizPayload) =>
		ApiClient.post<QuizResponse>(BASE_URL, payload),

	getById: (id: number) => ApiClient.get<QuizResponse>(`${BASE_URL}/${id}`),

	update: (id: number, payload: Partial<QuizPayload>) =>
		ApiClient.put<QuizResponse>(`${BASE_URL}/${id}`, payload),

	delete: (id: number) => ApiClient.delete(`${BASE_URL}/${id}`),

	createQuestion: (quizId: number, payload: QuizQuestionPayload) =>
		ApiClient.post<QuizQuestionResponse>(
			`${BASE_URL}/${quizId}/questions`,
			payload
		),

	updateQuestion: (
		quizId: number,
		questionId: number,
		payload: Partial<QuizQuestionPayload>
	) =>
		ApiClient.put<QuizQuestionResponse>(
			`${BASE_URL}/${quizId}/questions/${questionId}`,
			payload
		),

	deleteQuestion: (quizId: number, questionId: number) =>
		ApiClient.delete(`${BASE_URL}/${quizId}/questions/${questionId}`)
}

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
	/**
	 * Get all quizzes
	 */
	getAll: () => ApiClient.get<Quiz[]>(BASE_URL),

	/**
	 * Create a new quiz
	 * POST /api/admin/quizzes
	 */
	create: (payload: QuizPayload) =>
		ApiClient.post<QuizResponse>(BASE_URL, payload),

	/**
	 * Get a specific quiz by ID
	 */
	getById: (id: number) => ApiClient.get<QuizResponse>(`${BASE_URL}/${id}`),

	/**
	 * Update a quiz
	 * PUT /api/admin/quizzes/{id}
	 */
	update: (id: number, payload: Partial<QuizPayload>) =>
		ApiClient.put<QuizResponse>(`${BASE_URL}/${id}`, payload),

	/**
	 * Delete a quiz
	 * DELETE /api/admin/quizzes/{id}
	 */
	delete: (id: number) => ApiClient.delete(`${BASE_URL}/${id}`),

	/**
	 * Add a new question to a quiz
	 * POST /api/admin/quizzes/{id}/questions
	 */
	createQuestion: (quizId: number, payload: QuizQuestionPayload) =>
		ApiClient.post<QuizQuestionResponse>(
			`${BASE_URL}/${quizId}/questions`,
			payload
		),

	/**
	 * Update a specific question in a quiz
	 * PUT /api/admin/quizzes/{id}/questions/{questionId}
	 */
	updateQuestion: (
		quizId: number,
		questionId: number,
		payload: Partial<QuizQuestionPayload>
	) =>
		ApiClient.put<QuizQuestionResponse>(
			`${BASE_URL}/${quizId}/questions/${questionId}`,
			payload
		),

	/**
	 * Delete a question from a quiz
	 * DELETE /api/admin/quizzes/{id}/questions/{questionId}
	 */
	deleteQuestion: (quizId: number, questionId: number) =>
		ApiClient.delete(`${BASE_URL}/${quizId}/questions/${questionId}`),

	/**
	 * Upload an image for a quiz
	 * POST /api/admin/content/quizzes/{id}/attachments/images/upload
	 */
	uploadImage: (id: number, file: File) =>
		ApiClient.upload<any>(
			`${BASE_URL}/${id}/attachments/images/upload`,
			file,
			'image'
		),

	/**
	 * Delete an image from a quiz
	 * DELETE /api/admin/content/quizzes/{id}/attachments/images/{imageId}
	 */
	deleteImage: (quizId: number, imageId: number) =>
		ApiClient.delete(`${BASE_URL}/${quizId}/attachments/images/${imageId}`)
}

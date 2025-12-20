import { ApiClient } from '@/app/api/apiClient'
import type {
	Lecture,
	LectureAttachmentResponse,
	LecturePayload,
	LectureResponse
} from '@/app/api/lectures/lectures.types'

const BASE_URL = '/admin/content/lectures'

export const lecturesApi = {
	getByTopicId: (topicId: number) =>
		ApiClient.get<{
			success: boolean
			data: { lectures: Lecture[]; quizzes: unknown[]; assignments: unknown[] }
		}>(`/admin/content/topics/${topicId}/contents`),

	create: (payload: LecturePayload) =>
		ApiClient.post<LectureResponse>(BASE_URL, payload),

	getById: (id: number) => ApiClient.get<LectureResponse>(`${BASE_URL}/${id}`),

	update: (id: number, payload: Partial<LecturePayload>) =>
		ApiClient.put<LectureResponse>(`${BASE_URL}/${id}`, payload),

	delete: (id: number) => ApiClient.delete(`${BASE_URL}/${id}`),

	uploadDocument: (id: number, file: File) =>
		ApiClient.upload<LectureAttachmentResponse>(
			`${BASE_URL}/${id}/upload-doc`,
			file,
			'file'
		),

	uploadImage: (id: number, file: File) =>
		ApiClient.upload<LectureAttachmentResponse>(
			`${BASE_URL}/${id}/attachments/images/upload`,
			file,
			'image'
		),

	deleteImage: (lectureId: number, imageId: number) =>
		ApiClient.delete(`${BASE_URL}/${lectureId}/attachments/images/${imageId}`)
}

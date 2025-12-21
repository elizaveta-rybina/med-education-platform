import { ApiClient } from '@/app/api/apiClient'
import type {
	TopicBulkCreateRequest,
	TopicContent,
	TopicContentResponse,
	TopicPayload,
	TopicResponse
} from '@/app/api/topics/topics.types'

const BASE_URL = '/admin/content/topics'

export const topicsApi = {
	bulkCreate: (payload: TopicBulkCreateRequest) =>
		ApiClient.post<TopicResponse>(`${BASE_URL}/bulk`, payload),

	getById: (id: number) => ApiClient.get<TopicResponse>(`${BASE_URL}/${id}`),

	getByModule: async (moduleId: number) => {
		const { data } = await ApiClient.get<{ data: any[] }>(
			`/admin/content/modules/${moduleId}/topics`
		)
		return data
	},

	update: (id: number, payload: Partial<TopicPayload>) =>
		ApiClient.put<TopicResponse>(`${BASE_URL}/${id}`, payload),

	delete: (id: number) => ApiClient.delete(`${BASE_URL}/${id}`),

	getContents: (topicId: number) =>
		ApiClient.get<TopicContentResponse>(`${BASE_URL}/${topicId}/contents`),

	createContent: (topicId: number, payload: TopicContent) =>
		ApiClient.post<TopicContentResponse>(
			`${BASE_URL}/${topicId}/contents`,
			payload
		),

	uploadCover: (id: number, file: File) =>
		ApiClient.upload<{ message: string; cover_image: string; url: string }>(
			`${BASE_URL}/${id}/cover`,
			file,
			'cover'
		)
}

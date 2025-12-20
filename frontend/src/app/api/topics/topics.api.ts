import { baseApi } from '@/app/api/baseApi'
import type {
	Topic,
	TopicBulkCreateRequest,
	TopicContent,
	TopicContentResponse,
	TopicPayload,
	TopicResponse
} from '@/app/api/topics/topics.types'

export const topicsApi = {
	bulkCreate: async (payload: TopicBulkCreateRequest): Promise<TopicResponse> => {
		const { data } = await baseApi.post<TopicResponse>(
			'/admin/content/topics/bulk',
			payload
		)
		return data
	},

	getById: async (id: number): Promise<TopicResponse> => {
		const { data } = await baseApi.get<TopicResponse>(`/admin/content/topics/${id}`)
		return data
	},

	update: async (id: number, payload: Partial<TopicPayload>): Promise<TopicResponse> => {
		const { data } = await baseApi.put<TopicResponse>(
			`/admin/content/topics/${id}`,
			payload
		)
		return data
	},

	delete: async (id: number): Promise<{ message?: string }> => {
		const { data } = await baseApi.delete<{ message?: string }>(
			`/admin/content/topics/${id}`
		)
		return data
	},

	getContents: async (topicId: number): Promise<TopicContentResponse> => {
		const { data } = await baseApi.get<TopicContentResponse>(
			`/admin/content/topics/${topicId}/contents`
		)
		return data
	},

	createContent: async (
		topicId: number,
		payload: TopicContent
	): Promise<TopicContentResponse> => {
		const { data } = await baseApi.post<TopicContentResponse>(
			`/admin/content/topics/${topicId}/contents`,
			payload
		)
		return data
	}
}

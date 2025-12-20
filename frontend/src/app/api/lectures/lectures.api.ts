import { baseApi } from '@/app/api/baseApi'
import type {
	LectureAttachmentResponse,
	LecturePayload,
	LectureResponse
} from '@/app/api/lectures/lectures.types'

export const lecturesApi = {
	create: async (payload: LecturePayload): Promise<LectureResponse> => {
		const { data } = await baseApi.post<LectureResponse>(
			'/admin/content/lectures',
			payload
		)
		return data
	},

	getById: async (id: number): Promise<LectureResponse> => {
		const { data } = await baseApi.get<LectureResponse>(
			`/admin/content/lectures/${id}`
		)
		return data
	},

	update: async (
		id: number,
		payload: Partial<LecturePayload>
	): Promise<LectureResponse> => {
		const { data } = await baseApi.put<LectureResponse>(
			`/admin/content/lectures/${id}`,
			payload
		)
		return data
	},

	delete: async (id: number): Promise<{ message?: string }> => {
		const { data } = await baseApi.delete<{ message?: string }>(
			`/admin/content/lectures/${id}`
		)
		return data
	},

	uploadDocument: async (
		id: number,
		file: File
	): Promise<LectureAttachmentResponse> => {
		const formData = new FormData()
		formData.append('file', file)
		const { data } = await baseApi.post<LectureAttachmentResponse>(
			`/admin/content/lectures/${id}/upload-doc`,
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' }
			}
		)
		return data
	},

	uploadImage: async (
		id: number,
		file: File
	): Promise<LectureAttachmentResponse> => {
		const formData = new FormData()
		formData.append('image', file)
		const { data } = await baseApi.post<LectureAttachmentResponse>(
			`/admin/content/lectures/${id}/attachments/images/upload`,
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' }
			}
		)
		return data
	},

	deleteImage: async (
		lectureId: number,
		imageId: number
	): Promise<{ message?: string }> => {
		const { data } = await baseApi.delete<{ message?: string }>(
			`/admin/content/lectures/${lectureId}/attachments/images/${imageId}`
		)
		return data
	}
}

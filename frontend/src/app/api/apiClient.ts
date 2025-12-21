import { baseApi } from '@/app/api/baseApi'

/**
 * Общие методы для REST API операций
 */
export class ApiClient {
	static async get<T>(url: string): Promise<T> {
		const { data } = await baseApi.get<T>(url)
		return data
	}

	static async post<T>(url: string, payload?: unknown): Promise<T> {
		const { data } = await baseApi.post<T>(url, payload)
		return data
	}

	static async put<T>(url: string, payload?: unknown): Promise<T> {
		const { data } = await baseApi.put<T>(url, payload)
		return data
	}

	static async delete<T = { message?: string }>(url: string): Promise<T> {
		const { data } = await baseApi.delete<T>(url)
		return data
	}

	static async upload<T>(
		url: string,
		file: File,
		fieldName: string = 'file'
	): Promise<T> {
		const formData = new FormData()
		formData.append(fieldName, file)
		const { data } = await baseApi.post<T>(url, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		return data
	}
}

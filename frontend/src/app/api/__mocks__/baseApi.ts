/**
 * Mock baseApi for Jest tests
 */

export const baseApi = {
	defaults: {
		headers: {}
	},
	interceptors: {
		request: {
			use: jest.fn()
		},
		response: {
			use: jest.fn()
		}
	},
	get: jest.fn(),
	post: jest.fn(),
	put: jest.fn(),
	patch: jest.fn(),
	delete: jest.fn(),
	request: jest.fn()
}

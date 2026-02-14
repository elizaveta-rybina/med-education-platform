/**
 * Mock ApiClient for Jest tests
 */

export const ApiClient = {
	get: jest.fn(),
	post: jest.fn(),
	put: jest.fn(),
	patch: jest.fn(),
	delete: jest.fn(),
	request: jest.fn()
}

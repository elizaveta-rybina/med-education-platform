require('@testing-library/jest-dom')

// Mock import.meta for Vite environment variables
Object.defineProperty(global, 'import', {
	value: {
		meta: {
			env: {
				VITE_API_BASE_URL: 'http://localhost:3000/api',
				MODE: 'test'
			}
		}
	},
	writable: true
})

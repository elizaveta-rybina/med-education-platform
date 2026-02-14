module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	preset: 'ts-jest',
	testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/*.d.ts',
		'!src/**/*.test.{ts,tsx}',
		'!src/**/__tests__/**'
	],
	extensionsToTreatAsEsm: ['.ts'],
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: {
					module: 'ES2020',
					baseUrl: '.',
					paths: {
						'@/*': ['./src/*']
					},
					jsx: 'react-jsx',
					esModuleInterop: true,
					allowJs: true,
					isolatedModules: true,
					moduleResolution: 'bundler'
				}
			}
		]
	},
	globals: {
		'ts-jest': {
			tsconfig: {
				jsx: 'react',
				esModuleInterop: true
			}
		}
	}
}

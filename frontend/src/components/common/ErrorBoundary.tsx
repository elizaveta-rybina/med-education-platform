// src/components/common/ErrorBoundary.tsx
import { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
	error: Error | null
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state: ErrorBoundaryState = { hasError: false, error: null }

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('ErrorBoundary caught:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='p-4 text-center'>
					<h1 className='text-2xl font-bold text-red-600'>Произошла ошибка</h1>
					<p className='text-gray-700'>{this.state.error?.message}</p>
					<button
						className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
						onClick={() => window.location.reload()}
					>
						Перезагрузить страницу
					</button>
				</div>
			)
		}
		return this.props.children
	}
}

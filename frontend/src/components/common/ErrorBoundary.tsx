import { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = { hasError: false }

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true }
	}

	render() {
		if (this.state.hasError) {
			return <h1>Что-то пошло не так. Попробуйте перезагрузить страницу.</h1>
		}
		return this.props.children
	}
}

export default ErrorBoundary

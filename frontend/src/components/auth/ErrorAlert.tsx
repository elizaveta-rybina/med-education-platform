import { getErrorMessage } from '@/shared/config/error-messages'

interface ErrorAlertProps {
	error?: unknown
	className?: string
}

export const ErrorAlert = ({ error, className = '' }: ErrorAlertProps) => {
	if (!error) return null

	return (
		<div
			className={`p-3 text-sm text-red-500 bg-red-50 rounded-lg dark:bg-red-900/20 ${className}`}
		>
			{getErrorMessage(error)}
		</div>
	)
}

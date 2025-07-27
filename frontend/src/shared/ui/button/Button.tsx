import { ReactNode } from 'react'

interface ButtonProps {
	children: ReactNode
	size?: 'sm' | 'md'
	variant?: 'primary' | 'outline'
	startIcon?: ReactNode
	endIcon?: ReactNode
	onClick?: () => void
	disabled?: boolean
	type?: 'submit' | 'reset' | 'button' | undefined
	className?: string
}

const Button: React.FC<ButtonProps> = ({
	children,
	size = 'md',
	variant = 'primary',
	startIcon,
	endIcon,
	type,
	onClick,
	className = '',
	disabled = false
}) => {
	const sizeClasses = {
		sm: 'px-3 py-2 text-xs',
		md: 'px-4 py-2.5 text-sm'
	}

	const variantClasses = {
		primary:
			'bg-purple-500 text-white shadow-theme-xs hover:bg-purple-600 disabled:bg-purple-300 disabled:text-white/80 dark:bg-purple-800 dark:hover:bg-purple-700 dark:disabled:bg-purple-900 dark:disabled:text-white/50 focus:ring-3 focus:ring-purple-500/20 focus:border-purple-300 dark:focus:border-purple-800',
		outline:
			'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700 dark:hover:text-white focus:ring-3 focus:ring-purple-500/20 focus:border-purple-300 dark:focus:border-purple-800'
	}

	return (
		<button
			className={`inline-flex items-center justify-center gap-1.5 rounded-xl transition ${className} ${
				sizeClasses[size]
			} ${variantClasses[variant]} ${
				disabled ? 'cursor-not-allowed opacity-50' : ''
			}`}
			onClick={onClick}
			disabled={disabled}
			type={type}
		>
			{startIcon && <span className='flex items-center'>{startIcon}</span>}
			{children}
			{endIcon && <span className='flex items-center'>{endIcon}</span>}
		</button>
	)
}

export default Button

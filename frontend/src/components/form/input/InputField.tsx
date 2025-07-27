import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	success?: boolean
	error?: boolean | string
	hint?: string
	label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			type = 'text',
			className = '',
			disabled = false,
			success = false,
			error = false,
			hint,
			...props
		},
		ref
	) => {
		const errorMessage = typeof error === 'string' ? error : undefined
		const hasError = Boolean(error)

		let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`

		if (disabled) {
			inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`
		} else if (hasError) {
			inputClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`
		} else if (success) {
			inputClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`
		} else {
			inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-purple-300 focus:ring-purple-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-purple-800`
		}

		return (
			<div className='relative'>
				{label && (
					<label
						htmlFor={props.id}
						className='block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300'
					>
						{label}
					</label>
				)}
				<input
					aria-label={label}
					type={type}
					ref={ref}
					disabled={disabled}
					className={inputClasses}
					{...props}
				/>
				{(errorMessage || hint) && (
					<p
						className={`mt-1.5 text-xs ${
							hasError
								? 'text-error-500'
								: success
								? 'text-success-500'
								: 'text-gray-500'
						}`}
					>
						{errorMessage || hint}
					</p>
				)}
			</div>
		)
	}
)

export default Input

import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { CourseFormData } from '../model/types'

interface CourseModulesDescriptionTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	register: UseFormRegister<CourseFormData>
	errors: FieldErrors<CourseFormData>
	success?: boolean
	error?: boolean | string
	hint?: string
}

export const CourseModulesDescriptionTextarea = ({
	register,
	errors,
	success = false,
	error = false,
	hint,
	...props
}: CourseModulesDescriptionTextareaProps) => {
	const errorMessage =
		typeof error === 'string' ? error : errors.modules_description?.message
	const hasError = Boolean(error) || Boolean(errors.modules_description)

	let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30`

	if (props.disabled) {
		textareaClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`
	} else if (hasError) {
		textareaClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`
	} else if (success) {
		textareaClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`
	} else {
		textareaClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-purple-300 focus:ring-purple-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-purple-800`
	}

	return (
		<div className='relative'>
			<label
				htmlFor={props.id}
				className='block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300'
			>
				Описание модулей*
			</label>
			<textarea
				id='modules_description'
				{...register('modules_description', {
					required: 'Это поле обязательно'
				})}
				className={textareaClasses}
				rows={6}
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

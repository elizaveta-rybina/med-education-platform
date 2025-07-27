import Input from '@/components/form/input/InputField'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { CourseFormData } from '../model/types'

interface CourseTitleInputProps {
	register: UseFormRegister<CourseFormData>
	errors: FieldErrors<CourseFormData>
}

export const CourseTitleInput = ({
	register,
	errors
}: CourseTitleInputProps) => {
	return (
		<Input
			label='Название курса*'
			id='title'
			{...register('title', { required: 'Это поле обязательно' })}
			error={errors.title?.message}
		/>
	)
}

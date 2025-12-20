import { CourseFormData } from '@/entities/course/model/types'
import { CourseDescriptionTextarea } from '@/entities/course/ui/CourseDescriptionTextarea'
import { CourseModulesDescriptionTextarea } from '@/entities/course/ui/CourseModulesDescriptionTextarea'
import { CourseSkillsSelect } from '@/entities/course/ui/CourseSkillsSelect'
import { CourseTitleInput } from '@/entities/course/ui/CourseTitleInput'
import { useCreateCourse } from '@/hooks/course/useCreateCourse'
import Button from '@/shared/ui/button/Button'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface CourseFormProps {
	onSuccess?: (courseId: number) => void
}

export const CourseForm = ({ onSuccess }: CourseFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch
	} = useForm<CourseFormData>({
		defaultValues: {
			skills: []
		}
	})

	const { create, isLoading, error } = useCreateCourse()
	const navigate = useNavigate()

	const onSubmit = async (data: CourseFormData) => {
		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('description', data.description)
		formData.append('skills', JSON.stringify(data.skills))
		formData.append('modules_description', data.modules_description)

		try {
			const courseId = await create(formData)
			onSuccess?.(courseId)
			// If no success callback (when used standalone), navigate
			if (!onSuccess) {
				navigate('/admin/courses')
			}
		} catch (err) {
			console.error('Failed to create course:', err)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			{error && (
				<div className='mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl dark:bg-red-950 dark:border-red-800 dark:text-red-400'>
					{error}
				</div>
			)}

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<CourseTitleInput register={register} errors={errors} />
				<CourseSkillsSelect
					register={register}
					setValue={setValue}
					watch={watch}
					errors={errors}
				/>
			</div>

			<CourseDescriptionTextarea register={register} errors={errors} />
			<CourseModulesDescriptionTextarea register={register} errors={errors} />

			<div className='flex justify-end space-x-4'>
				<Button
					type='button'
					variant='outline'
					onClick={() => navigate('/admin/courses')}
				>
					Отмена
				</Button>
				<Button type='submit' disabled={isLoading}>
					{isLoading ? 'Создание...' : 'Создать курс'}
				</Button>
			</div>
		</form>
	)
}

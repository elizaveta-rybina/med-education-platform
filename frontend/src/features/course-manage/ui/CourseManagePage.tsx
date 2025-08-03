import { Course } from '@/app/store/courses/model/course-types'
import { DeleteCourseModal } from '@/features/course-manage/ui/DeleteCourseModal'
import { useCourses } from '@/hooks/course/useCourses'
import Button from '@/shared/ui/button/Button'
import { Disclosure, Transition } from '@headlessui/react'
import {
	ChevronDownIcon,
	PencilIcon,
	PlusIcon,
	TrashIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CourseManagePage = () => {
	const { courses, isLoading, error, removeCourse } = useCourses()
	const navigate = useNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)

	const handleOpenModal = (courseId: number) => {
		setSelectedCourseId(courseId)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedCourseId(null)
	}

	const handleDelete = async () => {
		if (selectedCourseId !== null) {
			try {
				await removeCourse(selectedCourseId)
				handleCloseModal()
			} catch (err) {
				// Ошибка обрабатывается в useCourses
			}
		}
	}

	return (
		<>
			<div className='flex justify-between items-center my-2'>
				<h2 className='text-2xl font-bold dark:text-gray-200'>
					Список всех курсов
				</h2>
				<Button
					variant='primary'
					className='p-2'
					onClick={() => navigate('/admin/courses/new')}
				>
					<PlusIcon className='h-5 w-5' />
				</Button>
			</div>

			{error && (
				<div className='mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl dark:bg-red-950 dark:border-red-800 dark:text-red-400'>
					{error}
				</div>
			)}

			{isLoading && (
				<div className='text-center text-gray-600 dark:text-gray-400'>
					Загрузка курсов...
				</div>
			)}

			{!isLoading && courses.length === 0 && (
				<div className='text-center text-gray-600 dark:text-gray-400'>
					Курсы не найдены. Создайте новый курс.
				</div>
			)}

			{!isLoading && courses.length > 0 && (
				<div className='space-y-4'>
					{courses.map((course: Course) => (
						<Disclosure
							key={course.id}
							as='div'
							className='bg-white dark:bg-gray-900 rounded-xl shadow-theme-xs'
						>
							{({ open }) => (
								<>
									<Disclosure.Button className='flex w-full justify-between items-center p-4 text-left text-lg font-medium text-gray-900 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20'>
										<span>{course.title}</span>
										<ChevronDownIcon
											className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform ${
												open ? 'rotate-180' : ''
											}`}
										/>
									</Disclosure.Button>
									<Transition
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'
									>
										<Disclosure.Panel className='p-4 text-gray-700 dark:text-gray-300'>
											<div className='mb-4'>
												<h3 className='text-sm font-medium text-gray-900 dark:text-gray-200'>
													Описание
												</h3>
												<p className='mt-1 text-sm'>{course.description}</p>
											</div>
											<div className='mb-4'>
												<h3 className='text-sm font-medium text-gray-900 dark:text-gray-200'>
													Навыки
												</h3>
												<div className='mt-1 flex flex-wrap gap-2'>
													{course.skills.length > 0 ? (
														course.skills.map(skill => (
															<span
																key={skill}
																className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200'
															>
																{skill}
															</span>
														))
													) : (
														<span className='text-sm text-gray-500 dark:text-gray-400'>
															Навыки не указаны
														</span>
													)}
												</div>
											</div>
											<div className='flex justify-end space-x-2'>
												<Button
													variant='outline'
													className='p-2'
													onClick={() => handleOpenModal(course.id)}
												>
													<TrashIcon className='h-5 w-5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400' />
												</Button>
												<Button
													variant='primary'
													className='p-2'
													onClick={() =>
														navigate(`/admin/course/${course.id}/edit`)
													}
												>
													<PencilIcon className='h-5 w-5' />
												</Button>
											</div>
										</Disclosure.Panel>
									</Transition>
								</>
							)}
						</Disclosure>
					))}
				</div>
			)}

			<DeleteCourseModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onConfirm={handleDelete}
			/>
		</>
	)
}

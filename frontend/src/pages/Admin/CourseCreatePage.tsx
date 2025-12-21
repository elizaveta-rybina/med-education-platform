import { courseApi } from '@/app/api/course/course.api'
import { modulesApi } from '@/app/api/modules/modules.api'
import type { Module } from '@/app/api/modules/modules.types'
import { CourseForm } from '@/features/course-create/ui/CourseForm'
import { ModuleForm } from '@/features/course-modules/ui/ModuleForm'
import { ModuleList } from '@/features/course-modules/ui/ModuleList'
import { useState } from 'react'

const CourseCreatePage = () => {
	const [modules, setModules] = useState<Module[]>([])
	const [editingModule, setEditingModule] = useState<Module | null>(null)
	const [showModuleForm, setShowModuleForm] = useState(false)
	const [moduleFormLoading, setModuleFormLoading] = useState(false)
	const [createdCourseId, setCreatedCourseId] = useState<number | null>(null)

	const handleCourseCreated = (courseId: number) => {
		setCreatedCourseId(courseId)
	}

	const handleAddModule = async (data: {
		module_title: string
		module_description?: string
		order_number: number
	}) => {
		if (!createdCourseId) return
		setModuleFormLoading(true)
		try {
			if (editingModule?.id) {
				await modulesApi.update(editingModule.id, data)
			} else {
				await modulesApi.create(createdCourseId, data)
			}
			// Reload modules via courseApi and normalize to UI Module
			const loaded = await courseApi.getModules(Number(createdCourseId))
			const normalized = (Array.isArray(loaded) ? loaded : []).map(
				(m: any) => ({
					id: m.id,
					course_id: m.course_id,
					module_title: m.title || m.module_title,
					module_description: m.description || m.module_description,
					topics_count: m.topics_count,
					order_number: m.order_number,
					created_at: m.created_at,
					updated_at: m.updated_at
				})
			)
			setModules(normalized)
			setShowModuleForm(false)
			setEditingModule(null)
		} finally {
			setModuleFormLoading(false)
		}
	}

	const handleDeleteModule = async (moduleId: number) => {
		await modulesApi.delete(moduleId)
		setModules(prev => prev.filter(m => m.id !== moduleId))
	}

	const handleEditModule = (module: Module) => {
		setEditingModule(module)
		setShowModuleForm(true)
	}

	return (
		<div className='p-6 max-w-4xl mx-auto'>
			<div className='mb-8'>
				<h1 className='text-2xl font-bold mb-6'>Создание нового курса</h1>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6'>
				<CourseForm onSuccess={handleCourseCreated} />
			</div>

			{createdCourseId && (
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
							Модули курса
						</h2>
						{!showModuleForm && (
							<button
								onClick={() => {
									setEditingModule(null)
									setShowModuleForm(true)
								}}
								className='flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors'
								title='Добавить модуль'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 4v16m8-8H4'
									/>
								</svg>
							</button>
						)}
					</div>

					{showModuleForm && (
						<div className='mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600'>
							<h3 className='font-semibold text-gray-800 dark:text-white mb-4'>
								{editingModule
									? 'Редактирование модуля'
									: 'Добавление нового модуля'}
							</h3>
							<ModuleForm
								module={editingModule}
								defaultOrderNumber={
									editingModule
										? undefined
										: Math.max(0, ...modules.map(m => m.order_number ?? 0)) + 1
								}
								onSubmit={handleAddModule}
								onCancel={() => {
									setShowModuleForm(false)
									setEditingModule(null)
								}}
								isLoading={moduleFormLoading}
							/>
						</div>
					)}

					<ModuleList
						modules={modules}
						onEdit={handleEditModule}
						onDelete={handleDeleteModule}
						isLoading={moduleFormLoading}
					/>
				</div>
			)}
		</div>
	)
}

export default CourseCreatePage

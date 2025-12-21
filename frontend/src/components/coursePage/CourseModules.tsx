import type { PublicModuleResponse } from '@/app/api/course/publicCourse.api'
import { publicCourseApi } from '@/app/api/course/publicCourse.api'
import { ModuleTabs, TextModuleBlock } from '@/entities/course_modules'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const CourseModules = ({
	courseId: propCourseId
}: {
	courseId?: number
}) => {
	const { t } = useTranslation('coursePage')
	const [courseId, setCourseId] = useState<number | null>(propCourseId ?? null)
	const [moduleDetails, setModuleDetails] = useState<PublicModuleResponse[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		initializeCourse()
	}, [propCourseId])

	const initializeCourse = async () => {
		try {
			setLoading(true)
			setError(null)

			// Если курс не передан, получаем первый доступный
			if (propCourseId) {
				setCourseId(propCourseId)
			} else {
				const courses = await publicCourseApi.getAllCourses()
				if (courses && courses.length > 0) {
					setCourseId(courses[0].id)
				} else {
					setError('Нет доступных курсов')
					setLoading(false)
					return
				}
			}
		} catch (error) {
			console.error('Failed to initialize course:', error)
			setError('Не удалось загрузить список курсов')
			setLoading(false)
		}
	}

	// Загружаем модули когда courseId готов
	useEffect(() => {
		if (courseId) {
			loadModules()
		}
	}, [courseId])

	const loadModules = async () => {
		if (!courseId) return

		try {
			setLoading(true)
			setError(null)
			const response = await publicCourseApi.getCourseWithModules(courseId)

			if (response && response.modules && response.modules.length > 0) {
				// Загружаем темы для каждого модуля (или используем уже пришедшие)
				const modulesWithTopics = await Promise.all(
					response.modules.map(async module => {
						if (module.topics && module.topics.length > 0) {
							return module
						}

						try {
							const topicsArray = await publicCourseApi.getModuleTopics(
								module.id
							)
							return {
								...module,
								topics: topicsArray
							}
						} catch (error) {
							console.error(
								`Failed to load topics for module ${module.id}:`,
								error
							)
							return { ...module, topics: [] }
						}
					})
				)

				setModuleDetails(modulesWithTopics)
			}
		} catch (error) {
			console.error('Failed to load course modules:', error)
			setError('Не удалось загрузить модули')
		} finally {
			setLoading(false)
		}
	}

	const animationProps = {
		initial: { opacity: 0, y: 50 },
		whileInView: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 50 },
		transition: { duration: 0.6, ease: 'easeOut' as const },
		viewport: { amount: 0.3 }
	}

	if (loading) {
		return (
			<div className='text-center py-16'>
				<p className='text-gray-600'>{t('loading') || 'Загрузка модулей...'}</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className='text-center py-16'>
				<p className='text-red-500'>{error}</p>
			</div>
		)
	}

	if (moduleDetails.length === 0) {
		return (
			<div className='text-center py-16'>
				<p className='text-gray-500'>
					{t('no_modules') || 'Нет доступных модулей'}
				</p>
			</div>
		)
	}

	// Разделяем модули на две части для отображения с текстом слева и справа
	const halfLength = Math.ceil(moduleDetails.length / 2)
	const firstHalfDetails = moduleDetails.slice(0, halfLength)
	const secondHalfDetails = moduleDetails.slice(halfLength)

	return (
		<div>
			<motion.h2
				className='bg-gradient-to-r from-[#6C3F99] to-[#BE1B86] bg-clip-text text-transparent text-center justify-start text-6xl/tight italic font-bold mb-25 mt-40'
				style={{ originY: 0.5 }}
				id='course_modules'
				{...animationProps}
			>
				{t('card_modules.title')}
			</motion.h2>

			{firstHalfDetails.length > 0 && (
				<motion.div
					className='flex flex-row justify-around gap-20'
					style={{ originY: 0.5 }}
					{...animationProps}
				>
					<TextModuleBlock
						title={t('card_modules.first_semester_title')}
						text={t('card_modules.first_semester_description')}
					/>
					{courseId && (
						<ModuleTabs modules={firstHalfDetails} courseId={courseId} />
					)}
				</motion.div>
			)}

			{secondHalfDetails.length > 0 && (
				<motion.div
					className='flex flex-row justify-around gap-20 mt-30'
					style={{ originY: 0.5 }}
					{...animationProps}
				>
					{courseId && (
						<ModuleTabs modules={secondHalfDetails} courseId={courseId} />
					)}
					<TextModuleBlock
						title={t('card_modules.second_semester_title')}
						text={t('card_modules.second_semester_description')}
					/>
				</motion.div>
			)}
		</div>
	)
}

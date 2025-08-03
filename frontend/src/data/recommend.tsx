import anatomy from '../assets/anatomy.jpg'
import gynecology from '../assets/gynecology.png'
import neurology from '../assets/neurology.jpg'
import pharmacology from '../assets/pharmacology.jpg'
import physiology from '../assets/physiology.jpeg'

export interface Course {
	id?: number
	imageUrl: string
	imageAlt?: string
	title: string
	description: string
	buttonText?: string
	buttonLink?: string
	duration?: string
	modulesCount?: number
	isAvailable?: boolean // Добавлен флаг доступности
	className?: string
}

export const courses: Course[] = [
	{
		id: 1,
		imageUrl: anatomy,
		imageAlt: 'Анатомия человека',
		title: 'Анатомия человека',
		description:
			'Полный курс по строению человеческого тела с детальным разбором всех систем органов',
		buttonText: 'Подробнее',
		buttonLink: '/404',
		duration: '36 часов',
		modulesCount: 8,
		isAvailable: false
	},
	{
		id: 2,
		imageUrl: pharmacology,
		imageAlt: 'Основы фармакологии',
		title: 'Клиническая фармакология',
		description:
			'Изучение механизмов действия лекарственных препаратов и их клинического применения',
		buttonText: 'Подробнее',
		buttonLink: '/404',
		duration: '28 часов',
		modulesCount: 6,
		isAvailable: false
	},
	{
		id: 3,
		imageUrl: neurology,
		imageAlt: 'Неврология',
		title: 'Основы неврологии',
		description:
			'Комплексный курс по строению и функциям нервной системы человека',
		buttonLink: '/404',
		duration: '32 часа',
		modulesCount: 7,
		isAvailable: false
	},
	{
		id: 4,
		imageUrl: gynecology,
		imageAlt: 'Гинекология',
		title: 'Клиническая гинекология',
		description:
			'Современные подходы к диагностике и лечению гинекологических заболеваний',
		buttonText: 'Подробнее',
		buttonLink: '/404',
		duration: '40 часов',
		modulesCount: 9,
		isAvailable: false
	},
	{
		id: 5,
		imageUrl: physiology,
		imageAlt: 'Физиология',
		title: 'Физиология человека',
		description: 'Изучение функций органов и систем живого организма',
		buttonText: 'Начать курс',
		buttonLink: '/courses',
		duration: '30 часов',
		modulesCount: 5
	}
]

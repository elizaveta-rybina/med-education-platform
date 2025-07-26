import {
	ArrowPathIcon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon
} from '@heroicons/react/24/outline'
import { Product } from './types'

export const products: Product[] = [
	{
		name: 'Теория',
		description: 'Изучайте актуальные медицинские специальности',
		to: '/courses/theory',
		icon: ChartPieIcon
	},
	{
		name: 'Вебинары',
		description: 'Онлайн-мероприятия с ведущими экспертами',
		to: '/courses/webinars',
		icon: CursorArrowRaysIcon
	},
	{
		name: 'Сертификация',
		description: 'Получите сертификаты по завершении курсов',
		to: '/courses/certification',
		icon: FingerPrintIcon
	},
	{
		name: 'Ресурсы',
		description: 'Доступ к учебным материалам и библиотеке',
		to: '/resources',
		icon: SquaresPlusIcon
	},
	{
		name: 'Поддержка',
		description: 'Помощь и консультации от наших специалистов',
		to: '/support',
		icon: ArrowPathIcon
	}
]

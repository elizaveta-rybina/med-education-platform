import PageMeta from '@/components/common/PageMeta'

export default function HomeAdmin() {
	return (
		<>
			<PageMeta
				title='Дашборд администратора | Доктор VR'
				description='Страница панели администратора на образовательной платформе Доктор VR'
			/>
			<div className='grid grid-cols-12 gap-4 md:gap-6'></div>
		</>
	)
}

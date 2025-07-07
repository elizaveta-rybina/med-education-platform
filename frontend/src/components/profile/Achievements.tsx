export const Achievements = () => {
	const achievements = [
		{
			id: 1,
			title: 'Первый курс',
			description: 'Завершил первый курс',
			date: '10.04.2023',
			icon: '🏆'
		},
		{
			id: 2,
			title: 'Активный студент',
			description: '30 дней подряд активности',
			date: '05.05.2023',
			icon: '🔥'
		},
		{
			id: 3,
			title: 'Эксперт',
			description: 'Помог 10 другим студентам',
			date: '22.06.2023',
			icon: '💡'
		}
	]

	return (
		<div className='space-y-6'>
			<div className='bg-white rounded-lg shadow-sm p-6'>
				<h2 className='text-xl font-semibold text-gray-900 mb-6'>
					Мои достижения
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{achievements.map(item => (
						<div
							key={item.id}
							className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
						>
							<div className='text-3xl mb-3'>{item.icon}</div>
							<h3 className='font-medium text-gray-900'>{item.title}</h3>
							<p className='text-sm text-gray-600 mt-1'>{item.description}</p>
							<p className='text-xs text-gray-400 mt-2'>{item.date}</p>
						</div>
					))}
				</div>
			</div>

			<div className='bg-white rounded-lg shadow-sm p-6'>
				<h2 className='text-xl font-semibold text-gray-900 mb-4'>Прогресс</h2>
				<div className='space-y-4'>
					<div>
						<div className='flex justify-between mb-1'>
							<span className='text-sm font-medium text-gray-700'>
								Завершенные курсы
							</span>
							<span className='text-sm font-medium text-gray-700'>3/10</span>
						</div>
						<div className='w-full bg-gray-200 rounded-full h-2'>
							<div
								className='bg-blue-500 h-2 rounded-full'
								style={{ width: '30%' }}
							></div>
						</div>
					</div>
					<div>
						<div className='flex justify-between mb-1'>
							<span className='text-sm font-medium text-gray-700'>
								Пройдено тестов
							</span>
							<span className='text-sm font-medium text-gray-700'>7/20</span>
						</div>
						<div className='w-full bg-gray-200 rounded-full h-2'>
							<div
								className='bg-green-500 h-2 rounded-full'
								style={{ width: '35%' }}
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

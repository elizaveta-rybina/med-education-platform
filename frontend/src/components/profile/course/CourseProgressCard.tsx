export interface CourseProgressCardProps {
	courseTitle: string
	completionPercentage: number
	offlineMaterialTitle: string
	offlineMaterialText: string
	offlineMaterialDuration: string
}

const CourseProgressCard: React.FC<CourseProgressCardProps> = ({
	courseTitle,
	completionPercentage,
	offlineMaterialTitle,
	offlineMaterialText,
	offlineMaterialDuration
}) => {
	return (
		<div className='w-[70%] min-w-[320px] rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300'>
			<div className='flex flex-col md:flex-row gap-6'>
				{/* Блок с прогрессом */}
				<div className='flex-1'>
					<h2 className='text-lg font-semibold text-gray-900 mb-4'>
						{courseTitle}
					</h2>

					<div className='flex items-center justify-between mb-2'>
						<span className='text-sm text-gray-600'>Прогресс</span>
						<span className='text-sm font-medium text-gray-700'>
							{completionPercentage}%
						</span>
					</div>

					<div className='w-full bg-gray-100 rounded-full h-2 overflow-hidden mb-2'>
						<div
							className='bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-700 ease-out'
							style={{ width: `${completionPercentage}%` }}
						></div>
					</div>

					<div className='flex justify-between text-xs text-gray-500'>
						<span>Начало</span>
						<span>Завершение</span>
					</div>
				</div>

				{/* Блок с материалами */}
				<div className='flex-1 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6'>
					<div className='rounded-lg p-4 bg-gray-50'>
						<h3 className='text-base font-semibold text-gray-900 mb-3'>
							{offlineMaterialTitle}
						</h3>

						<p className='text-sm text-gray-700 mb-4'>
							{offlineMaterialText}
							<span className='text-gray-600 font-medium'>
								{' '}
								({offlineMaterialDuration})
							</span>
						</p>

						<div className='flex justify-start'>
							<button className='inline-flex py-2.5 px-4 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200 items-center justify-center gap-2 border border-gray-300 shadow-xs'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth={2}
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M14 5l7 7m0 0l-7 7m7-7H3'
									/>
								</svg>
								Продолжить
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CourseProgressCard

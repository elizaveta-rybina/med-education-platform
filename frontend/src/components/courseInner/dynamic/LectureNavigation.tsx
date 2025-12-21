import React from 'react'

interface LectureNavigationProps {
	onPrev: () => void
	onNext: () => void
}

export const LectureNavigation: React.FC<LectureNavigationProps> = ({
	onPrev,
	onNext
}) => {
	return (
		<div className='ml-auto flex gap-2'>
			<button
				onClick={onPrev}
				className='px-4 py-2 bg-gray-800 text-white rounded-xl shadow-sm hover:bg-gray-700'
			>
				Предыдущая лекция
			</button>
			<button
				onClick={onNext}
				className='px-4 py-2 bg-fuchsia-700 text-white rounded-xl shadow-sm hover:bg-fuchsia-500'
			>
				Следующая лекция
			</button>
		</div>
	)
}

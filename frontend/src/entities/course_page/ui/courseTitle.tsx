import React from 'react'

type CourseTitleProps = {
	title: React.ReactNode
	description: string
	imageSrc: string
	imageAlt?: string
}

export const CourseTitle: React.FC<CourseTitleProps> = ({
	title,
	description,
	imageSrc,
	imageAlt
}) => {
	return (
		<div className=''>
			<div className='flex flex-col md:flex-row items-center justify-between'>
				<div className='md:w-3/5 text-left'>
					<h2 className='text-4xl/loose font-semibold'>{title}</h2>
					<p className='my-10 text-2xl/snug italic font-light'>{description}</p>
				</div>
				<div className='hidden md:block md:w-1/2'>
					<img
						src={imageSrc}
						alt={imageAlt}
						className='w-full max-w-md ml-auto'
					/>
				</div>
			</div>
		</div>
	)
}

export default CourseTitle

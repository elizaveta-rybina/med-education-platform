import { motion } from 'framer-motion'
import React from 'react'

interface StepCardProps {
	number: number
	text: React.ReactNode
	color?: string
	gradientTop?: string
	gradientAngle?: string
}

export const StepCard: React.FC<StepCardProps> = ({
	number,
	text,
	color = '#743C97',
	gradientTop = 'rgba(76, 17, 113, 1.00)',
	gradientAngle = 'rgba(225, 176, 255, 1.00)'
}) => {
	const plateStyle: React.CSSProperties = {
		width: '425px',
		height: '130px',
		backgroundColor: color,
		borderRadius: '100px',
		boxShadow: `
      30px 30px 20px rgba(0,0,0,0.25),
      inset 5px -7px 4px ${gradientTop},
      inset 0px 4px 4px ${gradientAngle}
    `
	}

	return (
		<motion.div
			className='relative inline-flex items-center overflow-visible'
			style={{ originY: 0.5 }}
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 50 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			viewport={{ amount: 0.3 }}
		>
			{/* Пластина с кругом */}
			<div
				className='rounded-full px-4 py-2 flex items-center justify-start'
				style={plateStyle}
			>
				<div className='flex items-center justify-center w-24 h-24 rounded-full border-8 border-white text-white text-5xl font-bold shrink-0 relative z-20'>
					{number}
				</div>
			</div>

			{/* Линия */}
			<div className='h-3 bg-white relative z-10 -ml-80 -mr-4 w-8' />

			{/* Белое облако */}
			<div className='bg-white h-[100px] w-[375px] rounded-full px-6 text-black text-xl shadow-lg relative z-20 whitespace-pre-line my-auto flex items-center justify-center text-center'>
				{text}
			</div>
		</motion.div>
	)
}

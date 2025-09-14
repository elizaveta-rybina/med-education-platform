import React from 'react'

type ModuleInfoProps = {
	topText: string
	bottomText: string
	topClassName?: string
	bottomClassName?: string
}

export const ModuleInfo: React.FC<ModuleInfoProps> = ({
	topText,
	bottomText,
	topClassName = 'text-3xl font-bold italic bg-gradient-to-r from-[#733C98] to-[#B61F88] bg-clip-text text-transparent',
	bottomClassName = 'text-xl font-light whitespace-pre-line'
}) => {
	return (
		<div className='flex flex-col items-center text-center gap-2'>
			<span className={topClassName}>{topText}</span>
			<div className='w-70 h-[2px] bg-gradient-to-r from-[#733C98] to-[#B61F88]'></div>
			<span className={bottomClassName}>{bottomText}</span>
		</div>
	)
}

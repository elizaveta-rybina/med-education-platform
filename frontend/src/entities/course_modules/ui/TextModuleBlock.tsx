interface TextModuleBlockProps {
	title: string
	text: string
}

export const TextModuleBlock = ({ title, text }: TextModuleBlockProps) => {
	return (
		<div>
			<h3 className='justify-start mb-8 italic text-black text-5xl font-normal leading-[50px]'>
				{title}
			</h3>
			<p className='w-md text-justify justify-start text-black text-xl font-normal '>
				{text}
			</p>
		</div>
	)
}

import { PageMeta } from '@/components/common'

export default function GDevelopEditor() {
	return (
		<>
			<PageMeta
				title='Редактор игр | Доктор VR'
				description='Визуальный редактор игр, встроенный в образовательную платформу Доктор VR'
			/>
			<div className='grid grid-cols-12 gap-4 md:gap-6'>
				<div className='col-span-12'>
					<div className='w-full h-[100vh]'>
						<iframe
							src='https://editor.gdevelop.io/'
							title='GDevelop Editor'
							width='100%'
							height='100%'
							style={{ border: 'none' }}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

import { Listbox, Transition } from '@headlessui/react'
import {
	CheckIcon,
	ChevronUpDownIcon,
	XMarkIcon
} from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import {
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form'
import { CourseFormData } from '../model/types'

const availableSkills = [
	'Критическое мышление',
	'Решение проблем',
	'Аналитическое мышление',
	'Абстрактное мышление',
	'Рассуждения',
	'Логическое мышление',
	'Креативность',
	'Принятие решений'
]

interface CourseSkillsSelectProps {
	register: UseFormRegister<CourseFormData>
	setValue: UseFormSetValue<CourseFormData>
	watch: UseFormWatch<CourseFormData>
	errors: FieldErrors<CourseFormData>
}

export const CourseSkillsSelect = ({
	setValue,
	watch,
	errors
}: CourseSkillsSelectProps) => {
	const selectedSkills = watch('skills')

	return (
		<div>
			<label className='block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300'>
				Навыки*
			</label>
			<Listbox
				value={selectedSkills}
				onChange={value => setValue('skills', value)}
				multiple
			>
				<div className='relative'>
					<Listbox.Button className='w-full p-2 border border-gray-300 rounded-lg text-left bg-white dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-3 focus:ring-purple-500/20 focus:border-purple-300 dark:focus:border-purple-800'>
						<div className='flex flex-wrap items-center gap-1 min-h-[1.5rem]'>
							{selectedSkills.length > 0 ? (
								selectedSkills.map(skill => (
									<span
										key={skill}
										className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
									>
										{skill}
									</span>
								))
							) : (
								<span className='text-gray-400 dark:text-white/30'>
									Выберите навыки
								</span>
							)}
						</div>
						<span className='absolute inset-y-0 right-8 flex items-center pr-2'>
							{selectedSkills.length > 0 && (
								<span
									role='button'
									tabIndex={0}
									onClick={e => {
										e.stopPropagation()
										setValue('skills', [])
									}}
									onKeyDown={e => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.stopPropagation()
											setValue('skills', [])
										}
									}}
									className='p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer'
								>
									<XMarkIcon className='h-4 w-4' aria-hidden='true' />
								</span>
							)}
						</span>
						<span className='absolute inset-y-0 right-0 flex items-center pr-2'>
							<ChevronUpDownIcon
								className='h-5 w-5 text-gray-400 dark:text-white/30'
								aria-hidden='true'
							/>
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 dark:ring-gray-700'>
							{availableSkills.map(skill => (
								<Listbox.Option
									key={skill}
									value={skill}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active
												? 'bg-purple-100 text-purple-900 dark:bg-purple-800 dark:text-white'
												: 'text-gray-900 dark:text-white/90'
										}`
									}
								>
									{({ selected }) => (
										<>
											<span
												className={`block truncate ${
													selected ? 'font-medium' : 'font-normal'
												}`}
											>
												{skill}
											</span>
											{selected ? (
												<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600 dark:text-purple-400'>
													<CheckIcon className='h-5 w-5' aria-hidden='true' />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
			{errors.skills && (
				<p className='mt-1.5 text-xs text-error-500 dark:text-error-400'>
					{errors.skills.message}
				</p>
			)}
		</div>
	)
}

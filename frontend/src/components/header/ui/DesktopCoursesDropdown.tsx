import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import * as React from 'react'
import { products } from '../data/products'
import CourseItem from './CourseItem'

const DesktopCoursesDropdown: React.FC = () => {
	return (
		<Popover className='relative'>
			{({ open }) => (
				<>
					<PopoverButton className='flex items-center gap-x-1 text-base font-semibold text-gray-900 hover:text-purple-500 transition-colors'>
						Курсы
						<ChevronDownIcon
							className={`h-5 w-5 flex-none transform transition-transform ${
								open ? 'rotate-180' : ''
							}`}
							aria-hidden={true}
						/>
					</PopoverButton>
					<Transition
						as={React.Fragment}
						enter='transition ease-out duration-200'
						enterFrom='opacity-0 translate-y-1'
						enterTo='opacity-100 translate-y-0'
						leave='transition ease-in duration-150'
						leaveFrom='opacity-100 translate-y-0'
						leaveTo='opacity-0 translate-y-1'
					>
						<PopoverPanel className='absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5'>
							<div className='p-4'>
								{products.map(item => (
									<CourseItem key={item.name} item={item} isMobile={false} />
								))}
							</div>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default DesktopCoursesDropdown

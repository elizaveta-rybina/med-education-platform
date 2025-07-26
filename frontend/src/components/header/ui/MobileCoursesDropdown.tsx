import { Disclosure, DisclosureButton } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import * as React from 'react'
import { products } from '../data/products'
import CourseItem from './CourseItem'

interface MobileCoursesDropdownProps {
	setMobileMenuOpen?: (open: boolean) => void
}

const MobileCoursesDropdown: React.FC<MobileCoursesDropdownProps> = ({
	setMobileMenuOpen
}) => {
	return (
		<Disclosure as='div' className='-mx-3'>
			{({ open }) => (
				<>
					<DisclosureButton className='flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors'>
						Курсы
						<ChevronDownIcon
							className={`h-5 w-5 flex-none transform transition-transform ${
								open ? 'rotate-180' : ''
							}`}
							aria-hidden={true}
						/>
					</DisclosureButton>
					<Disclosure.Panel className='mt-2 space-y-2'>
						{products.map(item => (
							<CourseItem
								key={item.name}
								item={item}
								isMobile={true}
								setMobileMenuOpen={setMobileMenuOpen}
							/>
						))}
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default MobileCoursesDropdown

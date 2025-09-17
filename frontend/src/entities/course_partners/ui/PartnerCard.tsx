import { PartnersData } from '../cfg/partners.data'

interface PartnerCardProps {
	language?: 'en' | 'ru'
	partners: PartnersData[]
}

export const PartnerCard = ({
	language = 'ru',
	partners
}: PartnerCardProps) => {
	return (
		<div className='w-full flex flex-row justify-center flex-wrap gap-30'>
			{partners.map((partner, index) => (
				<div key={index} className='flex flex-col items-center mb-16 last:mb-0'>
					<img
						src={partner.image}
						alt={partner.alt[language]}
						className='w-50 h-50 object-contain mb-4'
					/>
					<div className='text-black text-center text-xl w-60'>
						{partner.text[language]}
					</div>
				</div>
			))}
		</div>
	)
}

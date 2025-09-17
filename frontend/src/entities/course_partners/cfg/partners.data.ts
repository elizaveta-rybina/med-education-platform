export type PartnersData = {
	image: string
	alt: { en: string; ru: string }
	text: { en: string; ru: string }
}

export const partnersData: PartnersData[] = [
	{
		image: 'src/assets/fpg.svg',
		alt: {
			en: 'The Presidential Grants Found',
			ru: 'Фонд президентских грантов'
		},
		text: {
			en: 'The Presidential Grants Found',
			ru: 'Фонд президентских грантов'
		}
	},
	{
		image: 'src/assets/mrsu.svg',
		alt: {
			en: 'National Research Mordovia State University',
			ru: 'МГУ им. Н.П. Огарёва'
		},
		text: {
			en: 'National Research Mordovia State University',
			ru: 'МГУ им. Н.П. Огарёва'
		}
	},
	{
		image: 'src/assets/sck.svg',
		alt: { en: 'SSC "Pathophysiology"', ru: 'СНК "Патофизиология"' },
		text: { en: 'SSC "Pathophysiology"', ru: 'СНК "Патофизиология"' }
	}
]

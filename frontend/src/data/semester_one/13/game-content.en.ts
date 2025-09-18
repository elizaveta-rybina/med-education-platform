import { DropdownTableBlock } from '@/features/dropdown-table'

export const sampleDropdownTableBlock: DropdownTableBlock = {
	id: 'dtb-1',
	title: 'Pressure Change Parameter Table',
	tableTitle: 'Select the corresponding values for each phase',
	columns: [
		{ id: 'phase', title: 'Phase' },
		{ id: 'pressure', title: 'Barometric Pressure Level' },
		{ id: 'behavior', title: 'Animal Behavior' },
		{ id: 'breathingRate', title: 'Breathing Frequency' },
		{ id: 'breathingType', title: 'Breathing Character' },
		{ id: 'skinColor', title: 'Skin Cover Color' },
		{ id: 'oxygenLevel', title: 'PaO₂ in Arterial Blood' }
	],
	rows: [
		{ id: 'row1', values: ['1', '', '', '', '', '', ''] },
		{ id: 'row2', values: ['2', '', '', '', '', '', ''] },
		{ id: 'row3', values: ['3', '', '', '', '', '', ''] },
		{ id: 'row4', values: ['4', '', '', '', '', '', ''] },
		{ id: 'row5', values: ['5', '', '', '', '', '', ''] }
	],
	columnOptions: {
		pressure: [
			{ id: 'p760', content: '- 760 mm Hg' },
			{ id: 'p600', content: '- 600 mm Hg' },
			{ id: 'p530', content: '- 530 mm Hg' },
			{ id: 'p308', content: '- 308 mm Hg' },
			{ id: 'p250', content: '- 250 mm Hg' },
			{ id: 'p180', content: '- 180 mm Hg' },
			{ id: 'p150', content: '- 150 mm Hg' }
		],
		behavior: [
			{ id: 'b1', content: '- calm' },
			{ id: 'b2', content: '- restless (moves under the hood)' },
			{
				id: 'b3',
				content:
					'- extremely restless (moves under the hood and stands on hind legs)'
			},
			{ id: 'b4', content: '- severe condition (convulsions)' },
			{ id: 'b5', content: '- death' }
		],
		breathingRate: [
			{ id: 'br150', content: '- 150 per minute' },
			{ id: 'br76', content: '- 76 per minute' },
			{ id: 'br86', content: '- 86 per minute' },
			{ id: 'br98', content: '- 98 per minute' },
			{ id: 'br80', content: '- 80 per minute' },
			{ id: 'br52', content: '- 52 per minute' },
			{ id: 'br50', content: '- less than 50 per minute' }
		],
		breathingType: [
			{ id: 'bt1', content: '- rhythmic, superficial' },
			{ id: 'bt2', content: '- rhythmic, deep' },
			{ id: 'bt3', content: '- rhythmic, very deep' },
			{ id: 'bt4', content: '- non-rhythmic, very deep' },
			{ id: 'bt5', content: '- apnea' }
		],
		skinColor: [
			{ id: 'sc1', content: '- no signs of cyanosis' },
			{ id: 'sc2', content: '- slight cyanosis (purplish color)' },
			{ id: 'sc3', content: '- significant cyanosis (blue color, red eyes)' },
			{ id: 'sc4', content: '- pronounced cyanosis (blue color, red eyes)' },
			{ id: 'sc5', content: '- extreme cyanosis (dark blue color, red eyes)' }
		],
		oxygenLevel: [
			{ id: 'o100', content: '- 100 mm Hg' },
			{ id: 'o96', content: '- 96 mm Hg' },
			{ id: 'o90', content: '- 90 mm Hg' },
			{ id: 'o60', content: '- 60 mm Hg' },
			{ id: 'o35', content: '- 35 mm Hg' },
			{ id: 'o35less', content: '- less than 35 mm Hg' }
		]
	},
	correctAnswers: {
		'row1-pressure': 'p760',
		'row1-behavior': 'b1',
		'row1-breathingRate': 'br150',
		'row1-breathingType': 'bt1',
		'row1-skinColor': 'sc1',
		'row1-oxygenLevel': 'o100',
		'row2-pressure': 'p600',
		'row2-behavior': 'b2',
		'row2-breathingRate': 'br76',
		'row2-breathingType': 'bt2',
		'row2-skinColor': 'sc2',
		'row2-oxygenLevel': 'o96',
		'row3-pressure': 'p530',
		'row3-behavior': 'b3',
		'row3-breathingRate': 'br86',
		'row3-breathingType': 'bt3',
		'row3-skinColor': 'sc3',
		'row3-oxygenLevel': 'o90',
		'row4-pressure': 'p308',
		'row4-behavior': 'b4',
		'row4-breathingRate': 'br98',
		'row4-breathingType': 'bt4',
		'row4-skinColor': 'sc4',
		'row4-oxygenLevel': 'o60',
		'row5-pressure': 'p250',
		'row5-behavior': 'b5',
		'row5-breathingRate': 'br80',
		'row5-breathingType': 'bt5',
		'row5-skinColor': 'sc5',
		'row5-oxygenLevel': 'o35'
	}
}

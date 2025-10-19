import { DropdownTableBlock } from '@/features/dropdown-table'

export const gameTableData: DropdownTableBlock = {
	id: 'dtb-1',
	title: 'Results of the Pregnancy Impact Experiment',
	tableTitle: 'Select the appropriate values for each pregnancy stage',
	columns: [
		{ id: 'parameter', title: '', width: '40%' },
		{ id: 'early', title: 'Early Pregnancy Stage', width: '20%' },
		{ id: 'middle', title: 'Middle Pregnancy Stage', width: '20%' },
		{ id: 'late', title: 'Late Pregnancy Stage', width: '20%' }
	],
	rows: [
		{
			id: 'row1',
			values: ['Fetal Size', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'size1', content: 'Enlarged' },
					{ id: 'size2', content: 'Normal' },
					{ id: 'size3', content: 'Reduced' },
					{ id: 'size4', content: 'Absent' }
				],
				col2: [
					{ id: 'size1', content: 'Enlarged' },
					{ id: 'size2', content: 'Normal' },
					{ id: 'size3', content: 'Reduced' },
					{ id: 'size4', content: 'Absent' }
				],
				col3: [
					{ id: 'size1', content: 'Enlarged' },
					{ id: 'size2', content: 'Normal' },
					{ id: 'size3', content: 'Reduced' },
					{ id: 'size4', content: 'Absent' }
				]
			}
		},
		{
			id: 'row2',
			values: ['Fetal Color', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'color1', content: 'Pink (subcutaneous fat present)' },
					{ id: 'color2', content: 'Red (no subcutaneous fat)' },
					{ id: 'color3', content: 'Fetuses absent' }
				],
				col2: [
					{ id: 'color1', content: 'Pink (subcutaneous fat present)' },
					{ id: 'color2', content: 'Red (no subcutaneous fat)' },
					{ id: 'color3', content: 'Fetuses absent' }
				],
				col3: [
					{ id: 'color1', content: 'Pink (subcutaneous fat present)' },
					{ id: 'color2', content: 'Red (no subcutaneous fat)' },
					{ id: 'color3', content: 'Fetuses absent' }
				]
			}
		},
		{
			id: 'row3',
			values: ['Limb Development Level', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'limbs1', content: 'Well-developed' },
					{ id: 'limbs2', content: 'Underdeveloped' },
					{ id: 'limbs3', content: 'Fetuses absent' }
				],
				col2: [
					{ id: 'limbs1', content: 'Well-developed' },
					{ id: 'limbs2', content: 'Underdeveloped' },
					{ id: 'limbs3', content: 'Fetuses absent' }
				],
				col3: [
					{ id: 'limbs1', content: 'Well-developed' },
					{ id: 'limbs2', content: 'Underdeveloped' },
					{ id: 'limbs3', content: 'Fetuses absent' }
				]
			}
		},
		{
			id: 'row4',
			values: ['Histological Section Changes', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'histo1', content: 'No changes' },
					{ id: 'histo2', content: 'Developmental defects' },
					{ id: 'histo3', content: 'Fetuses absent' }
				],
				col2: [
					{ id: 'histo1', content: 'No changes' },
					{ id: 'histo2', content: 'Developmental defects' },
					{ id: 'histo3', content: 'Fetuses absent' }
				],
				col3: [
					{ id: 'histo1', content: 'No changes' },
					{ id: 'histo2', content: 'Developmental defects' },
					{ id: 'histo3', content: 'Fetuses absent' }
				]
			}
		},
		{
			id: 'row5',
			values: ['Cellular Changes Under Microscopy', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'micro1', content: 'No changes' },
					{
						id: 'micro2',
						content:
							'Signs of atypical mitosis (hollow metaphase, lagging chromosomes in anaphase)'
					},
					{ id: 'micro3', content: 'Microscopy not performed' }
				],
				col2: [
					{ id: 'micro1', content: 'No changes' },
					{
						id: 'micro2',
						content:
							'Signs of atypical mitosis (hollow metaphase, lagging chromosomes in anaphase)'
					},
					{ id: 'micro3', content: 'Microscopy not performed' }
				],
				col3: [
					{ id: 'micro1', content: 'No changes' },
					{
						id: 'micro2',
						content:
							'Signs of atypical mitosis (hollow metaphase, lagging chromosomes in anaphase)'
					},
					{ id: 'micro3', content: 'Microscopy not performed' }
				]
			}
		},
		{
			id: 'row6',
			values: ['Primary Mechanism of Cell Damage', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'mech1', content: 'Disruption of energy metabolism' },
					{ id: 'mech2', content: 'Disruption of water-electrolyte balance' },
					{
						id: 'mech3',
						content: 'Disruption of cellular activity regulation'
					},
					{ id: 'mech4', content: 'Nuclear and DNA changes' },
					{ id: 'mech5', content: 'Autocatalysis' },
					{ id: 'mech6', content: 'Membrane mechanism' },
					{ id: 'mech7', content: 'No cellular damage detected' }
				],
				col2: [
					{ id: 'mech1', content: 'Disruption of energy metabolism' },
					{ id: 'mech2', content: 'Disruption of water-electrolyte balance' },
					{
						id: 'mech3',
						content: 'Disruption of cellular activity regulation'
					},
					{ id: 'mech4', content: 'Nuclear and DNA changes' },
					{ id: 'mech5', content: 'Autocatalysis' },
					{ id: 'mech6', content: 'Membrane mechanism' },
					{ id: 'mech7', content: 'No cellular damage detected' }
				],
				col3: [
					{ id: 'mech1', content: 'Disruption of energy metabolism' },
					{ id: 'mech2', content: 'Disruption of water-electrolyte balance' },
					{
						id: 'mech3',
						content: 'Disruption of cellular activity regulation'
					},
					{ id: 'mech4', content: 'Nuclear and DNA changes' },
					{ id: 'mech5', content: 'Autocatalysis' },
					{ id: 'mech6', content: 'Membrane mechanism' },
					{ id: 'mech7', content: 'No cellular damage detected' }
				]
			}
		},
		{
			id: 'row7',
			values: ['Pregnancy Outcome', '', '', ''],
			cellOptions: {
				col1: [
					{
						id: 'result1',
						content: 'Fetal development arrest and pregnancy termination'
					},
					{ id: 'result2', content: 'Offspring with developmental defects' },
					{ id: 'result3', content: 'Normal offspring' }
				],
				col2: [
					{
						id: 'result1',
						content: 'Fetal development arrest and pregnancy termination'
					},
					{ id: 'result2', content: 'Offspring with developmental defects' },
					{ id: 'result3', content: 'Normal offspring' }
				],
				col3: [
					{
						id: 'result1',
						content: 'Fetal development arrest and pregnancy termination'
					},
					{ id: 'result2', content: 'Offspring with developmental defects' },
					{ id: 'result3', content: 'Normal offspring' }
				]
			}
		}
	],
	correctAnswers: {
		// Early Pregnancy Stage
		'row1-col1': 'size4', // Absent
		'row2-col1': 'color3', // Fetuses absent
		'row3-col1': 'limbs3', // Fetuses absent
		'row4-col1': 'histo3', // Fetuses absent
		'row5-col1': 'micro3', // Microscopy not performed
		'row6-col1': 'mech4', // Nuclear and DNA changes
		'row7-col1': 'result1', // Fetal development arrest and pregnancy termination
		// Middle Pregnancy Stage
		'row1-col2': 'size3', // Reduced
		'row2-col2': 'color2', // Red (no subcutaneous fat)
		'row3-col2': 'limbs2', // Underdeveloped
		'row4-col2': 'histo2', // Developmental defects
		'row5-col2': 'micro2', // Signs of atypical mitosis
		'row6-col2': 'mech4', // Nuclear and DNA changes
		'row7-col2': 'result2', // Offspring with developmental defects
		// Late Pregnancy Stage
		'row1-col3': 'size2', // Normal
		'row2-col3': 'color1', // Pink (subcutaneous fat present)
		'row3-col3': 'limbs1', // Well-developed
		'row4-col3': 'histo1', // No changes
		'row5-col3': 'micro3', // Microscopy not performed
		'row6-col3': 'mech7', // No cellular damage detected
		'row7-col3': 'result3' // Normal offspring
	}
}

import { DropdownTableBlock } from '@/features/dropdown-table'

export const gameTableData: DropdownTableBlock = {
	id: 'dtb-1',
	title: 'Results of the Arterial Hyperemia Experiment',
	tableTitle: 'Select the appropriate values for each experimental model',
	columns: [
		{ id: 'parameter', title: '', width: '40%' },
		{ id: 'model1', title: 'Model 1', width: '30%' },
		{ id: 'model2', title: 'Model 2', width: '30%' }
	],
	rows: [
		{
			id: 'row1',
			values: [
				'Number of functioning capillaries before the experiment',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'cap1', content: 'Decreased' },
					{ id: 'cap2', content: 'Normal' },
					{ id: 'cap3', content: 'Increased' }
				],
				col2: [
					{ id: 'cap1', content: 'Decreased' },
					{ id: 'cap2', content: 'Normal' },
					{ id: 'cap3', content: 'Increased' }
				]
			}
		},
		{
			id: 'row2',
			values: ['State of arterioles before the experiment', '', ''],
			cellOptions: {
				col1: [
					{ id: 'art1', content: 'Constricted' },
					{ id: 'art2', content: 'Unchanged' },
					{ id: 'art3', content: 'Dilated' }
				],
				col2: [
					{ id: 'art1', content: 'Constricted' },
					{ id: 'art2', content: 'Unchanged' },
					{ id: 'art3', content: 'Dilated' }
				]
			}
		},
		{
			id: 'row3',
			values: ['Linear blood flow velocity before the experiment', '', ''],
			cellOptions: {
				col1: [
					{ id: 'lin1', content: 'Reduced' },
					{ id: 'lin2', content: 'Normal' },
					{ id: 'lin3', content: 'Increased' }
				],
				col2: [
					{ id: 'lin1', content: 'Reduced' },
					{ id: 'lin2', content: 'Normal' },
					{ id: 'lin3', content: 'Increased' }
				]
			}
		},
		{
			id: 'row4',
			values: ['Volumetric blood flow velocity before the experiment', '', ''],
			cellOptions: {
				col1: [
					{ id: 'vol1', content: 'Reduced' },
					{ id: 'vol2', content: 'Normal' },
					{ id: 'vol3', content: 'Increased' }
				],
				col2: [
					{ id: 'vol1', content: 'Reduced' },
					{ id: 'vol2', content: 'Normal' },
					{ id: 'vol3', content: 'Increased' }
				]
			}
		},
		{
			id: 'row5',
			values: [
				'Number of functioning capillaries after the experiment starts',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'cap1', content: 'Decreased' },
					{ id: 'cap2', content: 'Normal' },
					{ id: 'cap3', content: 'Increased' }
				],
				col2: [
					{ id: 'cap1', content: 'Decreased' },
					{ id: 'cap2', content: 'Normal' },
					{ id: 'cap3', content: 'Increased' }
				]
			}
		},
		{
			id: 'row6',
			values: ['State of arterioles after the experiment starts', '', ''],
			cellOptions: {
				col1: [
					{ id: 'art1', content: 'Constricted' },
					{ id: 'art2', content: 'Unchanged' },
					{ id: 'art3', content: 'Dilated' }
				],
				col2: [
					{ id: 'art1', content: 'Constricted' },
					{ id: 'art2', content: 'Unchanged' },
					{ id: 'art3', content: 'Dilated' }
				]
			}
		},
		{
			id: 'row7',
			values: [
				'Linear blood flow velocity after the experiment starts',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'lin1', content: 'Reduced' },
					{ id: 'lin2', content: 'Normal' },
					{ id: 'lin3', content: 'Increased' }
				],
				col2: [
					{ id: 'lin1', content: 'Reduced' },
					{ id: 'lin2', content: 'Normal' },
					{ id: 'lin3', content: 'Increased' }
				]
			}
		},
		{
			id: 'row8',
			values: [
				'Volumetric blood flow velocity after the experiment starts',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'vol1', content: 'Reduced' },
					{ id: 'vol2', content: 'Normal' },
					{ id: 'vol3', content: 'Increased' }
				],
				col2: [
					{ id: 'vol1', content: 'Reduced' },
					{ id: 'vol2', content: 'Normal' },
					{ id: 'vol3', content: 'Increased' }
				]
			}
		},
		{
			id: 'row9',
			values: ['Tissue color', '', ''],
			cellOptions: {
				col1: [
					{ id: 'color1', content: 'Unchanged' },
					{ id: 'color2', content: 'Pale' },
					{ id: 'color3', content: 'Redness' }
				],
				col2: [
					{ id: 'color1', content: 'Unchanged' },
					{ id: 'color2', content: 'Pale' },
					{ id: 'color3', content: 'Redness' }
				]
			}
		},
		{
			id: 'row10',
			values: ['Mechanism of arterial hyperemia formation', '', ''],
			cellOptions: {
				col1: [
					{ id: 'mech1', content: 'Neuroparalytic' },
					{ id: 'mech2', content: 'Neurotonic' },
					{ id: 'mech3', content: 'Myogenic/humoral' }
				],
				col2: [
					{ id: 'mech1', content: 'Neuroparalytic' },
					{ id: 'mech2', content: 'Neurotonic' },
					{ id: 'mech3', content: 'Myogenic/humoral' }
				]
			}
		}
	],
	correctAnswers: {
		// Model 1
		'row1-col1': 'cap2', // Normal
		'row2-col1': 'art2', // Unchanged
		'row3-col1': 'lin2', // Normal
		'row4-col1': 'vol2', // Normal
		'row5-col1': 'cap3', // Increased
		'row6-col1': 'art3', // Dilated
		'row7-col1': 'lin3', // Increased
		'row8-col1': 'vol3', // Increased
		'row9-col1': 'color3', // Redness
		'row10-col1': 'mech1', // Neuroparalytic
		// Model 2
		'row1-col2': 'cap2', // Normal
		'row2-col2': 'art2', // Unchanged
		'row3-col2': 'lin2', // Normal
		'row4-col2': 'vol2', // Normal
		'row5-col2': 'cap3', // Increased
		'row6-col2': 'art3', // Dilated
		'row7-col2': 'lin3', // Increased
		'row8-col2': 'vol3', // Increased
		'row9-col2': 'color3', // Redness
		'row10-col2': 'mech3' // Myogenic/humoral
	}
}

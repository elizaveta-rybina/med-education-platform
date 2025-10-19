import { DropdownTableBlock } from '@/features/dropdown-table'

export const gameTableData: DropdownTableBlock = {
	id: 'dtb-1',
	title: 'Mouse Experiment Results',
	tableTitle: 'Select the corresponding values for each mouse',
	columns: [
		{ id: 'parameter', title: '' },
		{ id: 'mouse1', title: 'First Mouse' },
		{ id: 'mouse2', title: 'Second Mouse' },
		{ id: 'mouse3', title: 'Third Mouse' }
	],
	rows: [
		{ id: 'row1', values: ['Acting Factor', '', '', ''] },
		{
			id: 'row2',
			values: ['Animal Behavior at the Start of the Experiment', '', '', '']
		},
		{
			id: 'row3',
			values: [
				'Animal Behavior 15 Minutes After the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row4',
			values: [
				'Animal Behavior 27 Minutes After the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row5',
			values: [
				'Animal Behavior 42 Minutes After the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row6',
			values: [
				'Animal Breathing Rate at the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row7',
			values: [
				'Animal Breathing Rate 15 Minutes After the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row8',
			values: [
				'Animal Breathing Rate 27 Minutes After the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row9',
			values: [
				'Animal Breathing Rate 42 Minutes After the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row10',
			values: [
				'Animal Skin Condition at the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row11',
			values: [
				'Animal Skin Condition 15 Minutes After the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row12',
			values: [
				'Animal Skin Condition 27 Minutes After the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row13',
			values: [
				'Animal Skin Condition 42 Minutes After the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row14',
			values: [
				'Animal Body Temperature at the Start of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row15',
			values: [
				'Animal Body Temperature at the End of the Experiment',
				'',
				'',
				''
			]
		},
		{
			id: 'row16',
			values: ['Reflex Activity at the End of the Experiment', '', '', '']
		}
	],
	columnOptions: {
		mouse1: [
			// Acting Factor
			{ id: 'factor1', content: 'Isolated Hypoxia' },
			{ id: 'factor2', content: 'Isolated Low Temperature (Hypothermia)' },
			{
				id: 'factor3',
				content: 'Combination of Low Temperature (Hypothermia) and Hypoxia'
			},
			// Behavior
			{ id: 'beh1', content: 'Active, moving, changing position' },
			{ id: 'beh2', content: 'Lethargic, apathetic' },
			{ id: 'beh3', content: 'Sharply slowed' },
			{ id: 'beh4', content: 'Restless, running around the cage' },
			{ id: 'beh5', content: 'Dead' },
			// Breathing Rate
			{ id: 'br57', content: '57 per min' },
			{ id: 'br180', content: '180 per min' },
			{ id: 'br198', content: '198 per min' },
			{ id: 'br222', content: '222 per min' },
			{ id: 'br278', content: '278 per min' },
			{ id: 'br350', content: '350 per min' },
			{ id: 'br380', content: '380 per min' },
			{ id: 'br390', content: '390 per min' },
			{ id: 'br396', content: '396 per min' },
			{ id: 'br_absent', content: 'Absent' },
			// Skin Condition
			{ id: 'skin1', content: 'Pale' },
			{ id: 'skin2', content: 'Pink' },
			{ id: 'skin3', content: 'Slight cyanosis (purple color)' },
			{ id: 'skin4', content: 'Significant cyanosis (purple, red eyes)' },
			{ id: 'skin5', content: 'Pronounced cyanosis (blue color)' },
			// Temperature
			{ id: 'temp1', content: 'Severely lowered (below 30°C)' },
			{ id: 'temp2', content: 'Slightly lowered (about 34–36°C)' },
			{ id: 'temp3', content: 'Normal' },
			{ id: 'temp4', content: 'Slightly elevated (about 38–40°C)' },
			{ id: 'temp5', content: 'Severely elevated (above 40°C)' },
			{ id: 'temp6', content: 'Not measured' },
			// Reflex Activity
			{ id: 'reflex1', content: 'Reduced' },
			{ id: 'reflex2', content: 'Normal' },
			{ id: 'reflex3', content: 'Elevated' },
			{ id: 'reflex4', content: 'Absent' }
		],
		mouse2: [
			// Same options for the second mouse
			{ id: 'factor1', content: 'Isolated Hypoxia' },
			{ id: 'factor2', content: 'Isolated Low Temperature (Hypothermia)' },
			{
				id: 'factor3',
				content: 'Combination of Low Temperature (Hypothermia) and Hypoxia'
			},
			{ id: 'beh1', content: 'Active, moving, changing position' },
			{ id: 'beh2', content: 'Lethargic, apathetic' },
			{ id: 'beh3', content: 'Sharply slowed' },
			{ id: 'beh4', content: 'Restless, running around the cage' },
			{ id: 'beh5', content: 'Dead' },
			{ id: 'br57', content: '57 per min' },
			{ id: 'br180', content: '180 per min' },
			{ id: 'br198', content: '198 per min' },
			{ id: 'br222', content: '222 per min' },
			{ id: 'br278', content: '278 per min' },
			{ id: 'br350', content: '350 per min' },
			{ id: 'br380', content: '380 per min' },
			{ id: 'br390', content: '390 per min' },
			{ id: 'br396', content: '396 per min' },
			{ id: 'br_absent', content: 'Absent' },
			{ id: 'skin1', content: 'Pale' },
			{ id: 'skin2', content: 'Pink' },
			{ id: 'skin3', content: 'Slight cyanosis (purple color)' },
			{ id: 'skin4', content: 'Significant cyanosis (purple, red eyes)' },
			{ id: 'skin5', content: 'Pronounced cyanosis (blue color)' },
			{ id: 'temp1', content: 'Severely lowered (below 30°C)' },
			{ id: 'temp2', content: 'Slightly lowered (about 34–36°C)' },
			{ id: 'temp3', content: 'Normal' },
			{ id: 'temp4', content: 'Slightly elevated (about 38–40°C)' },
			{ id: 'temp5', content: 'Severely elevated (above 40°C)' },
			{ id: 'temp6', content: 'Not measured' },
			{ id: 'reflex1', content: 'Reduced' },
			{ id: 'reflex2', content: 'Normal' },
			{ id: 'reflex3', content: 'Elevated' },
			{ id: 'reflex4', content: 'Absent' }
		],
		mouse3: [
			// Same options for the third mouse
			{ id: 'factor1', content: 'Isolated Hypoxia' },
			{ id: 'factor2', content: 'Isolated Low Temperature (Hypothermia)' },
			{
				id: 'factor3',
				content: 'Combination of Low Temperature (Hypothermia) and Hypoxia'
			},
			{ id: 'beh1', content: 'Active, moving, changing position' },
			{ id: 'beh2', content: 'Lethargic, apathetic' },
			{ id: 'beh3', content: 'Sharply slowed' },
			{ id: 'beh4', content: 'Restless, running around the cage' },
			{ id: 'beh5', content: 'Dead' },
			{ id: 'br57', content: '57 per min' },
			{ id: 'br180', content: '180 per min' },
			{ id: 'br198', content: '198 per min' },
			{ id: 'br222', content: '222 per min' },
			{ id: 'br278', content: '278 per min' },
			{ id: 'br350', content: '350 per min' },
			{ id: 'br380', content: '380 per min' },
			{ id: 'br390', content: '390 per min' },
			{ id: 'br396', content: '396 per min' },
			{ id: 'br_absent', content: 'Absent' },
			{ id: 'skin1', content: 'Pale' },
			{ id: 'skin2', content: 'Pink' },
			{ id: 'skin3', content: 'Slight cyanosis (purple color)' },
			{ id: 'skin4', content: 'Significant cyanosis (purple, red eyes)' },
			{ id: 'skin5', content: 'Pronounced cyanosis (blue color)' },
			{ id: 'temp1', content: 'Severely lowered (below 30°C)' },
			{ id: 'temp2', content: 'Slightly lowered (about 34–36°C)' },
			{ id: 'temp3', content: 'Normal' },
			{ id: 'temp4', content: 'Slightly elevated (about 38–40°C)' },
			{ id: 'temp5', content: 'Severely elevated (above 40°C)' },
			{ id: 'temp6', content: 'Not measured' },
			{ id: 'reflex1', content: 'Reduced' },
			{ id: 'reflex2', content: 'Normal' },
			{ id: 'reflex3', content: 'Elevated' },
			{ id: 'reflex4', content: 'Absent' }
		]
	},
	correctAnswers: {
		// First Mouse
		'row1-mouse1': 'factor2',
		'row2-mouse1': 'beh1',
		'row3-mouse1': 'beh4',
		'row4-mouse1': 'beh4',
		'row5-mouse1': 'beh4',
		'row6-mouse1': 'br180',
		'row7-mouse1': 'br390',
		'row8-mouse1': 'br350',
		'row9-mouse1': 'br380',
		'row10-mouse1': 'skin2',
		'row11-mouse1': 'skin1',
		'row12-mouse1': 'skin1',
		'row13-mouse1': 'skin1',
		'row14-mouse1': 'temp3',
		'row15-mouse1': 'temp2',
		'row16-mouse1': 'reflex2',
		// Second Mouse
		'row1-mouse2': 'factor1',
		'row2-mouse2': 'beh1',
		'row3-mouse2': 'beh1',
		'row4-mouse2': 'beh5',
		'row5-mouse2': 'beh5',
		'row6-mouse2': 'br180',
		'row7-mouse2': 'br396',
		'row8-mouse2': 'br198',
		'row9-mouse2': 'br_absent',
		'row10-mouse2': 'skin2',
		'row11-mouse2': 'skin3',
		'row12-mouse2': 'skin5',
		'row13-mouse2': 'skin5',
		'row14-mouse2': 'temp3',
		'row15-mouse2': 'temp6',
		'row16-mouse2': 'reflex4',
		// Third Mouse
		'row1-mouse3': 'factor3',
		'row2-mouse3': 'beh1',
		'row3-mouse3': 'beh4',
		'row4-mouse3': 'beh2',
		'row5-mouse3': 'beh3',
		'row6-mouse3': 'br180',
		'row7-mouse3': 'br278',
		'row8-mouse3': 'br222',
		'row9-mouse3': 'br57',
		'row10-mouse3': 'skin2',
		'row11-mouse3': 'skin3',
		'row12-mouse3': 'skin4',
		'row13-mouse3': 'skin5',
		'row14-mouse3': 'temp3',
		'row15-mouse3': 'temp1',
		'row16-mouse3': 'reflex1'
	}
}

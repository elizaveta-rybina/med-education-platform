import { DropdownTableBlock } from '@/features/dropdown-table'

export const gameTableData: DropdownTableBlock = {
	id: 'dtb-2-1',
	title: 'Results of the experiment with rats',
	tableTitle: 'Select the corresponding values for each rat',
	columns: [
		{ id: 'parameter', title: '', width: '40%' },
		{ id: 'mouse1', title: 'Rat 1', width: '20%' },
		{ id: 'mouse2', title: 'Rat 2', width: '20%' },
		{ id: 'mouse3', title: 'Rat 3', width: '20%' }
	],
	rows: [
		{
			id: 'row1',
			values: ['Path of current flow', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'path1', content: 'Hind limbs' },
					{ id: 'path2', content: 'Brain' },
					{ id: 'path3', content: 'Heart' }
				],
				col2: [
					{ id: 'path1', content: 'Hind limbs' },
					{ id: 'path2', content: 'Brain' },
					{ id: 'path3', content: 'Heart' }
				],
				col3: [
					{ id: 'path1', content: 'Hind limbs' },
					{ id: 'path2', content: 'Brain' },
					{ id: 'path3', content: 'Heart' }
				]
			}
		},
		{
			id: 'row2',
			values: ['Target of electric current', '', '', ''],
			cellOptions: {
				col1: [
					{
						id: 'target1',
						content: 'Skeletal and smooth muscles'
					},
					{
						id: 'target2',
						content: 'Skeletal and smooth muscles, medulla oblongata'
					},
					{
						id: 'target3',
						content: 'Skeletal and smooth muscles, heart'
					},
					{
						id: 'target4',
						content: 'Skeletal and smooth muscles, medulla oblongata, heart'
					}
				],
				col2: [
					{
						id: 'target1',
						content: 'Skeletal and smooth muscles'
					},
					{
						id: 'target2',
						content: 'Skeletal and smooth muscles, medulla oblongata'
					},
					{
						id: 'target3',
						content: 'Skeletal and smooth muscles, heart'
					},
					{
						id: 'target4',
						content: 'Skeletal and smooth muscles, medulla oblongata, heart'
					}
				],
				col3: [
					{
						id: 'target1',
						content: 'Skeletal and smooth muscles'
					},
					{
						id: 'target2',
						content: 'Skeletal and smooth muscles, medulla oblongata'
					},
					{
						id: 'target3',
						content: 'Skeletal and smooth muscles, heart'
					},
					{
						id: 'target4',
						content: 'Skeletal and smooth muscles, medulla oblongata, heart'
					}
				]
			}
		},
		{
			id: 'row3',
			values: ['Frequency after anesthesia onset', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'freq1', content: '80' },
					{ id: 'freq2', content: '95' },
					{ id: 'freq3', content: '100' },
					{ id: 'freq4', content: '120' }
				],
				col2: [
					{ id: 'freq1', content: '80' },
					{ id: 'freq2', content: '95' },
					{ id: 'freq3', content: '100' },
					{ id: 'freq4', content: '120' }
				],
				col3: [
					{ id: 'freq1', content: '80' },
					{ id: 'freq2', content: '95' },
					{ id: 'freq3', content: '100' },
					{ id: 'freq4', content: '120' }
				]
			}
		},
		{
			id: 'row4',
			values: ['General condition after current passage', '', '', ''],
			cellOptions: {
				col1: [
					{
						id: 'state1',
						content: 'Short-term (1–2 s) convulsive contractions of hind limbs'
					},
					{
						id: 'state2',
						content:
							'Generalized tonic seizures, “bull posture”, then clonic seizures'
					},
					{ id: 'state3', content: 'Generalized tonic seizures' }
				],
				col2: [
					{
						id: 'state1',
						content: 'Short-term (1–2 s) convulsive contractions of hind limbs'
					},
					{
						id: 'state2',
						content:
							'Generalized tonic seizures, “bull posture”, then clonic seizures'
					},
					{ id: 'state3', content: 'Generalized tonic seizures' }
				],
				col3: [
					{
						id: 'state1',
						content: 'Short-term (1–2 s) convulsive contractions of hind limbs'
					},
					{
						id: 'state2',
						content:
							'Generalized tonic seizures, “bull posture”, then clonic seizures'
					},
					{ id: 'state3', content: 'Generalized tonic seizures' }
				]
			}
		},
		{
			id: 'row5',
			values: ['Breathing rate and pattern', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'breath1', content: 'Slowing' },
					{ id: 'breath2', content: 'Acceleration' },
					{
						id: 'breath3',
						content: 'Short-term arrest, then acceleration'
					},
					{ id: 'breath4', content: 'Arrest' }
				],
				col2: [
					{ id: 'breath1', content: 'Slowing' },
					{ id: 'breath2', content: 'Acceleration' },
					{
						id: 'breath3',
						content: 'Short-term arrest, then acceleration'
					},
					{ id: 'breath4', content: 'Arrest' }
				],
				col3: [
					{ id: 'breath1', content: 'Slowing' },
					{ id: 'breath2', content: 'Acceleration' },
					{
						id: 'breath3',
						content: 'Short-term arrest, then acceleration'
					},
					{ id: 'breath4', content: 'Arrest' }
				]
			}
		},
		{
			id: 'row6',
			values: ['Urination, defecation', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'excret1', content: 'None' },
					{ id: 'excret2', content: 'Only urination' },
					{ id: 'excret3', content: 'Only defecation' },
					{ id: 'excret4', content: 'Urination and defecation' }
				],
				col2: [
					{ id: 'excret1', content: 'None' },
					{ id: 'excret2', content: 'Only urination' },
					{ id: 'excret3', content: 'Only defecation' },
					{ id: 'excret4', content: 'Urination and defecation' }
				],
				col3: [
					{ id: 'excret1', content: 'None' },
					{ id: 'excret2', content: 'Only urination' },
					{ id: 'excret3', content: 'Only defecation' },
					{ id: 'excret4', content: 'Urination and defecation' }
				]
			}
		},
		{
			id: 'row7',
			values: ['ECG result', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'ecg1', content: 'Slowed rhythm' },
					{ id: 'ecg2', content: 'Increased rhythm' },
					{ id: 'ecg3', content: 'Extrasystoles' },
					{ id: 'ecg4', content: 'Ventricular fibrillation' },
					{ id: 'ecg5', content: 'Not recorded' }
				],
				col2: [
					{ id: 'ecg1', content: 'Slowed rhythm' },
					{ id: 'ecg2', content: 'Increased rhythm' },
					{ id: 'ecg3', content: 'Extrasystoles' },
					{ id: 'ecg4', content: 'Ventricular fibrillation' },
					{ id: 'ecg5', content: 'Not recorded' }
				],
				col3: [
					{ id: 'ecg1', content: 'Slowed rhythm' },
					{ id: 'ecg2', content: 'Increased rhythm' },
					{ id: 'ecg3', content: 'Extrasystoles' },
					{ id: 'ecg4', content: 'Ventricular fibrillation' },
					{ id: 'ecg5', content: 'Not recorded' }
				]
			}
		},
		{
			id: 'row8',
			values: ['Condition after the experiment', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'final1', content: 'Excitement, aggression' },
					{ id: 'final2', content: 'Return to baseline state' },
					{ id: 'final3', content: 'Movements sluggish, inhibited' },
					{ id: 'final4', content: 'Animal death' }
				],
				col2: [
					{ id: 'final1', content: 'Excitement, aggression' },
					{ id: 'final2', content: 'Return to baseline state' },
					{ id: 'final3', content: 'Movements sluggish, inhibited' },
					{ id: 'final4', content: 'Animal death' }
				],
				col3: [
					{ id: 'final1', content: 'Excitement, aggression' },
					{ id: 'final2', content: 'Return to baseline state' },
					{ id: 'final3', content: 'Movements sluggish, inhibited' },
					{ id: 'final4', content: 'Animal death' }
				]
			}
		}
	],
	correctAnswers: {
		// Rat 1
		'row1-col1': 'path1', // Hind limbs
		'row2-col1': 'target1', // Skeletal and smooth muscles
		'row3-col1': 'freq2', // 95
		'row4-col1': 'state1', // Short-term (1–2 s) convulsive contractions of hind limbs
		'row5-col1': 'breath2', // Acceleration
		'row6-col1': 'excret4', // Urination and defecation
		'row7-col1': 'ecg5', // Not recorded
		'row8-col1': 'final2', // Return to baseline state
		// Rat 2
		'row1-col2': 'path2', // Brain
		'row2-col2': 'target2', // Skeletal and smooth muscles, medulla oblongata
		'row3-col2': 'freq2', // 95
		'row4-col2': 'state2', // Generalized tonic seizures, “bull posture”, then clonic seizures
		'row5-col2': 'breath3', // Short-term arrest, then acceleration
		'row6-col2': 'excret4', // Urination and defecation
		'row7-col2': 'ecg5', // Not recorded
		'row8-col2': 'final3', // Movements sluggish, inhibited
		// Rat 3
		'row1-col3': 'path3', // Heart
		'row2-col3': 'target3', // Skeletal and smooth muscles, heart
		'row3-col3': 'freq2', // 95
		'row4-col3': 'state3', // Generalized tonic seizures
		'row5-col3': 'breath4', // Arrest
		'row6-col3': 'excret4', // Urination and defecation
		'row7-col3': 'ecg4', // Ventricular fibrillation
		'row8-col3': 'final4' // Animal death
	}
}

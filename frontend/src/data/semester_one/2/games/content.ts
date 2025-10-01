import { DropdownTableBlock } from '@/features/dropdown-table'

export const gameTableData: DropdownTableBlock = {
	id: 'dtb-2-1',
	title: 'Результаты эксперимента с крысами',
	tableTitle: 'Выберите соответствующие значения для каждой крысы',
	columns: [
		{ id: 'parameter', title: '', width: '40%' },
		{ id: 'mouse1', title: 'Крыса 1', width: '20%' },
		{ id: 'mouse2', title: 'Крыса 2', width: '20%' },
		{ id: 'mouse3', title: 'Крыса 3', width: '20%' }
	],
	rows: [
		{
			id: 'row1',
			values: ['Путь прохождения тока', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'path1', content: 'Задние конечности' },
					{ id: 'path2', content: 'Мозг' },
					{ id: 'path3', content: 'Сердце' }
				],
				col2: [
					{ id: 'path1', content: 'Задние конечности' },
					{ id: 'path2', content: 'Мозг' },
					{ id: 'path3', content: 'Сердце' }
				],
				col3: [
					{ id: 'path1', content: 'Задние конечности' },
					{ id: 'path2', content: 'Мозг' },
					{ id: 'path3', content: 'Сердце' }
				]
			}
		},
		{
			id: 'row2',
			values: ['Мишень для электрического тока', '', '', ''],
			cellOptions: {
				col1: [
					{
						id: 'target1',
						content: 'поперечнополосатая и гладкая мускулатура'
					},
					{
						id: 'target2',
						content:
							'поперечнополосатая и гладкая мускулатура, продолговатый мозг'
					},
					{
						id: 'target3',
						content: 'поперечнополосатая и гладкая мускулатура, сердце'
					},
					{
						id: 'target4',
						content:
							'поперечнополосатая и гладкая мускулатура, продолговатый мозг, сердце'
					}
				],
				col2: [
					{
						id: 'target1',
						content: 'поперечнополосатая и гладкая мускулатура'
					},
					{
						id: 'target2',
						content:
							'поперечнополосатая и гладкая мускулатура, продолговатый мозг'
					},
					{
						id: 'target3',
						content: 'поперечнополосатая и гладкая мускулатура, сердце'
					},
					{
						id: 'target4',
						content:
							'поперечнополосатая и гладкая мускулатура, продолговатый мозг, сердце'
					}
				],
				col3: [
					{
						id: 'target1',
						content: 'поперечнополосатая и гладкая мускулатура'
					},
					{
						id: 'target2',
						content:
							'поперечнополосатая и гладкая мускулатура, продолговатый мозг'
					},
					{
						id: 'target3',
						content: 'поперечнополосатая и гладкая мускулатура, сердце'
					},
					{
						id: 'target4',
						content:
							'поперечнополосатая и гладкая мускулатура, продолговатый мозг, сердце'
					}
				]
			}
		},
		{
			id: 'row3',
			values: ['Частота после наступления наркоза', '', '', ''],
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
			values: ['Общее состояние после пропускания тока', '', '', ''],
			cellOptions: {
				col1: [
					{
						id: 'state1',
						content:
							'Кратковременные (1-2 с) судорожные сокращения задних конечностей'
					},
					{
						id: 'state2',
						content:
							'Генерализованные тонические судороги, «поза быка», затем клонические судороги'
					},
					{ id: 'state3', content: 'Генерализованные тонические судороги' }
				],
				col2: [
					{
						id: 'state1',
						content:
							'Кратковременные (1-2 с) судорожные сокращения задних конечностей'
					},
					{
						id: 'state2',
						content:
							'Генерализованные тонические судороги, «поза быка», затем клонические судороги'
					},
					{ id: 'state3', content: 'Генерализованные тонические судороги' }
				],
				col3: [
					{
						id: 'state1',
						content:
							'Кратковременные (1-2 с) судорожные сокращения задних конечностей'
					},
					{
						id: 'state2',
						content:
							'Генерализованные тонические судороги, «поза быка», затем клонические судороги'
					},
					{ id: 'state3', content: 'Генерализованные тонические судороги' }
				]
			}
		},
		{
			id: 'row5',
			values: ['Частота и характер дыхания', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'breath1', content: 'урежение' },
					{ id: 'breath2', content: 'учащение' },
					{
						id: 'breath3',
						content: 'Кратковременная остановка, затем учащение'
					},
					{ id: 'breath4', content: 'Остановка' }
				],
				col2: [
					{ id: 'breath1', content: 'урежение' },
					{ id: 'breath2', content: 'учащение' },
					{
						id: 'breath3',
						content: 'Кратковременная остановка, затем учащение'
					},
					{ id: 'breath4', content: 'Остановка' }
				],
				col3: [
					{ id: 'breath1', content: 'урежение' },
					{ id: 'breath2', content: 'учащение' },
					{
						id: 'breath3',
						content: 'Кратковременная остановка, затем учащение'
					},
					{ id: 'breath4', content: 'Остановка' }
				]
			}
		},
		{
			id: 'row6',
			values: ['Мочеиспускание, дефекация', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'excret1', content: 'нет' },
					{ id: 'excret2', content: 'только мочеиспускание' },
					{ id: 'excret3', content: 'только дефекация' },
					{ id: 'excret4', content: 'мочеиспускание и дефекация' }
				],
				col2: [
					{ id: 'excret1', content: 'нет' },
					{ id: 'excret2', content: 'только мочеиспускание' },
					{ id: 'excret3', content: 'только дефекация' },
					{ id: 'excret4', content: 'мочеиспускание и дефекация' }
				],
				col3: [
					{ id: 'excret1', content: 'нет' },
					{ id: 'excret2', content: 'только мочеиспускание' },
					{ id: 'excret3', content: 'только дефекация' },
					{ id: 'excret4', content: 'мочеиспускание и дефекация' }
				]
			}
		},
		{
			id: 'row7',
			values: ['Результат ЭКГ', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'ecg1', content: 'урежение ритма' },
					{ id: 'ecg2', content: 'учащение ритма' },
					{ id: 'ecg3', content: 'экстрасистолы' },
					{ id: 'ecg4', content: 'фибрилляция желудочков' },
					{ id: 'ecg5', content: 'не снимали' }
				],
				col2: [
					{ id: 'ecg1', content: 'урежение ритма' },
					{ id: 'ecg2', content: 'учащение ритма' },
					{ id: 'ecg3', content: 'экстрасистолы' },
					{ id: 'ecg4', content: 'фибрилляция желудочков' },
					{ id: 'ecg5', content: 'не снимали' }
				],
				col3: [
					{ id: 'ecg1', content: 'урежение ритма' },
					{ id: 'ecg2', content: 'учащение ритма' },
					{ id: 'ecg3', content: 'экстрасистолы' },
					{ id: 'ecg4', content: 'фибрилляция желудочков' },
					{ id: 'ecg5', content: 'не снимали' }
				]
			}
		},
		{
			id: 'row8',
			values: ['Состояние после эксперимента', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'final1', content: 'возбуждение, агрессия' },
					{ id: 'final2', content: 'возвращение к исходному состоянию' },
					{ id: 'final3', content: 'движения вялые, заторможенные' },
					{ id: 'final4', content: 'смерть животного' }
				],
				col2: [
					{ id: 'final1', content: 'возбуждение, агрессия' },
					{ id: 'final2', content: 'возвращение к исходному состоянию' },
					{ id: 'final3', content: 'движения вялые, заторможенные' },
					{ id: 'final4', content: 'смерть животного' }
				],
				col3: [
					{ id: 'final1', content: 'возбуждение, агрессия' },
					{ id: 'final2', content: 'возвращение к исходному состоянию' },
					{ id: 'final3', content: 'движения вялые, заторможенные' },
					{ id: 'final4', content: 'смерть животного' }
				]
			}
		}
	],
	correctAnswers: {
		// Крыса 1
		'row1-col1': 'path1', // Задние конечности
		'row2-col1': 'target1', // поперечнополосатая и гладкая мускулатура
		'row3-col1': 'freq2', // 95
		'row4-col1': 'state1', // Кратковременные (1-2 с) судорожные сокращения задних конечностей
		'row5-col1': 'breath2', // учащение
		'row6-col1': 'excret4', // мочеиспускание и дефекация
		'row7-col1': 'ecg5', // не снимали
		'row8-col1': 'final2', // возвращение к исходному состоянию
		// Крыса 2
		'row1-col2': 'path2', // Мозг
		'row2-col2': 'target2', // поперечнополосатая и гладкая мускулатура, продолговатый мозг
		'row3-col2': 'freq2', // 95
		'row4-col2': 'state2', // Генерализованные тонические судороги, «поза быка», затем клонические судороги
		'row5-col2': 'breath3', // Кратковременная остановка, затем учащение
		'row6-col2': 'excret4', // мочеиспускание и дефекация
		'row7-col2': 'ecg5', // не снимали
		'row8-col2': 'final3', // движения вялые, заторможенные
		// Крыса 3
		'row1-col3': 'path3', // Сердце
		'row2-col3': 'target3', // поперечнополосатая и гладкая мускулатура, сердце
		'row3-col3': 'freq2', // 95
		'row4-col3': 'state3', // Генерализованные тонические судороги
		'row5-col3': 'breath4', // Остановка
		'row6-col3': 'excret4', // мочеиспускание и дефекация
		'row7-col3': 'ecg4', // фибрилляция желудочков
		'row8-col3': 'final4' // смерть животного
	}
}

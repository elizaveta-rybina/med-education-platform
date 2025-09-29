import { DropdownTableBlock } from '@/features/dropdown-table'

export const gameTableData: DropdownTableBlock = {
	id: 'dtb-1',
	title: 'Результаты эксперимента с мышами',
	tableTitle: 'Выберите соответствующие значения для каждой мыши',
	columns: [
		{ id: 'parameter', title: '' },
		{ id: 'mouse1', title: 'Первая мышь' },
		{ id: 'mouse2', title: 'Вторая мышь' },
		{ id: 'mouse3', title: 'Третья мышь' }
	],
	rows: [
		{ id: 'row1', values: ['Действующий фактор', '', '', ''] },
		{
			id: 'row2',
			values: ['Поведение животного в начале эксперимента', '', '', '']
		},
		{
			id: 'row3',
			values: [
				'Поведение животного через 15 минут после начала эксперимента',
				'',
				'',
				''
			]
		},
		{
			id: 'row4',
			values: [
				'Поведение животного через 27 минут после начала эксперимента',
				'',
				'',
				''
			]
		},
		{
			id: 'row5',
			values: [
				'Поведение животного через 42 минуты после начала эксперимента',
				'',
				'',
				''
			]
		},
		{
			id: 'row6',
			values: ['Частота дыхания животного в начале эксперимента', '', '', '']
		},
		{
			id: 'row7',
			values: [
				'Частота дыхания животного через 15 минут после начала эксперимента',
				'',
				'',
				''
			]
		},
		{
			id: 'row8',
			values: [
				'Частота дыхания животного через 27 минут после начала эксперимента',
				'',
				'',
				''
			]
		},
		{
			id: 'row9',
			values: [
				'Частота дыхания животного через 42 минуты после начала эксперимента',
				'',
				'',
				''
			]
		},
		{
			id: 'row10',
			values: ['Кожные покровы животного в начале эксперимента', '', '', '']
		},
		{
			id: 'row11',
			values: [
				'Кожные покровы животного через 15 минут после начала эксперимента',
				'',
				'',
				''
			]
		},
		{
			id: 'row12',
			values: [
				'Кожные покровы животного через 27 минут после начала эксперимента',
				'',
				'',
				''
			]
		},
		{
			id: 'row13',
			values: [
				'Кожные покровы животного через 42 минуты после начала эксперимента',
				'',
				'',
				''
			]
		},
		{
			id: 'row14',
			values: ['Температура тела животного в начале эксперимента', '', '', '']
		},
		{
			id: 'row15',
			values: ['Температура тела животного в конце эксперимента', '', '', '']
		},
		{
			id: 'row16',
			values: ['Рефлекторная активность в конце эксперимента', '', '', '']
		}
	],
	columnOptions: {
		mouse1: [
			// Действующий фактор
			{ id: 'factor1', content: 'изолированная гипоксия' },
			{
				id: 'factor2',
				content: 'изолированная низкая температура (гипотермия)'
			},
			{
				id: 'factor3',
				content: 'комплекс низкой температуры (гипотермии) и гипоксии'
			},
			// Поведение
			{ id: 'beh1', content: 'активна, двигается, меняет положение' },
			{ id: 'beh2', content: 'вялая, апатичная' },
			{ id: 'beh3', content: 'резко заторможена' },
			{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
			{ id: 'beh5', content: 'мертва' },
			// Частота дыхания
			{ id: 'br57', content: '57 в мин' },
			{ id: 'br180', content: '180 в мин' },
			{ id: 'br198', content: '198 в мин' },
			{ id: 'br222', content: '222 в мин' },
			{ id: 'br278', content: '278 в мин' },
			{ id: 'br350', content: '350 в мин' },
			{ id: 'br380', content: '380 в мин' },
			{ id: 'br390', content: '390 в мин' },
			{ id: 'br396', content: '396 в мин' },
			{ id: 'br_absent', content: 'отсутствует' },
			// Кожные покровы
			{ id: 'skin1', content: 'бледные' },
			{ id: 'skin2', content: 'розовые' },
			{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
			{
				id: 'skin4',
				content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
			},
			{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' },
			// Температура
			{ id: 'temp1', content: 'сильно пониженная (менее 30°C)' },
			{ id: 'temp2', content: 'незначительно пониженная (около 34–36°C)' },
			{ id: 'temp3', content: 'нормальная' },
			{ id: 'temp4', content: 'незначительно повышенная (около 38–40°C)' },
			{ id: 'temp5', content: 'сильно повышенная (более 40°C)' },
			{ id: 'temp6', content: 'не измеряли' },
			// Рефлекторная активность
			{ id: 'reflex1', content: 'снижена' },
			{ id: 'reflex2', content: 'нормальная' },
			{ id: 'reflex3', content: 'повышенная' },
			{ id: 'reflex4', content: 'отсутствует' }
		],
		mouse2: [
			// Те же опции для второй мыши
			{ id: 'factor1', content: 'изолированная гипоксия' },
			{
				id: 'factor2',
				content: 'изолированная низкая температура (гипотермия)'
			},
			{
				id: 'factor3',
				content: 'комплекс низкой температуры (гипотермии) и гипоксии'
			},
			{ id: 'beh1', content: 'активна, двигается, меняет положение' },
			{ id: 'beh2', content: 'вялая, апатичная' },
			{ id: 'beh3', content: 'резко заторможена' },
			{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
			{ id: 'beh5', content: 'мертва' },
			{ id: 'br57', content: '57 в мин' },
			{ id: 'br180', content: '180 в мин' },
			{ id: 'br198', content: '198 в мин' },
			{ id: 'br222', content: '222 в мин' },
			{ id: 'br278', content: '278 в мин' },
			{ id: 'br350', content: '350 в мин' },
			{ id: 'br380', content: '380 в мин' },
			{ id: 'br390', content: '390 в мин' },
			{ id: 'br396', content: '396 в мин' },
			{ id: 'br_absent', content: 'отсутствует' },
			{ id: 'skin1', content: 'бледные' },
			{ id: 'skin2', content: 'розовые' },
			{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
			{
				id: 'skin4',
				content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
			},
			{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' },
			{ id: 'temp1', content: 'сильно пониженная (менее 30°C)' },
			{ id: 'temp2', content: 'незначительно пониженная (около 34–36°C)' },
			{ id: 'temp3', content: 'нормальная' },
			{ id: 'temp4', content: 'незначительно повышенная (около 38–40°C)' },
			{ id: 'temp5', content: 'сильно повышенная (более 40°C)' },
			{ id: 'temp6', content: 'не измеряли' },
			{ id: 'reflex1', content: 'снижена' },
			{ id: 'reflex2', content: 'нормальная' },
			{ id: 'reflex3', content: 'повышенная' },
			{ id: 'reflex4', content: 'отсутствует' }
		],
		mouse3: [
			// Те же опции для третьей мыши
			{ id: 'factor1', content: 'изолированная гипоксия' },
			{
				id: 'factor2',
				content: 'изолированная низкая температура (гипотермия)'
			},
			{
				id: 'factor3',
				content: 'комплекс низкой температуры (гипотермии) и гипоксии'
			},
			{ id: 'beh1', content: 'активна, двигается, меняет положение' },
			{ id: 'beh2', content: 'вялая, апатичная' },
			{ id: 'beh3', content: 'резко заторможена' },
			{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
			{ id: 'beh5', content: 'мертва' },
			{ id: 'br57', content: '57 в мин' },
			{ id: 'br180', content: '180 в мин' },
			{ id: 'br198', content: '198 в мин' },
			{ id: 'br222', content: '222 в мин' },
			{ id: 'br278', content: '278 в мин' },
			{ id: 'br350', content: '350 в мин' },
			{ id: 'br380', content: '380 в мин' },
			{ id: 'br390', content: '390 в мин' },
			{ id: 'br396', content: '396 в мин' },
			{ id: 'br_absent', content: 'отсутствует' },
			{ id: 'skin1', content: 'бледные' },
			{ id: 'skin2', content: 'розовые' },
			{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
			{
				id: 'skin4',
				content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
			},
			{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' },
			{ id: 'temp1', content: 'сильно пониженная (менее 30°C)' },
			{ id: 'temp2', content: 'незначительно пониженная (около 34–36°C)' },
			{ id: 'temp3', content: 'нормальная' },
			{ id: 'temp4', content: 'незначительно повышенная (около 38–40°C)' },
			{ id: 'temp5', content: 'сильно повышенная (более 40°C)' },
			{ id: 'temp6', content: 'не измеряли' },
			{ id: 'reflex1', content: 'снижена' },
			{ id: 'reflex2', content: 'нормальная' },
			{ id: 'reflex3', content: 'повышенная' },
			{ id: 'reflex4', content: 'отсутствует' }
		]
	},
	correctAnswers: {
		// Первая мышь
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
		// Вторая мышь
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
		// Третья мышь
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

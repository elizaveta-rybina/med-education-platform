import { DropdownTableBlock } from '@/features/dropdown-table'

export const gameTableData: DropdownTableBlock = {
	id: 'dtb-1',
	title: 'Результаты эксперимента с мышами',
	tableTitle: 'Выберите соответствующие значения для каждой мыши',
	columns: [
		{ id: 'parameter', title: '', width: '40%' },
		{ id: 'mouse1', title: 'Первая мышь', width: '20%' },
		{ id: 'mouse2', title: 'Вторая мышь', width: '20%' },
		{ id: 'mouse3', title: 'Третья мышь', width: '20%' }
	],
	rows: [
		{
			id: 'row1',
			values: ['Действующий фактор', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'factor1', content: 'изолированная гипоксия' },
					{
						id: 'factor2',
						content: 'изолированная низкая температура (гипотермия)'
					},
					{
						id: 'factor3',
						content: 'комплекс низкой температуры (гипотермии) и гипоксии'
					}
				],
				col2: [
					{ id: 'factor1', content: 'изолированная гипоксия' },
					{
						id: 'factor2',
						content: 'изолированная низкая температура (гипотермия)'
					},
					{
						id: 'factor3',
						content: 'комплекс низкой температуры (гипотермии) и гипоксии'
					}
				],
				col3: [
					{ id: 'factor1', content: 'изолированная гипоксия' },
					{
						id: 'factor2',
						content: 'изолированная низкая температура (гипотермия)'
					},
					{
						id: 'factor3',
						content: 'комплекс низкой температуры (гипотермии) и гипоксии'
					}
				]
			}
		},
		{
			id: 'row2',
			values: ['Поведение животного в начале эксперимента', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				],
				col2: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				],
				col3: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				]
			}
		},
		{
			id: 'row3',
			values: [
				'Поведение животного через 15 минут после начала эксперимента',
				'',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				],
				col2: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				],
				col3: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				]
			}
		},
		{
			id: 'row4',
			values: [
				'Поведение животного через 27 минут после начала эксперимента',
				'',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				],
				col2: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				],
				col3: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				]
			}
		},
		{
			id: 'row5',
			values: [
				'Поведение животного через 42 минуты после начала эксперимента',
				'',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				],
				col2: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				],
				col3: [
					{ id: 'beh1', content: 'активна, двигается, меняет положение' },
					{ id: 'beh2', content: 'вялая, апатичная' },
					{ id: 'beh3', content: 'резко заторможена' },
					{ id: 'beh4', content: 'беспокойная, мечется по клетке' },
					{ id: 'beh5', content: 'мертва' }
				]
			}
		},
		{
			id: 'row6',
			values: ['Частота дыхания животного в начале эксперимента', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				],
				col2: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				],
				col3: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				]
			}
		},
		{
			id: 'row7',
			values: [
				'Частота дыхания животного через 15 минут после начала эксперимента',
				'',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				],
				col2: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				],
				col3: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				]
			}
		},
		{
			id: 'row8',
			values: [
				'Частота дыхания животного через 27 минут после начала эксперимента',
				'',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				],
				col2: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				],
				col3: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				]
			}
		},
		{
			id: 'row9',
			values: [
				'Частота дыхания животного через 42 минуты после начала эксперимента',
				'',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				],
				col2: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				],
				col3: [
					{ id: 'br57', content: '57 в мин' },
					{ id: 'br180', content: '180 в мин' },
					{ id: 'br198', content: '198 в мин' },
					{ id: 'br222', content: '222 в мин' },
					{ id: 'br278', content: '278 в мин' },
					{ id: 'br350', content: '350 в мин' },
					{ id: 'br380', content: '380 в мин' },
					{ id: 'br390', content: '390 в мин' },
					{ id: 'br396', content: '396 в мин' },
					{ id: 'br_absent', content: 'отсутствует' }
				]
			}
		},
		{
			id: 'row10',
			values: ['Кожные покровы животного в начале эксперимента', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				],
				col2: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				],
				col3: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				]
			}
		},
		{
			id: 'row11',
			values: [
				'Кожные покровы животного через 15 минут после начала эксперимента',
				'',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				],
				col2: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				],
				col3: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				]
			}
		},
		{
			id: 'row12',
			values: [
				'Кожные покровы животного через 27 минут после начала эксперимента',
				'',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				],
				col2: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				],
				col3: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				]
			}
		},
		{
			id: 'row13',
			values: [
				'Кожные покровы животного через 42 минуты после начала эксперимента',
				'',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				],
				col2: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				],
				col3: [
					{ id: 'skin1', content: 'бледные' },
					{ id: 'skin2', content: 'розовые' },
					{ id: 'skin3', content: 'незначительный цианоз (сиреневый цвет)' },
					{
						id: 'skin4',
						content: 'значительный цианоз (фиолетовый, глаза красного цвета)'
					},
					{ id: 'skin5', content: 'выраженный цианоз (синий цвет)' }
				]
			}
		},
		{
			id: 'row14',
			values: ['Температура тела животного в начале эксперимента', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'temp1', content: 'сильно пониженная (менее 30°C)' },
					{ id: 'temp2', content: 'незначительно пониженная (около 34–36°C)' },
					{ id: 'temp3', content: 'нормальная' },
					{ id: 'temp4', content: 'незначительно повышенная (около 38–40°C)' },
					{ id: 'temp5', content: 'сильно повышенная (более 40°C)' },
					{ id: 'temp6', content: 'не измеряли' }
				],
				col2: [
					{ id: 'temp1', content: 'сильно пониженная (менее 30°C)' },
					{ id: 'temp2', content: 'незначительно пониженная (около 34–36°C)' },
					{ id: 'temp3', content: 'нормальная' },
					{ id: 'temp4', content: 'незначительно повышенная (около 38–40°C)' },
					{ id: 'temp5', content: 'сильно повышенная (более 40°C)' },
					{ id: 'temp6', content: 'не измеряли' }
				],
				col3: [
					{ id: 'temp1', content: 'сильно пониженная (менее 30°C)' },
					{ id: 'temp2', content: 'незначительно пониженная (около 34–36°C)' },
					{ id: 'temp3', content: 'нормальная' },
					{ id: 'temp4', content: 'незначительно повышенная (около 38–40°C)' },
					{ id: 'temp5', content: 'сильно повышенная (более 40°C)' },
					{ id: 'temp6', content: 'не измеряли' }
				]
			}
		},
		{
			id: 'row15',
			values: ['Температура тела животного в конце эксперимента', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'temp1', content: 'сильно пониженная (менее 30°C)' },
					{ id: 'temp2', content: 'незначительно пониженная (около 34–36°C)' },
					{ id: 'temp3', content: 'нормальная' },
					{ id: 'temp4', content: 'незначительно повышенная (около 38–40°C)' },
					{ id: 'temp5', content: 'сильно повышенная (более 40°C)' },
					{ id: 'temp6', content: 'не измеряли' }
				],
				col2: [
					{ id: 'temp1', content: 'сильно пониженная (менее 30°C)' },
					{ id: 'temp2', content: 'незначительно пониженная (около 34–36°C)' },
					{ id: 'temp3', content: 'нормальная' },
					{ id: 'temp4', content: 'незначительно повышенная (около 38–40°C)' },
					{ id: 'temp5', content: 'сильно повышенная (более 40°C)' },
					{ id: 'temp6', content: 'не измеряли' }
				],
				col3: [
					{ id: 'temp1', content: 'сильно пониженная (менее 30°C)' },
					{ id: 'temp2', content: 'незначительно пониженная (около 34–36°C)' },
					{ id: 'temp3', content: 'нормальная' },
					{ id: 'temp4', content: 'незначительно повышенная (около 38–40°C)' },
					{ id: 'temp5', content: 'сильно повышенная (более 40°C)' },
					{ id: 'temp6', content: 'не измеряли' }
				]
			}
		},
		{
			id: 'row16',
			values: ['Рефлекторная активность в конце эксперимента', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'reflex1', content: 'снижена' },
					{ id: 'reflex2', content: 'нормальная' },
					{ id: 'reflex3', content: 'повышенная' },
					{ id: 'reflex4', content: 'отсутствует' }
				],
				col2: [
					{ id: 'reflex1', content: 'снижена' },
					{ id: 'reflex2', content: 'нормальная' },
					{ id: 'reflex3', content: 'повышенная' },
					{ id: 'reflex4', content: 'отсутствует' }
				],
				col3: [
					{ id: 'reflex1', content: 'снижена' },
					{ id: 'reflex2', content: 'нормальная' },
					{ id: 'reflex3', content: 'повышенная' },
					{ id: 'reflex4', content: 'отсутствует' }
				]
			}
		}
	],
	correctAnswers: {
		// Первая мышь
		'row1-col1': 'factor2', // изолированная низкая температура (гипотермия)
		'row2-col1': 'beh1', // активна, двигается, меняет положение
		'row3-col1': 'beh4', // беспокойная, мечется по клетке
		'row4-col1': 'beh4', // беспокойная, мечется по клетке
		'row5-col1': 'beh4', // беспокойная, мечется по клетке
		'row6-col1': 'br180', // 180 в мин
		'row7-col1': 'br390', // 390 в мин
		'row8-col1': 'br350', // 350 в мин
		'row9-col1': 'br380', // 380 в мин
		'row10-col1': 'skin2', // розовые
		'row11-col1': 'skin1', // бледные
		'row12-col1': 'skin1', // бледные
		'row13-col1': 'skin1', // бледные
		'row14-col1': 'temp3', // нормальная
		'row15-col1': 'temp2', // незначительно пониженная (около 34–36°C)
		'row16-col1': 'reflex2', // нормальная
		// Вторая мышь
		'row1-col2': 'factor1', // изолированная гипоксия
		'row2-col2': 'beh1', // активна, двигается, меняет положение
		'row3-col2': 'beh1', // активна, двигается, меняет положение
		'row4-col2': 'beh5', // мертва
		'row5-col2': 'beh5', // мертва
		'row6-col2': 'br180', // 180 в мин
		'row7-col2': 'br396', // 396 в мин
		'row8-col2': 'br198', // 198 в мин
		'row9-col2': 'br_absent', // отсутствует
		'row10-col2': 'skin2', // розовые
		'row11-col2': 'skin3', // незначительный цианоз
		'row12-col2': 'skin5', // выраженный цианоз
		'row13-col2': 'skin5', // выраженный цианоз
		'row14-col2': 'temp3', // нормальная
		'row15-col2': 'temp6', // не измеряли
		'row16-col2': 'reflex4', // отсутствует
		// Третья мышь
		'row1-col3': 'factor3', // комплекс низкой температуры и гипоксии
		'row2-col3': 'beh1', // активна, двигается, меняет положение
		'row3-col3': 'beh4', // беспокойная, мечется по клетке
		'row4-col3': 'beh2', // вялая, апатичная
		'row5-col3': 'beh3', // резко заторможена
		'row6-col3': 'br180', // 180 в мин
		'row7-col3': 'br278', // 278 в мин
		'row8-col3': 'br222', // 222 в мин
		'row9-col3': 'br57', // 57 в мин
		'row10-col3': 'skin2', // розовые
		'row11-col3': 'skin3', // незначительный цианоз
		'row12-col3': 'skin4', // значительный цианоз
		'row13-col3': 'skin5', // выраженный цианоз
		'row14-col3': 'temp3', // нормальная
		'row15-col3': 'temp1', // сильно пониженная (менее 30°C)
		'row16-col3': 'reflex1' // снижена
	}
}

import { DropdownTableBlock } from '@/features/dropdown-table'

export const gameTableData: DropdownTableBlock = {
	id: 'dtb-1',
	title: 'Результаты эксперимента по влиянию на беременность',
	tableTitle:
		'Выберите соответствующие значения для каждого срока беременности',
	columns: [
		{ id: 'parameter', title: '', width: '40%' },
		{ id: 'early', title: 'Ранний срок беременности', width: '20%' },
		{ id: 'middle', title: 'Средний срок беременности', width: '20%' },
		{ id: 'late', title: 'Поздние сроки беременности', width: '20%' }
	],
	rows: [
		{
			id: 'row1',
			values: ['Размер плодов', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'size1', content: 'увеличены' },
					{ id: 'size2', content: 'нормальные' },
					{ id: 'size3', content: 'уменьшенные' },
					{ id: 'size4', content: 'отсутствуют' }
				],
				col2: [
					{ id: 'size1', content: 'увеличены' },
					{ id: 'size2', content: 'нормальные' },
					{ id: 'size3', content: 'уменьшенные' },
					{ id: 'size4', content: 'отсутствуют' }
				],
				col3: [
					{ id: 'size1', content: 'увеличены' },
					{ id: 'size2', content: 'нормальные' },
					{ id: 'size3', content: 'уменьшенные' },
					{ id: 'size4', content: 'отсутствуют' }
				]
			}
		},
		{
			id: 'row2',
			values: ['Цвет плодов', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'color1', content: 'розовые (есть подкожный жир)' },
					{ id: 'color2', content: 'красные (нет подкожного жира)' },
					{ id: 'color3', content: 'плоды отсутствуют' }
				],
				col2: [
					{ id: 'color1', content: 'розовые (есть подкожный жир)' },
					{ id: 'color2', content: 'красные (нет подкожного жира)' },
					{ id: 'color3', content: 'плоды отсутствуют' }
				],
				col3: [
					{ id: 'color1', content: 'розовые (есть подкожный жир)' },
					{ id: 'color2', content: 'красные (нет подкожного жира)' },
					{ id: 'color3', content: 'плоды отсутствуют' }
				]
			}
		},
		{
			id: 'row3',
			values: ['Уровень развития конечностей', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'limbs1', content: 'развиты хорошо' },
					{ id: 'limbs2', content: 'недоразвиты' },
					{ id: 'limbs3', content: 'плоды отсутствуют' }
				],
				col2: [
					{ id: 'limbs1', content: 'развиты хорошо' },
					{ id: 'limbs2', content: 'недоразвиты' },
					{ id: 'limbs3', content: 'плоды отсутствуют' }
				],
				col3: [
					{ id: 'limbs1', content: 'развиты хорошо' },
					{ id: 'limbs2', content: 'недоразвиты' },
					{ id: 'limbs3', content: 'плоды отсутствуют' }
				]
			}
		},
		{
			id: 'row4',
			values: ['Изменения на гистологическом срезе', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'histo1', content: 'нет изменений' },
					{ id: 'histo2', content: 'дефекты развития' },
					{ id: 'histo3', content: 'плоды отсутствуют' }
				],
				col2: [
					{ id: 'histo1', content: 'нет изменений' },
					{ id: 'histo2', content: 'дефекты развития' },
					{ id: 'histo3', content: 'плоды отсутствуют' }
				],
				col3: [
					{ id: 'histo1', content: 'нет изменений' },
					{ id: 'histo2', content: 'дефекты развития' },
					{ id: 'histo3', content: 'плоды отсутствуют' }
				]
			}
		},
		{
			id: 'row5',
			values: ['Изменения в клетках при микроскопии', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'micro1', content: 'нет изменений' },
					{
						id: 'micro2',
						content:
							'признаки атипического митоза (полая метафаза, отставание хромосом в анафазе митоза)'
					},
					{ id: 'micro3', content: 'микроскопию не делали' }
				],
				col2: [
					{ id: 'micro1', content: 'нет изменений' },
					{
						id: 'micro2',
						content:
							'признаки атипического митоза (полая метафаза, отставание хромосом в анафазе митоза)'
					},
					{ id: 'micro3', content: 'микроскопию не делали' }
				],
				col3: [
					{ id: 'micro1', content: 'нет изменений' },
					{
						id: 'micro2',
						content:
							'признаки атипического митоза (полая метафаза, отставание хромосом в анафазе митоза)'
					},
					{ id: 'micro3', content: 'микроскопию не делали' }
				]
			}
		},
		{
			id: 'row6',
			values: ['Какой механизм повреждения клетки был ведущим', '', '', ''],
			cellOptions: {
				col1: [
					{ id: 'mech1', content: 'нарушение энергетического обмена' },
					{ id: 'mech2', content: 'нарушение водно-электролитного баланса' },
					{ id: 'mech3', content: 'нарушение регуляции клеточной активности' },
					{ id: 'mech4', content: 'изменения в ядре и ДНК' },
					{ id: 'mech5', content: 'аутокатализ' },
					{ id: 'mech6', content: 'мембранный механизм' },
					{ id: 'mech7', content: 'повреждения клеток не выявлены' }
				],
				col2: [
					{ id: 'mech1', content: 'нарушение энергетического обмена' },
					{ id: 'mech2', content: 'нарушение водно-электролитного баланса' },
					{ id: 'mech3', content: 'нарушение регуляции клеточной активности' },
					{ id: 'mech4', content: 'изменения в ядре и ДНК' },
					{ id: 'mech5', content: 'аутокатализ' },
					{ id: 'mech6', content: 'мембранный механизм' },
					{ id: 'mech7', content: 'повреждения клеток не выявлены' }
				],
				col3: [
					{ id: 'mech1', content: 'нарушение энергетического обмена' },
					{ id: 'mech2', content: 'нарушение водно-электролитного баланса' },
					{ id: 'mech3', content: 'нарушение регуляции клеточной активности' },
					{ id: 'mech4', content: 'изменения в ядре и ДНК' },
					{ id: 'mech5', content: 'аутокатализ' },
					{ id: 'mech6', content: 'мембранный механизм' },
					{ id: 'mech7', content: 'повреждения клеток не выявлены' }
				]
			}
		},
		{
			id: 'row7',
			values: ['Результат беременности', '', '', ''],
			cellOptions: {
				col1: [
					{
						id: 'result1',
						content: 'остановка развития плода и прерывание беременности'
					},
					{ id: 'result2', content: 'потомство с пороками развития' },
					{ id: 'result3', content: 'нормальное потомство' }
				],
				col2: [
					{
						id: 'result1',
						content: 'остановка развития плода и прерывание беременности'
					},
					{ id: 'result2', content: 'потомство с пороками развития' },
					{ id: 'result3', content: 'нормальное потомство' }
				],
				col3: [
					{
						id: 'result1',
						content: 'остановка развития плода и прерывание беременности'
					},
					{ id: 'result2', content: 'потомство с пороками развития' },
					{ id: 'result3', content: 'нормальное потомство' }
				]
			}
		}
	],
	correctAnswers: {
		// Ранний срок беременности
		'row1-col1': 'size4', // отсутствуют
		'row2-col1': 'color3', // плоды отсутствуют
		'row3-col1': 'limbs3', // плоды отсутствуют
		'row4-col1': 'histo3', // плоды отсутствуют
		'row5-col1': 'micro3', // микроскопию не делали
		'row6-col1': 'mech4', // изменения в ядре и ДНК
		'row7-col1': 'result1', // остановка развития плода и прерывание беременности
		// Средний срок беременности
		'row1-col2': 'size3', // уменьшенные
		'row2-col2': 'color2', // красные (нет подкожного жира)
		'row3-col2': 'limbs2', // недоразвиты
		'row4-col2': 'histo2', // дефекты развития
		'row5-col2': 'micro2', // признаки атипического митоза
		'row6-col2': 'mech4', // изменения в ядре и ДНК
		'row7-col2': 'result2', // потомство с пороками развития
		// Поздние сроки беременности
		'row1-col3': 'size2', // нормальные
		'row2-col3': 'color1', // розовые (есть подкожный жир)
		'row3-col3': 'limbs1', // развиты хорошо
		'row4-col3': 'histo1', // нет изменений
		'row5-col3': 'micro3', // микроскопию не делали
		'row6-col3': 'mech7', // повреждения клеток не выявлены
		'row7-col3': 'result3' // нормальное потомство
	}
}

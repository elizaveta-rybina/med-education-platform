import { DropdownTableBlock } from '@/features/dropdown-table'

export const gameTableData: DropdownTableBlock = {
	id: 'dtb-1',
	title: 'Результаты эксперимента по артериальной гиперемии',
	tableTitle:
		'Выберите соответствующие значения для каждой модели эксперимента',
	columns: [
		{ id: 'parameter', title: '', width: '40%' },
		{ id: 'model1', title: 'Модель 1', width: '30%' },
		{ id: 'model2', title: 'Модель 2', width: '30%' }
	],
	rows: [
		{
			id: 'row1',
			values: ['Количество функционирующих капилляров до эксперимента', '', ''],
			cellOptions: {
				col1: [
					{ id: 'cap1', content: 'Уменьшено' },
					{ id: 'cap2', content: 'Нормальное' },
					{ id: 'cap3', content: 'Увеличено' }
				],
				col2: [
					{ id: 'cap1', content: 'Уменьшено' },
					{ id: 'cap2', content: 'Нормальное' },
					{ id: 'cap3', content: 'Увеличено' }
				]
			}
		},
		{
			id: 'row2',
			values: ['Состояние артериол до эксперимента', '', ''],
			cellOptions: {
				col1: [
					{ id: 'art1', content: 'Спазмированы' },
					{ id: 'art2', content: 'Не изменены' },
					{ id: 'art3', content: 'Расширены' }
				],
				col2: [
					{ id: 'art1', content: 'Спазмированы' },
					{ id: 'art2', content: 'Не изменены' },
					{ id: 'art3', content: 'Расширены' }
				]
			}
		},
		{
			id: 'row3',
			values: ['Линейная скорость кровотока до эксперимента', '', ''],
			cellOptions: {
				col1: [
					{ id: 'lin1', content: 'Снижена' },
					{ id: 'lin2', content: 'Нормальная' },
					{ id: 'lin3', content: 'Увеличена' }
				],
				col2: [
					{ id: 'lin1', content: 'Снижена' },
					{ id: 'lin2', content: 'Нормальная' },
					{ id: 'lin3', content: 'Увеличена' }
				]
			}
		},
		{
			id: 'row4',
			values: ['Объемная скорость кровотока до эксперимента', '', ''],
			cellOptions: {
				col1: [
					{ id: 'vol1', content: 'Снижена' },
					{ id: 'vol2', content: 'Нормальная' },
					{ id: 'vol3', content: 'Увеличена' }
				],
				col2: [
					{ id: 'vol1', content: 'Снижена' },
					{ id: 'vol2', content: 'Нормальная' },
					{ id: 'vol3', content: 'Увеличена' }
				]
			}
		},
		{
			id: 'row5',
			values: [
				'Количество функционирующих капилляров после начала эксперимента',
				'',
				''
			],
			cellOptions: {
				col1: [
					{ id: 'cap1', content: 'Уменьшено' },
					{ id: 'cap2', content: 'Нормальное' },
					{ id: 'cap3', content: 'Увеличено' }
				],
				col2: [
					{ id: 'cap1', content: 'Уменьшено' },
					{ id: 'cap2', content: 'Нормальное' },
					{ id: 'cap3', content: 'Увеличено' }
				]
			}
		},
		{
			id: 'row6',
			values: ['Состояние артериол после начала эксперимента', '', ''],
			cellOptions: {
				col1: [
					{ id: 'art1', content: 'Спазмированы' },
					{ id: 'art2', content: 'Не изменены' },
					{ id: 'art3', content: 'Расширены' }
				],
				col2: [
					{ id: 'art1', content: 'Спазмированы' },
					{ id: 'art2', content: 'Не изменены' },
					{ id: 'art3', content: 'Расширены' }
				]
			}
		},
		{
			id: 'row7',
			values: ['Линейная скорость кровотока после начала эксперимента', '', ''],
			cellOptions: {
				col1: [
					{ id: 'lin1', content: 'Снижена' },
					{ id: 'lin2', content: 'Нормальная' },
					{ id: 'lin3', content: 'Увеличена' }
				],
				col2: [
					{ id: 'lin1', content: 'Снижена' },
					{ id: 'lin2', content: 'Нормальная' },
					{ id: 'lin3', content: 'Увеличена' }
				]
			}
		},
		{
			id: 'row8',
			values: ['Объемная скорость кровотока после начала эксперимента', '', ''],
			cellOptions: {
				col1: [
					{ id: 'vol1', content: 'Снижена' },
					{ id: 'vol2', content: 'Нормальная' },
					{ id: 'vol3', content: 'Увеличена' }
				],
				col2: [
					{ id: 'vol1', content: 'Снижена' },
					{ id: 'vol2', content: 'Нормальная' },
					{ id: 'vol3', content: 'Увеличена' }
				]
			}
		},
		{
			id: 'row9',
			values: ['Цвет тканей', '', ''],
			cellOptions: {
				col1: [
					{ id: 'color1', content: 'Не изменен' },
					{ id: 'color2', content: 'Бледный' },
					{ id: 'color3', content: 'Покраснение' }
				],
				col2: [
					{ id: 'color1', content: 'Не изменен' },
					{ id: 'color2', content: 'Бледный' },
					{ id: 'color3', content: 'Покраснение' }
				]
			}
		},
		{
			id: 'row10',
			values: ['Механизм формирования артериальной гиперемии', '', ''],
			cellOptions: {
				col1: [
					{ id: 'mech1', content: 'Нейропаралитический' },
					{ id: 'mech2', content: 'Нейротонический' },
					{ id: 'mech3', content: 'Миогенный/гуморальный' }
				],
				col2: [
					{ id: 'mech1', content: 'Нейропаралитический' },
					{ id: 'mech2', content: 'Нейротонический' },
					{ id: 'mech3', content: 'Миогенный/гуморальный' }
				]
			}
		}
	],
	correctAnswers: {
		// Модель 1
		'row1-col1': 'cap2', // Нормальное
		'row2-col1': 'art2', // Не изменены
		'row3-col1': 'lin2', // Нормальная
		'row4-col1': 'vol2', // Нормальная
		'row5-col1': 'cap3', // Увеличено
		'row6-col1': 'art3', // Расширены
		'row7-col1': 'lin3', // Увеличена
		'row8-col1': 'vol3', // Увеличена
		'row9-col1': 'color3', // Покраснение
		'row10-col1': 'mech1', // Нейропаралитический
		// Модель 2
		'row1-col2': 'cap2', // Нормальное
		'row2-col2': 'art2', // Не изменены
		'row3-col2': 'lin2', // Нормальная
		'row4-col2': 'vol2', // Нормальная
		'row5-col2': 'cap3', // Увеличено
		'row6-col2': 'art3', // Расширены
		'row7-col2': 'lin3', // Увеличена
		'row8-col2': 'vol3', // Увеличена
		'row9-col2': 'color3', // Покраснение
		'row10-col2': 'mech1' // Нейропаралитический
	}
}

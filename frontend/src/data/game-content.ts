import { DropdownTableBlock } from '@/components/coursePage/DropDownTableComponent'

export const sampleDropdownTableBlockRu: DropdownTableBlock = {
	id: 'dtb-1',
	title: 'Таблица параметров при изменении давления',
	tableTitle: 'Выберите соответствующие значения для каждой фазы',
	columns: [
		{ id: 'phase', title: 'Фаза' },
		{ id: 'pressure', title: 'Уровень барометрического давления' },
		{ id: 'behavior', title: 'Поведение животного' },
		{ id: 'breathingRate', title: 'Частота дыхания' },
		{ id: 'breathingType', title: 'Характер дыхания' },
		{ id: 'skinColor', title: 'Окраска кожных покровов' },
		{ id: 'oxygenLevel', title: 'Ра О₂ в артериальной крови' }
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
			{ id: 'p760', content: '- 760 мм рт. ст.' },
			{ id: 'p600', content: '- 600 мм рт. ст.' },
			{ id: 'p530', content: '- 530 мм рт. ст.' },
			{ id: 'p308', content: '- 308 мм рт. ст.' },
			{ id: 'p250', content: '- 250 мм рт. ст.' },
			{ id: 'p180', content: '- 180 мм рт. ст.' },
			{ id: 'p150', content: '- 150 мм рт. ст.' }
		],
		behavior: [
			{ id: 'b1', content: '- спокойное' },
			{ id: 'b2', content: '- беспокойное (перемещается под колпаком)' },
			{
				id: 'b3',
				content:
					'- крайне беспокойное (перемещается под колпаком и встает на задние лапки)'
			},
			{ id: 'b4', content: '- состояние тяжелое (судороги)' },
			{ id: 'b5', content: '- смерть' }
		],
		breathingRate: [
			{ id: 'br150', content: '- 150 в минуту' },
			{ id: 'br76', content: '- 76 в минуту' },
			{ id: 'br86', content: '- 86 в минуту' },
			{ id: 'br98', content: '- 98 в минуту' },
			{ id: 'br80', content: '- 80 в минуту' },
			{ id: 'br52', content: '- 52 в минуту' },
			{ id: 'br50', content: '- менее 50 в минуту' }
		],
		breathingType: [
			{ id: 'bt1', content: '- ритмичное, поверхностное' },
			{ id: 'bt2', content: '- ритмичное, глубокое' },
			{ id: 'bt3', content: '- ритмичное, очень глубокое' },
			{ id: 'bt4', content: '- не ритмичное, очень глубокое' },
			{ id: 'bt5', content: '- апноэ' }
		],
		skinColor: [
			{ id: 'sc1', content: '- без признаков цианоза' },
			{ id: 'sc2', content: '- незначительный цианоз (сереневый цвет)' },
			{
				id: 'sc3',
				content: '- значительный цианоз (голубой цвет, глаза красного цвета)'
			},
			{
				id: 'sc4',
				content: '- выраженный цианоз (синий цвет, глаза красного цвета)'
			},
			{
				id: 'sc5',
				content:
					'- крайняя степень цианоза (темно-синий цвет, глаза красного цвета)'
			}
		],
		oxygenLevel: [
			{ id: 'o100', content: '- 100 мм рт. ст.' },
			{ id: 'o96', content: '- 96 мм рт. ст.' },
			{ id: 'o90', content: '- 90 мм рт. ст.' },
			{ id: 'o60', content: '- 60 мм рт. ст.' },
			{ id: 'o35', content: '- 35 мм рт. ст.' },
			{ id: 'o35less', content: '- менее 35 мм рт. ст.' }
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

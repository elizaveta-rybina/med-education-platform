export const MyFinances = () => {
	const transactions = [
		{
			id: 1,
			date: '15.06.2023',
			description: 'Оплата курса "Кардиология"',
			amount: 4900,
			type: 'expense'
		},
		{
			id: 2,
			date: '10.06.2023',
			description: 'Пополнение баланса',
			amount: 10000,
			type: 'income'
		},
		{
			id: 3,
			date: '05.05.2023',
			description: 'Оплата курса "Неврология"',
			amount: 3900,
			type: 'expense'
		}
	]

	return (
		<div className='space-y-6'>
			<div className='bg-white rounded-lg shadow-sm p-6'>
				<h2 className='text-xl font-semibold text-gray-900 mb-6'>Баланс</h2>

				<div className='bg-blue-50 rounded-lg p-6 mb-6'>
					<p className='text-sm text-blue-600 mb-1'>Текущий баланс</p>
					<p className='text-3xl font-bold text-blue-800'>12 450 ₽</p>
				</div>

				<div className='flex flex-wrap gap-3'>
					<button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'>
						Пополнить баланс
					</button>
					<button className='px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-lg transition-colors'>
						Вывести средства
					</button>
				</div>
			</div>

			<div className='bg-white rounded-lg shadow-sm p-6'>
				<h2 className='text-xl font-semibold text-gray-900 mb-6'>
					История операций
				</h2>

				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-gray-50'>
							<tr>
								<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Дата
								</th>
								<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Описание
								</th>
								<th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Сумма
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{transactions.map(item => (
								<tr key={item.id}>
									<td className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'>
										{item.date}
									</td>
									<td className='px-4 py-3 text-sm text-gray-900'>
										{item.description}
									</td>
									<td
										className={`px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${
											item.type === 'income' ? 'text-green-600' : 'text-red-600'
										}`}
									>
										{item.type === 'income' ? '+' : '-'}
										{item.amount} ₽
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

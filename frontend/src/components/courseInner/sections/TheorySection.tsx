import { ImageBlock, TextBlock } from '@/data/types'
import React from 'react'
import { useTranslation } from 'react-i18next'

type HeadingTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface TheorySectionProps {
	theoryBlocks: (TextBlock | ImageBlock)[]
	isRead: boolean
	onMarkAsRead: () => void
}

export const TheorySection: React.FC<TheorySectionProps> = ({
	theoryBlocks,
	isRead,
	onMarkAsRead
}) => {
	const { t } = useTranslation('courseInner')
	const hasTheoryBlocks = theoryBlocks.length > 0

	// Recursive function to render JSON as styled JSX
	const renderNode = (node: any): React.ReactNode => {
		if (node.type === 'text') {
			let text = <span>{node.text}</span>
			if (node.marks) {
				node.marks.forEach((mark: any) => {
					if (mark.type === 'bold') {
						text = <strong className='font-bold'>{text}</strong>
					}
					if (mark.type === 'italic') {
						text = <em className='italic'>{text}</em>
					}
					if (mark.type === 'underline') {
						text = <u className='underline'>{text}</u>
					}
				})
			}
			return text
		}
		if (node.type === 'paragraph') {
			return (
				<p className='text-base leading-relaxed mb-4'>
					{node.content?.map((child: any, index: number) => (
						<React.Fragment key={index}>{renderNode(child)}</React.Fragment>
					))}
				</p>
			)
		}
		if (node.type === 'bulletList') {
			return (
				<ul className='list-disc pl-6 mb-4'>
					{node.content?.map((child: any, index: number) => (
						<React.Fragment key={index}>{renderNode(child)}</React.Fragment>
					))}
				</ul>
			)
		}
		if (node.type === 'orderedList') {
			return (
				<ol className='list-decimal pl-6 mb-4'>
					{node.content?.map((child: any, index: number) => (
						<React.Fragment key={index}>{renderNode(child)}</React.Fragment>
					))}
				</ol>
			)
		}
		if (node.type === 'listItem') {
			return (
				<li>
					{node.content?.map((child: any, index: number) => (
						<React.Fragment key={index}>{renderNode(child)}</React.Fragment>
					))}
				</li>
			)
		}
		if (node.type === 'heading') {
			const level = node.attrs?.level || 1
			const HeadingTag: HeadingTagType = `h${Math.min(
				Math.max(level, 1),
				6
			)}` as HeadingTagType
			return (
				<HeadingTag className={`text-${5 - level}xl font-bold mb-2`}>
					{node.content?.map((child: any, index: number) => (
						<React.Fragment key={index}>{renderNode(child)}</React.Fragment>
					))}
				</HeadingTag>
			)
		}
		if (node.type === 'table') {
			return (
				<div className='overflow-x-auto mb-4'>
					<table className='table-auto w-full border-collapse border border-gray-300'>
						<thead>
							{node.content
								?.find((child: any) => child.type === 'tableHeader')
								?.content?.map((row: any, rowIndex: number) => (
									<tr key={rowIndex}>
										{row.content?.map((cell: any, cellIndex: number) => (
											<th
												key={cellIndex}
												className='border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left'
											>
												{cell.content?.map((child: any, index: number) => (
													<React.Fragment key={index}>
														{renderNode(child)}
													</React.Fragment>
												))}
											</th>
										))}
									</tr>
								))}
						</thead>
						<tbody>
							{node.content
								?.find((child: any) => child.type === 'tableBody')
								?.content?.map((row: any, rowIndex: number) => (
									<tr key={rowIndex}>
										{row.content?.map((cell: any, cellIndex: number) => (
											<td
												key={cellIndex}
												className='border border-gray-300 px-4 py-2'
											>
												{cell.content?.map((child: any, index: number) => (
													<React.Fragment key={index}>
														{renderNode(child)}
													</React.Fragment>
												))}
											</td>
										))}
									</tr>
								))}
						</tbody>
					</table>
				</div>
			)
		}
		if (node.content) {
			return (
				<>
					{node.content.map((child: any, index: number) => (
						<React.Fragment key={index}>{renderNode(child)}</React.Fragment>
					))}
				</>
			)
		}
		return null
	}

	return (
		<div className='space-y-6'>
			{theoryBlocks.map(block => {
				if ('url' in block && block.url) {
					return (
						<figure
							key={block.id}
							className='inline-flex flex-col items-center mx-2 mb-4'
						>
							<img
								src={block.url}
								alt={block.alt || ''}
								className='w-full h-full object-cover rounded-lg shadow-md'
							/>
							{block.caption && (
								<figcaption className='text-center text-sm text-gray-600 mt-2'>
									{block.caption}
								</figcaption>
							)}
						</figure>
					)
				}
				return (
					<div key={block.id} className='prose max-w-none'>
						{renderNode((block as TextBlock).content)}
					</div>
				)
			})}
			{!isRead && hasTheoryBlocks && (
				<div className='mt-6 pt-4 border-t border-gray-200'>
					<button
						onClick={onMarkAsRead}
						className='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200'
					>
						{t('markAsCompleted')}
					</button>
				</div>
			)}
		</div>
	)
}

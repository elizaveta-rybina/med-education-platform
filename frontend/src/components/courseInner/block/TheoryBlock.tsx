// components/TheoryBlock.tsx
import {
	ImageBlock,
	RichTextContent,
	RichTextNode,
	TextBlock
} from '@/data/types'

interface TheoryBlockProps {
	block: TextBlock | ImageBlock
}

export const TheoryBlock = ({ block }: TheoryBlockProps) => {
	const extractText = (node: RichTextContent | RichTextNode): string => {
		if (node.text) return node.text
		if (node.content) return node.content.map(extractText).join('')
		return ''
	}

	if (block.type === 'text') {
		const text = extractText(block.content)
		return (
			<div className='mb-4 whitespace-pre-line'>
				{text.split('\n').map((paragraph: string, i: number) => (
					<p key={i} className='mb-2 text-justify'>
						{paragraph}
					</p>
				))}
			</div>
		)
	}

	return (
		<div className='my-6'>
			<img
				src={block.url}
				alt={block.alt || ''}
				className='max-w-full h-auto'
			/>
		</div>
	)
}

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
	text: string
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ text }) => {
	return (
		<div className='prose max-w-none'>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					ol: props => (
						<ol
							style={{
								listStyle: 'decimal',
								paddingLeft: '1.5rem',
								marginTop: '0.5rem',
								marginBottom: '0.5rem'
							}}
							{...props}
						/>
					),
					ul: props => (
						<ul
							style={{
								listStyle: 'disc',
								paddingLeft: '1.5rem',
								marginTop: '0.5rem',
								marginBottom: '0.5rem'
							}}
							{...props}
						/>
					)
				}}
			>
				{text}
			</ReactMarkdown>
		</div>
	)
}

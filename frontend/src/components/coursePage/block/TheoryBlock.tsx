// components/TheoryBlock.tsx
import { ImageBlock, TextBlock } from '@/data/types'

interface TheoryBlockProps {
  block: TextBlock | ImageBlock ;
}

export const TheoryBlock = ({ block }: TheoryBlockProps) => {
  if (block.type === 'text') {
    return (
      <div className="mb-4 whitespace-pre-line">
        {block.content.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-2 text-justify">{paragraph}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="my-6">
      <img 
        src={block.url} 
        alt={block.alt || ''} 
        className="max-w-full h-auto"
      />
    </div>
  );
};
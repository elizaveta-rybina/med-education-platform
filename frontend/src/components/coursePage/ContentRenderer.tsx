// components/ContentRenderer.tsx
import { Block } from '@/data/types'
import { TestBlock } from './TestBlock'
import { TheoryBlock } from './TheoryBlock'

interface ContentRendererProps {
  block: Block;
  moduleId: string;
  chapterId: string;
  questionIndex?: number;
  totalQuestions?: number;
  onNext?: () => void;
  onPrev?: () => void;
  onComplete?: (isCorrect: boolean) => void;
}

export const ContentRenderer = ({ 
  block, 
  moduleId, 
  chapterId,
  questionIndex = 0,
  totalQuestions = 0,
  onNext = () => {},
  onPrev = () => {},
  onComplete = () => {}
}: ContentRendererProps) => {
  if (block.type === 'question') {
    return (
      <TestBlock 
        block={block}
        moduleId={moduleId}
        chapterId={chapterId}
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
        onNext={onNext}
        onPrev={onPrev}
        onComplete={onComplete}
      />
    );
  }
  
  return <TheoryBlock block={block} />;
};
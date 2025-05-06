// components/GameBlock.tsx
import React from 'react'

interface GameBlockProps {
  block: {
    id: string;
    type: 'game';
    title?: string;
    gameUrl: string; // URL игры из Construct
    width?: string; // Например "800px"
    height?: string; // Например "600px"
  };
  onComplete?: (isCompleted: boolean) => void;
}

export const GameBlock: React.FC<GameBlockProps> = ({ 
  block, 
  onComplete = () => {} 
}) => {
  // Обработчик сообщений от игры (если нужно взаимодействие)
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Проверяем origin для безопасности
      if (event.origin !== new URL(block.gameUrl).origin) return;
      
      // Пример обработки сообщения о завершении игры
      if (event.data === 'GAME_COMPLETED') {
        onComplete(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [block.gameUrl, onComplete]);

  return (
    <div className="game-block p-4 bg-white rounded-lg shadow-md">
      {block.title && (
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {block.title}
        </h2>
      )}
      
      <div className="game-container mb-4">
        <iframe
          src={block.gameUrl}
          width={block.width || "800px"}
          height={block.height || "600px"}
          frameBorder="0"
          allowFullScreen
          className="w-full border rounded-lg"
          title={`Игра: ${block.title || block.id}`}
        />
      </div>
      
      <div className="game-instructions bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
        <p className="font-medium mb-1">Управление игрой:</p>
        <p>Используйте мышку и клавиатуру для взаимодействия с игрой.</p>
      </div>
    </div>
  );
};
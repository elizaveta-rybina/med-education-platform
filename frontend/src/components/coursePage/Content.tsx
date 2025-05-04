import { useEffect, useState } from 'react'
import ContentRenderer from './ContentRenderer';

interface ContentItem {
  id: number;
  title: string;
  isRead: boolean;
  blocks: any[];
  hash: string;
}

interface ContentProps {
  content: ContentItem[];
}

const Content = ({ content }: ContentProps) => {
  const [currentItem, setCurrentItem] = useState<ContentItem>(content[0]);

  // Функция для обработки хэша
  const updateCurrentItemFromHash = () => {
    const hash = window.location.hash.substring(1);
    const item = content.find(c => c.hash === hash) || content[0];
    setCurrentItem(item);
  };

  // Эффект для отслеживания изменений хэша
  useEffect(() => {
    updateCurrentItemFromHash();
    window.addEventListener('hashchange', updateCurrentItemFromHash);
    return () => window.removeEventListener('hashchange', updateCurrentItemFromHash);
  }, []);

  const markAsRead = () => {
    // Здесь должна быть логика обновления состояния прочитанного
    // В реальном приложении вы бы обновляли состояние в родительском компоненте
    console.log(`Marked as read: ${currentItem.title}`);
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {currentItem.title}
          {currentItem.isRead && (
            <span className="ml-2 text-green-500 text-sm font-normal">✓ Прочитано</span>
          )}
        </h1>
        
        <div className="space-y-6">
          {currentItem.blocks.map(block => (
            <ContentRenderer key={`${currentItem.id}-${block.id}`} block={block} />
          ))}
        </div>
        
        {!currentItem.isRead && (
          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={markAsRead}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Отметить как прочитанное
            </button>
          </div>
        )}
        
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Прогресс курса</h2>
          <div className="flex flex-wrap gap-3">
            {content.map((item) => (
              <a
                key={item.id}
                href={`#${item.hash}`}
                className={`px-4 py-2 rounded-full text-sm flex items-center
                  ${item.hash === currentItem.hash ? 'bg-blue-500 text-white' : 
                    item.isRead ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}
              >
                {item.isRead && (
                  <span className="mr-1">✓</span>
                )}
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
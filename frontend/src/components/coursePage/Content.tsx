import { ImageBlock, TextBlock } from '@/data/types'
import { useCourse } from '@/hooks/useCourse'
import { useEffect, useState } from 'react'
import { DragDropTableComponent } from './DragDropTableComponent'
import { FreeInputBlock } from './FreeInputBlock'; // Импортируем новый компонент
import { NavigationButtons } from './NavigationButtons'
import { TestBlock } from './TestBlock'
import { TheoryBlock } from './TheoryBlock'

const Content = () => {
  const { 
    course, 
    markChapterAsRead, 
  } = useCourse();
  
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentModule, setCurrentModule] = useState(course.modules[0]);
  const [currentChapter, setCurrentChapter] = useState(course.modules[0]?.chapters[0]);
  const [showTest, setShowTest] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testResults, setTestResults] = useState<boolean[]>([]);

  const updateCurrentChapter = () => {
    const hash = window.location.hash.substring(1);
    
    course.modules.forEach((module, mIdx) => {
      module.chapters.forEach((chapter, cIdx) => {
        if (chapter.hash === hash) {
          setCurrentModuleIndex(mIdx);
          setCurrentChapterIndex(cIdx);
          setCurrentModule(module);
          setCurrentChapter(chapter);
          setShowTest(false);
          setCurrentQuestionIndex(0);
          setTestResults([]);
        }
      });
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testBlocks.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleMarkAsRead = () => {
    markChapterAsRead(currentModule.id, currentChapter.id);
    setShowTest(true);
  };

  const handleQuestionComplete = (isCorrect: boolean) => {
    setTestResults(prev => {
      const newResults = [...prev];
      newResults[currentQuestionIndex] = isCorrect;
      return newResults;
    });
    
    if (currentQuestionIndex < testBlocks.length - 1) {
      setTimeout(handleNextQuestion, 1000);
    } else {
      markChapterAsRead(currentModule.id, currentChapter.id);
    }
  };

  useEffect(() => {
    updateCurrentChapter();
    window.addEventListener('hashchange', updateCurrentChapter);
    return () => window.removeEventListener('hashchange', updateCurrentChapter);
  }, [course.modules]);

  const navigateTo = (direction: 'prev' | 'next') => {
    let newModuleIndex = currentModuleIndex;
    let newChapterIndex = currentChapterIndex;
    
    if (direction === 'prev') {
      if (currentChapterIndex > 0) {
        newChapterIndex--;
      } else if (currentModuleIndex > 0) {
        newModuleIndex--;
        newChapterIndex = course.modules[newModuleIndex].chapters.length - 1;
      }
    } else {
      if (currentChapterIndex < currentModule.chapters.length - 1) {
        newChapterIndex++;
      } else if (currentModuleIndex < course.modules.length - 1) {
        newModuleIndex++;
        newChapterIndex = 0;
      }
    }
    
    const nextChapter = course.modules[newModuleIndex]?.chapters[newChapterIndex];
    if (nextChapter) {
      window.location.hash = nextChapter.hash;
    }
  };

   if (!currentModule || !currentChapter) return <div>Загрузка...</div>;
  
  // Фильтруем только те блоки, которые реально существуют
  const testBlocks = currentChapter.blocks.filter(block => 
    ['question', 'drag-drop-table', 'free-input'].includes(block.type)
  );
  
  const theoryBlocks = currentChapter.blocks.filter(block => 
    ['text', 'image'].includes(block.type)
  );
  
  const hasTheoryBlocks = theoryBlocks.length > 0;
  const hasDragDrop = currentChapter.blocks.some(b => b.type === 'drag-drop-table');
  const hasFreeInput = currentChapter.blocks.some(b => b.type === 'free-input');
  const currentTestBlock = testBlocks[currentQuestionIndex];

  return (
    <div className="flex-1 p-6 overflow-auto border-t-1">
      <div className="max-w-9xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {currentChapter.title}
          {currentChapter.isRead && (
            <span className="ml-2 text-green-500 text-sm font-normal">✓ Прочитано</span>
          )}
        </h1>
        
        {/* Условие для отображения drag-drop на всю ширину */}
        {hasDragDrop && currentTestBlock?.type === 'drag-drop-table' ? (
          <div className="w-full">
            <DragDropTableComponent 
              block={currentTestBlock}
              onComplete={handleQuestionComplete}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Назад
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === testBlocks.length - 1}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Далее
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Левая колонка - Теория */}
            <div className={`${hasFreeInput ? 'lg:w-1/2' : 'lg:w-2/3'}`}>
              <div className="space-y-8">
                {theoryBlocks.map(block => (
                  <TheoryBlock 
                    key={block.id} 
                    block={block as TextBlock | ImageBlock} 
                  />
                ))}
              </div>

              {!currentChapter.isRead && hasTheoryBlocks && (
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleMarkAsRead}
                    className="px-4 py-3 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition"
                  >
                    Отметить как прочитанное
                  </button>
                </div>
              )}
            </div>

            {/* Правая колонка - Тест/Задания */}
            {(showTest || currentChapter.isRead) && testBlocks.length > 0 && currentTestBlock && (
              <div className={`${hasFreeInput ? 'lg:w-1/2' : 'lg:w-1/3'}`}>
                <div className="sticky top-6 space-y-6">
                  {currentTestBlock.type === 'question' && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h2 className="text-xl font-semibold mb-4">
                        Проверка знаний ({currentQuestionIndex + 1}/{testBlocks.length})
                      </h2>
                      <TestBlock
                        block={currentTestBlock}
                        moduleId={currentModule.id}
                        chapterId={currentChapter.id}
                        questionIndex={currentQuestionIndex}
                        totalQuestions={testBlocks.length}
                        onNext={handleNextQuestion}
                        onPrev={handlePrevQuestion}
                        onComplete={handleQuestionComplete}
                      />
                    </div>
                  )}

                  {currentTestBlock.type === 'free-input' && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <FreeInputBlock
                        block={currentTestBlock}
                        onComplete={handleQuestionComplete}
                      />
                    </div>
                  )}

                  {testResults.length === testBlocks.length && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <h3 className="font-medium mb-2">Итоговый результат:</h3>
                      <p>
                        Правильных ответов: {testResults.filter(r => r).length} из {testBlocks.length}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        {testResults.filter(r => r).length >= 3 
                          ? "Тест пройден успешно!" 
                          : "Тест не пройден, нужно минимум 3 правильных ответа"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <NavigationButtons 
          course={course}
          currentModuleIndex={currentModuleIndex}
          currentChapterIndex={currentChapterIndex}
          onNavigate={navigateTo}
        />
      </div>
    </div>
  );
};

export default Content;
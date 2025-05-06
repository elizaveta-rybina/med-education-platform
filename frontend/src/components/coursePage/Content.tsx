// components/Content.tsx
import { useCourse } from '@/hooks/useCourse'
import { useEffect, useState } from 'react'
import { NavigationButtons } from './NavigationButtons'
import { TestBlock } from './TestBlock'
import { TheoryBlock } from './TheoryBlock'

const Content = () => {
  const { 
    course, 
    markChapterAsRead, 
    getTestResults, 
    completeChapterTest 
  } = useCourse();
  
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentModule, setCurrentModule] = useState(course.modules[0]);
  const [currentChapter, setCurrentChapter] = useState(course.modules[0]?.chapters[0]);
  const [showTest, setShowTest] = useState(false);

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
        }
      });
    });
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [testResults, setTestResults] = useState<boolean[]>([]);

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

const handleQuestionComplete = (isCorrect: boolean) => {
  setTestResults(prev => {
    const newResults = [...prev];
    newResults[currentQuestionIndex] = isCorrect;
    return newResults;
  });
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

  const handleMarkAsRead = () => {
    markChapterAsRead(currentModule.id, currentChapter.id);
    setShowTest(true);
  };

  if (!currentModule || !currentChapter) return <div>Загрузка...</div>;

  const { correct: correctAnswers, total: totalQuestions } = getTestResults(
    currentModule.id, 
    currentChapter.id
  );
  const isTestPassed = correctAnswers >= 3 && totalQuestions >= 5;
  const testBlocks = currentChapter.blocks.filter(block => block.type === 'question');
  const theoryBlocks = currentChapter.blocks.filter(block => block.type !== 'question');
  const hasTheoryBlocks = theoryBlocks.length > 0;

  return (
    <div className="flex-1 p-6 overflow-auto border-t-1">
      <div className="max-w-9xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {currentChapter.title}
          {currentChapter.isRead && (
            <span className="ml-2 text-green-500 text-sm font-normal">✓ Прочитано</span>
          )}
        </h1>
        
        {/* Основной контейнер с двумя колонками */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Левая колонка - Теория */}
          <div className="lg:w-2/3">
            <div className="space-y-8">
              {theoryBlocks.map(block => (
                <TheoryBlock key={block.id} block={block} />
              ))}
            </div>

            {/* Кнопка завершения главы */}
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

          {(showTest || currentChapter.isRead) && testBlocks.length > 0 && (
  <div className="lg:w-1/3">
    <div className="sticky top-6 space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Проверка знаний ({currentQuestionIndex + 1}/{testBlocks.length})
        </h2>
        
        <TestBlock
          block={testBlocks[currentQuestionIndex]}
          moduleId={currentModule.id}
          chapterId={currentChapter.id}
          questionIndex={currentQuestionIndex}
          totalQuestions={testBlocks.length}
          onNext={handleNextQuestion}
          onPrev={handlePrevQuestion}
          onComplete={handleQuestionComplete}
        />

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
  </div>
)}
        </div>

        {/* Навигация */}
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
import { FreeInputBlock as FreeInputBlockType } from '@/data/types'
import React, { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface FreeInputBlockProps {
  block: FreeInputBlockType;
  onComplete?: (isCompleted: boolean) => void;
}

export const FreeInputBlock: React.FC<FreeInputBlockProps> = ({ 
  block, 
  onComplete = () => {} 
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Здесь будет отправка ответов на сервер
    onComplete(false); // Ответ требует проверки преподавателем
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{block.title}</h2>
      
      {/* Описание кейса с HTML-форматированием */}
      {/* <div 
        className="mb-6 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: block.caseDescription }}
      /> */}
      
      {/* Таймер и статус */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CountdownCircleTimer
              isPlaying={!isSubmitted && !timeUp}
              duration={block.timeLimit}
              colors={['#3b82f6', '#f59e0b', '#ef4444']}
              colorsTime={[block.timeLimit, block.timeLimit/2, 0]}
              size={80}
              strokeWidth={6}
              onComplete={() => {
                setTimeUp(true);
                return { shouldRepeat: false };
              }}
            >
              {({ remainingTime }) => (
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-gray-700">
                    {formatTime(remainingTime)}
                  </span>
                  <span className="text-xs text-gray-500">осталось</span>
                </div>
              )}
            </CountdownCircleTimer>
          </div>
          
          {timeUp && !isSubmitted && (
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md">
              Время вышло! Ответы будут автоматически отправлены
            </div>
          )}
        </div>
      </div>

      {/* Поля для ответов */}
      <div className="space-y-6">
        {block.questions.map(question => (
          <div key={question.id} className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-gray-800">
              {question.text}
            </h3>
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={5}
              placeholder={question.placeholder || "Введите ваш ответ здесь..."}
              disabled={isSubmitted || timeUp}
              maxLength={question.maxLength}
            />
            {question.maxLength && (
              <div className="text-sm text-gray-500 mt-1">
                {answers[question.id]?.length || 0}/{question.maxLength} символов
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Кнопка отправки */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitted || timeUp}
          className={`px-6 py-3 rounded-lg font-medium ${
            isSubmitted || timeUp
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors`}
        >
          {isSubmitted ? 'Ответ отправлен' : 'Отправить на проверку'}
        </button>
      </div>

      {/* Сообщение после отправки */}
      {isSubmitted && (
        <div className="mt-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
          <p className="font-medium">{block.submissionText}</p>
        </div>
      )}
    </div>
  );
};

export default FreeInputBlock;
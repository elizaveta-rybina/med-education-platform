import React, { useState } from 'react'
import AccordionContent from './AccordionContent'

type Topic = {
  title: string;
  duration: string;
  completed: boolean;
};

type ModuleItem = {
  title: string;
  moduleNumber: string;
  timeRemaining: string;
  description: string;
  topics: Topic[];
  hasFinalTest: boolean;
  totalTopics: number;
  completedTopics: number;
  isUserRegistered: boolean;
};

type AccordionModuleProps = {
  modules: ModuleItem[];
  className?: string;
};

const AccordionModule: React.FC<AccordionModuleProps> = ({ modules, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleModule = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`border-2 border-purple-700 rounded-lg overflow-hidden w-full max-w-2xl px-4 sm:px-6 ${className}`}>
      {modules.map((module, index) => (
        <div 
          key={index}
          className={`border-b border-purple-200 last:border-b-0 ${
            activeIndex === index ? 'bg-white' : 'bg-white'
          }`}
        >
          <button
            className="w-full px-4 py-3 sm:px-5 sm:py-4 text-left flex justify-between items-center transition-colors"
            onClick={() => toggleModule(index)}
          >
            <div className="flex items-start space-x-2 sm:space-x-3">
              <div className="flex-shrink-0 mt-1">
                <span className="inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-purple-100 text-purple-600 text-xs sm:text-sm font-medium">
                  {module.moduleNumber}
                </span>
              </div>
              <div className='ml-2 sm:ml-3'>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  {module.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {module.timeRemaining} • {module.totalTopics} тем
                </p>
              </div>
            </div>
            <svg
              className={`h-5 w-5 sm:h-6 sm:w-6 text-purple-300 transform transition-transform ${
                activeIndex === index ? 'rotate-180' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div
            className={`px-4 sm:px-5 pb-3 sm:pb-4 pt-1 sm:pt-2 transition-all overflow-hidden ${
              activeIndex === index ? 'block' : 'hidden'
            }`}
          >
            <AccordionContent
              description={module.description}
              topics={module.topics}
              hasFinalTest={module.hasFinalTest}
              totalTopics={module.totalTopics}
              completedTopics={module.completedTopics}
              moduleNumber={module.moduleNumber}
              isUserRegistered={module.isUserRegistered}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionModule;
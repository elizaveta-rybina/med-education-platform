import { Course } from '@/data/recommend';
import React from 'react'

const Card: React.FC<Course> = ({
  imageUrl,
  imageAlt = '',
  title,
  description,
  buttonText = 'Подробнее',
  buttonLink = '#',
  duration,
  modulesCount,
  isAvailable = true,
  className = ''
	
}) => {
  return (
    <div className={`flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
      {/* Изображение курса */}
      <a href={isAvailable ? buttonLink : '#'} className="relative">
        <img 
          className="w-full h-48 sm:h-52 md:h-56 object-cover" 
          src={imageUrl} 
          alt={imageAlt} 
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Скоро доступно</span>
          </div>
        )}
      </a>

      {/* Контент карточки */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        {/* Заголовок и описание */}
        <div className="flex-grow">
          <a href={isAvailable ? buttonLink : '#'}>
            <h3 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900">
              {title}
            </h3>
          </a>
          
          <p className="mb-3 text-sm sm:text-base text-gray-700 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Мета-информация */}
        {(duration || modulesCount) && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-xs sm:text-sm text-gray-500">
            {duration && <span className="flex items-center">⏱ {duration}</span>}
            {modulesCount && <span className="flex items-center">📚 {modulesCount} модулей</span>}
          </div>
        )}
        
        {/* Кнопка */}
        <a 
          href={isAvailable ? buttonLink : '#'}
          className={`inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg transition-colors ${
            isAvailable 
              ? 'bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          aria-disabled={!isAvailable}
        >
          {isAvailable ? buttonText : 'Недоступно'}
          {isAvailable && (
            <svg 
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 14 10"
            >
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          )}
        </a>
      </div>
    </div>
  );
};

export default Card;
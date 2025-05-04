import React from 'react'

// Типизация для пропсов (если нужно будет расширить)
interface HeroSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  imageSrc: string;
  imageAlt?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  buttonText,
  buttonHref = '/',
  imageSrc,
  imageAlt = 'Illustration',
}) => {
  return (
    <div className="flex h-[90vh] items-center justify-center bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Левая колонка: Заголовок, подпись и кнопка */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              {description}
            </p>
            <a
							href={buttonHref}
							className="inline-flex items-center justify-center gap-x-2 px-6 py-3 text-base font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-blue-800"
						>
							{buttonText} <span aria-hidden="true">&rarr;</span>
						</a>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
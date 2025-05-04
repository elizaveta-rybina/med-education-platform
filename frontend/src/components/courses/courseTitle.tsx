import React from 'react'

type CourseTitleProps = {
  title: React.ReactNode;
  description: string;
  imageSrc: string;
  imageAlt?: string;
};

const CourseTitle: React.FC<CourseTitleProps> = ({ title, description, imageSrc, imageAlt }) => {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Левая колонка: Заголовок, подпись и кнопка */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-4xl font-extrabold">{title}</h2>
          <p className="my-5 text-lg text-gray-500">{description}</p>
        </div>
        {/* Правая колонка: Изображение (скрыто на мобильных и планшетах) */}
        <div className="hidden md:block md:w-1/2 flex justify-center md:justify-end">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseTitle;
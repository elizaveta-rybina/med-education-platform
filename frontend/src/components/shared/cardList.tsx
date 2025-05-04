import { Course } from 'data/recommend'
import React from 'react'
import Card from './card'

type CardListProps = {
  courses: Course[];
  className?: string;
  cols?: 1 | 2 | 3 | 4;
};

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
};

const CardList: React.FC<CardListProps> = ({ 
  courses, 
  className = '',
  cols = 3
}) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Курсы не найдены</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[cols]} gap-6 ${className}`}>
      {courses.slice(0, 4).map((course) => (
				<Card
					key={course.id}
					imageUrl={course.imageUrl}
					imageAlt={course.imageAlt}
					title={course.title}
					description={course.description}
					buttonText={course.buttonText}
					buttonLink={course.buttonLink}
				/>
			))}
    </div>
  );
};

export default CardList;
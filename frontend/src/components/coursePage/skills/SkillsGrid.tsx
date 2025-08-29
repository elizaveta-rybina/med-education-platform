import React from 'react'
import Skill from './Skill'

type SkillsGridProps = {
  skills: string[];
  className?: string;
};

const SkillsGrid: React.FC<SkillsGridProps> = ({ skills, className = '' }) => {
  return (
    <div className={`
      grid my-6 
      grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
      gap-2 sm:gap-3
      ${className}
    `}>
      {skills.map((skill, index) => (
        <div key={index} className="min-w-0"> {/* Добавляем контейнер для ограничения ширины */}
          <Skill name={skill} className="w-full" />
        </div>
      ))}
    </div>
  );
};

export default SkillsGrid;
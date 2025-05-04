import React from 'react';

type SkillProps = {
  name: string;
  className?: string;
};

const Skill: React.FC<SkillProps> = ({ name, className = '' }) => {
  return (
    <div className={`
      flex items-center justify-center 
      min-w-0 px-3 py-1.5
      rounded-full 
      bg-pink-100 hover:bg-pink-200 transition-colors 
      text-gray-800 shadow-sm 
      ${className}
    `}>
      <span className="text-sm sm:text-base font-medium text-gray-900 truncate">
        {name}
      </span>
    </div>
  );
};

export default Skill;
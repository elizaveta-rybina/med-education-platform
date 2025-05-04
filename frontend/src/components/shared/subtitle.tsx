import React from 'react'

type SubtitleProps = {
  title: string;
  className?: string;
	anchor?: string;
};

const Subtitle: React.FC<SubtitleProps> = ({ title, className = '', anchor = '' }) => {
  return (
    <div className={`${className}`} id={anchor}>
      <h2 className="text-2xl font-bold text-gray-800 my-4">
        {title}
      </h2>
    </div>
  );
};

export default Subtitle;
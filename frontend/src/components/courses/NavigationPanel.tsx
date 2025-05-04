import React, { useState, useEffect } from 'react';

type NavItem = {
  label: string;
  anchor: string;
};

type NavigationPanelProps = {
  items: NavItem[];
  className?: string;
};

const NavigationPanel: React.FC<NavigationPanelProps> = ({ items, className = '' }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Плавный скролл с отступом
  const handleClick = (e: React.MouseEvent, anchor: string) => {
    e.preventDefault();
    setActiveItem(anchor);
    
    const element = document.getElementById(anchor);
    if (element) {
      const offset = 100; // Отступ сверху (подстройте под высоту вашей панели)
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Обновляем URL без перезагрузки страницы
      window.history.pushState(null, '', `#${anchor}`);
    }
  };

  // Определяем активный элемент при загрузке
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && items.some(item => item.anchor === hash)) {
      setActiveItem(hash);
    }
  }, [items]);

  return (
    <nav className={`sticky top-0 bg-white z-10 ${className}`}>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="inline-flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 border-b-2 border-purple-200 pb-2 mt-8 mb-4 md:mb-6 lg:mb-8 min-w-max w-full">
          {items.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              className="relative group px-1 sm:px-2"
              onClick={(e) => handleClick(e, item.anchor)}
            >
              <span className={`text-base sm:text-lg font-bold transition-colors ${
                activeItem === item.anchor 
                  ? 'text-fuchsia-600' 
                  : 'text-gray-800 hover:text-gray-600'
              }`}>
                {item.label}
              </span>
              <div className={`absolute bottom-[-10px] left-0 h-0.5 w-full transition-all ${
                activeItem === item.anchor
                  ? 'bg-fuchsia-600 scale-100' 
                  : 'bg-transparent scale-0'
              }`} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationPanel;
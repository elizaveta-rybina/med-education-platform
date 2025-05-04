import { useState } from 'react'
import { FaBars, FaCheckCircle, FaRegCircle, FaTimes } from 'react-icons/fa'

interface Chapter {
  id: number;
  title: string;
  completed: boolean;
  hash: string;
}

interface SideBarProps {
  chapters: Chapter[];
  moduleName: string;
}

const SideBar = ({ chapters, moduleName }: SideBarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isCollapsed) {
    return (
      <button 
        onClick={toggleSidebar}
        className="relative left-0 z-30 bg-white p-3 border border-r-0 border-gray-200 h-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-all"
      >
        <FaBars className="w-5 h-5 text-gray-600" />
      </button>
    );
  }

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{moduleName}</h2>
        <button 
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Скрыть меню"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav>
          <ul className="divide-y divide-gray-200">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.hash}`}
                  className="w-full flex items-start p-4 hover:bg-gray-50 text-left"
                >
                  <span className="mt-0.5 mr-3 flex-shrink-0">
                    {chapter.completed ? (
                      <FaCheckCircle className="text-purple-500 w-5 h-5" />
                    ) : (
                      <FaRegCircle className="text-gray-300 w-5 h-5" />
                    )}
                  </span>
                  <span className={`text-sm ${chapter.completed ? 'text-gray-500' : 'text-gray-800'}`}>
                    {chapter.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
import { useNavigate } from 'react-router-dom'

type ButtonType = {
	description: string;
	link?: string;
}

const ModalButtonAuthentication: React.FC<ButtonType & { onClick?: () => void }> = ({ description, onClick }) => {
  return (
    <button
      onClick={onClick} // добавляем обработчик клика
      className="inline-flex items-center justify-center gap-x-2 px-6 py-3 text-base font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-blue-800 "
      type="button"
    >
      {description}
    </button>
  );
};


const NavButton: React.FC<ButtonType & { onClick?: () => void }> = ({ description, link, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (link) {
      navigate(link);
    }
  };

  return (
    <button 
      onClick={handleClick} 
      type="button" 
      className="inline-flex items-center justify-center gap-x-2 px-6 py-3 text-base font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-blue-800"
    >
      {description}
    </button>
  );
};


export {ModalButtonAuthentication, NavButton}
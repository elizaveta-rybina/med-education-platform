import { FaTelegram, FaYoutube } from "react-icons/fa"
import { FaVk } from "react-icons/fa6"

const Footer = ({ className = '' }: { className?: string }) => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full">
      <div className="container mx-auto px-4">
        {/* Основное содержимое */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Лого и соцсети */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-purple-400 mb-2">МГУ им.Н.П.Огарёва</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                <FaVk size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                <FaTelegram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Основные ссылки */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200 px-1">Курсы</a>
            <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200 px-1">Контакты</a>
            <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200 px-1">Политика конфиденциальности</a>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} МГУ им.Н.П.Огарёва. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
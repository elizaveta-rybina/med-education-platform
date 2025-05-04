/**
 * Контекст и провайдер для управления состоянием боковой панели (сайдбара)
 * @module SidebarContext
 */

import { createContext, useContext, useEffect, useState } from "react"

/**
 * Тип, описывающий контекст боковой панели
 * @typedef SidebarContextType
 * @property {boolean} isExpanded - Состояние раскрытия сайдбара (для десктопной версии)
 * @property {boolean} isMobileOpen - Открыт ли сайдбар в мобильной версии
 * @property {boolean} isHovered - Наведен ли курсор на сайдбар
 * @property {string | null} activeItem - Активный элемент меню
 * @property {string | null} openSubmenu - Открытое подменю
 * @property {() => void} toggleSidebar - Функция переключения состояния сайдбара (десктоп)
 * @property {() => void} toggleMobileSidebar - Функция переключения мобильного сайдбара
 * @property {(isHovered: boolean) => void} setIsHovered - Установка состояния наведения
 * @property {(item: string | null) => void} setActiveItem - Установка активного элемента
 * @property {(item: string) => void} toggleSubmenu - Переключение подменю
 */

type SidebarContextType = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
  setActiveItem: (item: string | null) => void;
  toggleSubmenu: (item: string) => void;
};

/**
 * Контекст боковой панели
 * @type {React.Context<SidebarContextType | undefined>}
 */
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * Хук для доступа к контексту боковой панели
 * @function useSidebar
 * @returns {SidebarContextType} Контекст боковой панели
 * @throws {Error} Если хук используется вне SidebarProvider
 * @example
 * const { isExpanded, toggleSidebar } = useSidebar();
 */
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

/**
 * Провайдер контекста боковой панели
 * @component SidebarProvider
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Дочерние элементы
 * @returns {JSX.Element} Компонент провайдера
 * 
 * @example
 * <SidebarProvider>
 *   <App />
 * </SidebarProvider>
 * 
 * @description
 * Компонент предоставляет следующие функции:
 * - Автоматическое определение мобильного устройства
 * - Управление состоянием сайдбара для разных устройств
 * - Отслеживание активных элементов меню
 * - Управление подменю
 */
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  /**
   * Эффект для отслеживания изменения размера окна
   * @effect
   * @listens window:resize
   */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Переключение состояния сайдбара (десктоп)
   * @function toggleSidebar
   */
  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  /**
   * Переключение мобильного сайдбара
   * @function toggleMobileSidebar
   */
  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  /**
   * Переключение подменю
   * @function toggleSubmenu
   * @param {string} item - Ключ подменю
   */
  const toggleSubmenu = (item: string) => {
    setOpenSubmenu((prev) => (prev === item ? null : item));
  };

  return (
    <SidebarContext.Provider
      value={{
        isExpanded: isMobile ? false : isExpanded,
        isMobileOpen,
        isHovered,
        activeItem,
        openSubmenu,
        toggleSidebar,
        toggleMobileSidebar,
        setIsHovered,
        setActiveItem,
        toggleSubmenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
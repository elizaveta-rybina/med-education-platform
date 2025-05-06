import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Компонент для автоматической прокрутки страницы вверх при изменении маршрута
 * 
 * @component
 * @example
 * // Использование в основном компоненте приложения
 * function App() {
 *   return (
 *     <Router>
 *       <ScrollToTop />
 *       <Routes>
 *         {/* ваши маршруты *\/}
 *       </Routes>
 *     </Router>
 *   );
 * }
 * 
 * @description
 * Этот компонент отслеживает изменения пути (pathname) с помощью хука useLocation
 * и автоматически прокручивает страницу к началу при каждом изменении маршрута.
 * Прокрутка выполняется с плавной анимацией (smooth scroll behavior).
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  /**
   * Эффект, выполняющий прокрутку при изменении pathname
   * @effect
   * @listens pathname
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // Компонент не рендерит никакого DOM-элемента
  return null;
}
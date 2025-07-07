import { HelmetProvider, Helmet } from "react-helmet-async";

/**
 * Компонент PageMeta - управляет SEO-метаданными страницы
 * @param {string} title - Текст для тега <title> (отображается во вкладке браузера)
 * @param {string} description - Текст для мета-тега description (используется поисковыми системами)
 * @returns {JSX.Element} React-компонент, который внедряет мета-теги в head документа
 */

const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  // Компонент Helmet позволяет изменять содержимое head документа
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

/**
 * Компонент AppWrapper - обертка приложения для работы Helmet
 * @param {React.ReactNode} children - Дочерние компоненты приложения
 * @returns {JSX.Element} React-компонент, предоставляющий контекст для Helmet
 */

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  // HelmetProvider должен оборачивать все компоненты, где используется Helmet
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
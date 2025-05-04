import { ScrollToTop } from 'components/common/ScrollToTop'
import AppLayout from 'layout/AppLayout'
import { CoursePage, HomePage, NotFound, Physiology, RegistrationPage } from 'pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
        <AppLayout />
      </>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/course',
        element: <CoursePage />,
      },
      {
        path: '/course/physiology',
        element: <Physiology />
      },
      // Другие защищенные маршруты могут быть добавлены здесь
    ]
  },
  // Незащищенные маршруты (без AppLayout)
  {
    path: '/registration',
    element: <RegistrationPage />
  },
  // Fallback route
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
}
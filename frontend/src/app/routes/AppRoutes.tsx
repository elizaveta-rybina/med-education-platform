import { CoursePage, HomePage, NotFoundPage, Physiology, RegistrationPage } from 'pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
[
  {
    path: '/',
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
      {
        path: '/registration',
        element: <RegistrationPage />
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ]
  },
]);

export const AppRouter = () => {
	return <RouterProvider router={router} />
}
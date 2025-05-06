import { ScrollToTop } from '@/components/common/ScrollToTop'
import AppLayout from '@/layout/AppLayout'
import { CoursePage, HomePage, NotFound } from '@/pages'
import SignIn from '@/pages/AuthPages/SignIn'
import SignUp from '@/pages/AuthPages/SignUp'
import CourseInnerPage from '@/pages/Courses/Physiology'
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
        element: <CourseInnerPage />
      },
    ]
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: <SignUp />
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
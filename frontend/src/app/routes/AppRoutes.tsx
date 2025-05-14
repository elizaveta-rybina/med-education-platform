import { ScrollToTop } from '@/components/common/ScrollToTop'
import AdminLayout from '@/layout/AdminLayout'
import AppLayout from '@/layout/AppLayout'
import { CoursePage, HomePage, NotFound } from '@/pages'
import TeacherUsers from '@/pages/Admin/TeacherUsers'
import SignIn from '@/pages/AuthPages/SignIn'
import SignUp from '@/pages/AuthPages/SignUp'
import CourseInnerPage from '@/pages/Courses/Physiology'
import HomeAdmin from '@/pages/Dashboard/Home'
import GDevelopEditor from '@/pages/GDevelop/GDevelopEditor'
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
    element: (
      <>
        <ScrollToTop />
        <AdminLayout />
      </>
    ),
    children: [
      {
        path: '/admin/dashboard',
        element: <HomeAdmin />,
      },
      {
        path: '/admin/teachers',
        element: <TeacherUsers />,
      },
    ]
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/games',
    element: <GDevelopEditor />
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
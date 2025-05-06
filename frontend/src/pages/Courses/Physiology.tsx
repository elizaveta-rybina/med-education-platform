// pages/CoursePage.tsx
import { Content, SideBarCourse } from '@/components/coursePage'
import { CourseProvider } from '@/context/CourseContext'

const CourseInnerPage = () => {
  return (
    <CourseProvider>
      <div className="flex h-max">
        <SideBarCourse />
        <Content />
      </div>
    </CourseProvider>
  );
};

export default CourseInnerPage
import { Content, SideBarCourse } from '@/components/coursePage'
import { CourseProvider } from '@/context/CourseContext'

const CourseInnerPage = () => {
  return (
    <CourseProvider>
      <div className="flex flex-col md:flex-row min-h-screen ">
        <SideBarCourse />
        <Content />
      </div>
    </CourseProvider>
  )
}

export default CourseInnerPage
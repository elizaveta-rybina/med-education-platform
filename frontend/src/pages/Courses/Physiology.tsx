import { Content, SideBar } from 'components/coursePage'
import { contentItems, chapters as initialChapters } from 'data/content'
import { useState } from 'react'

const CoursePage = () => {
  const [chapters, setChapters] = useState(initialChapters);
  const [content] = useState(contentItems);

  return (
    <div className="flex h-screen border-t-1 border-gray-200">
      <SideBar chapters={chapters} moduleName="Гипоксия" />
      <Content content={content} />
    </div>
  );
};

export default CoursePage;
import HeroSection from '@/components/shared/title'
import { DragDropTableComponent } from '@/components/test/dnd'
import { exampleData } from '@/data/content'

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Откройте для себя мир медицины завтрашнего дня"
        description="Ваш путь в инновации начинается здесь. Присоединяйтесь к курсам!"
        buttonText="Перейти к обучению"
        buttonHref="course"
        imageSrc="/src/assets/heroImage.jpg"
        imageAlt="Медицинские курсы"
      />
      <DragDropTableComponent  block={exampleData}/>
    </div>
  );
};

export default HomePage;
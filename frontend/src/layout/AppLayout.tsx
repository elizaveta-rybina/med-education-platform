import { Header } from '@/components/shared'
import Footer from '@/components/shared/footer'
import { Outlet } from "react-router"

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex-1">
        <div className="mx-auto max-w-[--breakpoint-2xl]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
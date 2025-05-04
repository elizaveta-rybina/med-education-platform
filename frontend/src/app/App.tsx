import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainProviders } from 'app/providers';
import { AppRouter } from 'app/routes';
import Footer from 'components/shared/footer';
import Header from 'components/shared/header';

const queryClient = new QueryClient();

function App() {
  return (
    <MainProviders>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </MainProviders>
  );
}

export default App;
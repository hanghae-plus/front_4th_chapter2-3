import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import PostsManagerPage from '@/pages/PostsManagerPage.tsx';
import { Header, Footer } from '@/widgets/main';
import { queryClient } from '@/app/config/query-client.ts';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow container mx-auto px-4 py-8'>
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
    </Router>
  </QueryClientProvider>
);
export default App;

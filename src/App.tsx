import { BrowserRouter as Router } from 'react-router-dom';
import Header from './widgets/ui/Header.tsx';
import Footer from './widgets/ui/Footer.tsx';
import PostsManagerPage from './pages/PostsManagerPage.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './shared/lib/queryClient';

const App = () => {
  return (
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
};

export default App;

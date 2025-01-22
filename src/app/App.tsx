import { BrowserRouter as Router } from 'react-router-dom';

import { PostsManagerPage } from '@/pages/posts-manager';
import { Footer, Header } from '@/widgets/layout/ui';
import { QueryProvider } from './QueryProvider';
import { queryClient } from './queryClient';

const App = () => (
  <QueryProvider client={queryClient}>
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow container mx-auto px-4 py-8'>
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
    </Router>
  </QueryProvider>
);

export default App;

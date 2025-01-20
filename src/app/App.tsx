import { BrowserRouter as Router } from 'react-router-dom';

import { PostsManagerPage } from '@/pages/posts-manager';
import { Footer, Header } from '@/widgets/layout/ui';

const App = () => (
  <Router>
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow container mx-auto px-4 py-8'>
        <PostsManagerPage />
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;

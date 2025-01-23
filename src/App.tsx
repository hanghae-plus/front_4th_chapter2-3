import { BrowserRouter as Router } from "react-router-dom";
import PostsManagerPage from "./pages/posts-manager/PostsManagerPage.tsx";
import OverlayGroup from "./shared/ui/OverlayGroup.tsx";
import Footer from "./widgets/layout/ui/Footer.tsx";
import Header from "./widgets/layout/ui/Header.tsx";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container mx-auto flex-grow px-4 py-8">
          <PostsManagerPage />
        </main>
        <Footer />
      </div>

      <OverlayGroup />
    </Router>
  );
};

export default App;

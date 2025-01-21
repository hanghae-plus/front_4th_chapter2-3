import { BrowserRouter as Router } from "react-router-dom";
import Header from "./widgets/ui/Header.tsx";
import Footer from "./widgets/ui/Footer.tsx";
import PostsManagerPage from "./pages/PostsManagerPage.tsx";
import { DialogProvider } from "@entities/dialog/ui/DialogProvider.tsx";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManagerPage />
          <DialogProvider />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

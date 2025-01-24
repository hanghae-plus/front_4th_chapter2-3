import { BrowserRouter as Router } from "react-router-dom";
import Header from "./widgets/ui/Header.tsx";
import Footer from "./widgets/ui/Footer.tsx";
import PostsManagerPage from "./pages/PostsManagerPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <QueryClientProvider client={queryClient}>
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
        </QueryClientProvider>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

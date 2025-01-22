import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

import PostsManager from "@/pages/PostsManagerPage";

import Footer from "@/widgets/ui/Footer";
import Header from "@/widgets/ui/Header";

import { Modal } from "@/features/modal";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Suspense fallback={<>loading...</>}>
              <PostsManager />
            </Suspense>
          </main>
          <Footer />
        </div>
        <Modal />
      </QueryClientProvider>
    </Router>
  );
};

export default App;

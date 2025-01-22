import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

import { PostsManagerPage } from "@/pages/posts";

import { Footer, Header } from "@/widgets/layout";

import { Modal } from "@/features/modal";

import { Loading } from "@/shared/ui";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Suspense fallback={<Loading />}>
              <PostsManagerPage />
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

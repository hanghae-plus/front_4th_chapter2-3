import { BrowserRouter as Router } from "react-router-dom"

import PostsManagerPage from "./pages/post-manager.page.tsx"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Footer } from "./widgets/footer/index.ts"
import { Header } from "./widgets/header/index.ts"

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 15,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        retry: 1,
      },
    },
  })
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </Router>
  )
}

export default App

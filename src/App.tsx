import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/header/ui/Header.tsx"
import Footer from "./widgets/footer/ui/Footer.tsx"
import PostsManagerPage from "./pages/ui/PostsManagerPage.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  // 에러 throw 하도록 설정해야함.
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
})

const App = () => {
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

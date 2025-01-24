import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "@/app/config/tanstack.query"
import { BrowserRouter as Router } from "react-router-dom"
import Footer from "@/modules/@ui/Footer.tsx"
import Header from "@/modules/@ui/Header.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"

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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Router>
  )
}

export default App

import { BrowserRouter as Router } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "./shared/config/queryClient.ts"
import Header from "@widgets/header/ui/Header.tsx"
import Footer from "@widgets/footer/ui/Footer.tsx"
import PostsManagerPage from "@pages/PostManager/ui/PostsManagerPage.tsx"

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App

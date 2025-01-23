import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/ui/Header.tsx"
import Footer from "./widgets/ui/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import UserModal from "./features/user/ui/UserModal.tsx"
import { PostModal } from "./entities/modal/ui/PostModal.tsx"
import { CommentModal } from "./entities/modal/ui/CommentModal.tsx"

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <UserModal />
          <PostModal />
          <CommentModal />
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App

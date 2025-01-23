import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"

import { DialogProvider } from "./app/model/DialogProvider.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import Footer from "./widgets/footer/ui/Footer.tsx"
import Header from "./widgets/header/ui/Header.tsx"

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <PostsManagerPage />
            </main>
            <Footer />
          </div>
        </Router>
      </DialogProvider>
    </QueryClientProvider>
  )
}

export default App

import { RouterProvider } from "./provider"
import PostsManagerPage from "../pages/PostsManagerPage.tsx"
import { Header } from "../shared/ui/header"
import { Footer } from "../shared/ui/footer"

const App = () => {
  return (
    <RouterProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
    </RouterProvider>
  )
}

export default App

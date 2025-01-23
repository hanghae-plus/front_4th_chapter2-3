import { BrowserRouter as Router } from "react-router-dom"

import PostsManagerPage from "./pages/post-manager.page.tsx"

import { Footer } from "./widgets/footer/index.ts"
import { Header } from "./widgets/header/index.ts"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

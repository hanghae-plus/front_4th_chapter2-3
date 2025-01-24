import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/ui/Header.tsx"
import Footer from "./widgets/ui/Footer.tsx"
import PostsManager from "./pages/post/ui/PostsManagerPage.tsx"
import Modal from "./shared/ui/Modal.tsx"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManager />
        </main>
        <Footer />
      </div>
      <Modal />
    </Router>
  )
}

export default App

import { BrowserRouter as Router } from "react-router-dom"
import { Header } from "./widgets/header/ui"
import { Footer } from "./widgets/footer/ui"
import { PostsManagerPage } from "./pages/main/ui"
import { SelectedCommentProvider } from "./entities/comment/model"
import { ToggleKey } from "./pages/main/model"
import { ToggleStateProvider } from "./shared/model/toggle-state.model"
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <ToggleStateProvider<ToggleKey>
            initialState={{
              viewProfile: false,
              addPost: false,
              editPost: false,
              detailPost: false,
              addComment: false,
              editComment: false,
            }}
          >
            <SelectedCommentProvider>
              <PostsManagerPage />
            </SelectedCommentProvider>
          </ToggleStateProvider>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

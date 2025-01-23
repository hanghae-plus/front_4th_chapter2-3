import { RouterProvider, ReactQueryProvider } from "./provider"
import { PostsManagerPage } from "../pages/postsManager/ui"

const App = () => {
  return (
    <ReactQueryProvider>
      <RouterProvider>
        <PostsManagerPage />
      </RouterProvider>
    </ReactQueryProvider>
  )
}

export default App

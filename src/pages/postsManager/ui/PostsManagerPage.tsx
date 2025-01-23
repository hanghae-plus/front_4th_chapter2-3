import { PostsManagerWidget } from "@widgets/postsManager/ui"
import { Header } from "@shared/ui/header"
import { Footer } from "@shared/ui/footer"

export const PostsManagerPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <PostsManagerWidget />
      </main>
      <Footer />
    </div>
  )
}

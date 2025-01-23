import { Card } from "@shared/ui"
import { Modal } from "@shared/ui/modal/Modal.tsx"
import { PostManagerHeader, PostManagerContent } from "@widgets/post/ui"

const PostsManager = () => {
  return (
    <>
      <Card className="w-full max-w-6xl mx-auto">
        <PostManagerHeader />
        <PostManagerContent />
      </Card>
      <Modal />
    </>
  )
}

export default PostsManager

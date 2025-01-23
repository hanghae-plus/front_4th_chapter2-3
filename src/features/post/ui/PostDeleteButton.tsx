import { Trash2 } from "lucide-react"

import { deletePost } from "../../../entities/post/api/deletePost"
import { Button } from "../../../shared/ui"

interface PostDeleteButtonProps {
  postId: number
}

export const PostDeleteButton = ({ postId }: PostDeleteButtonProps) => {
  const handleDeleteButtonClick = async (postId: number) => {
    try {
      const response = deletePost(postId)
      // setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => handleDeleteButtonClick(postId)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

// features/post/ui
import type { Post, PostId } from "@/entities/post/model"
import { Button } from "@/shared/ui"
import { Trash2 } from "lucide-react"
import { useMutationPostDelete } from "../api/useMutationPostDelete"

export function PostDeleteButton({ post }: { post: Post }) {
  const { mutate: deletePost } = useMutationPostDelete()

  // 게시물 삭제
  async function handlePostDelete(postId: PostId) {
    deletePost(postId)
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => handlePostDelete(post.id)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

// features/post/ui
import type { Post } from "@/entities/post/model"
import { usePost } from "@/features/post/model/usePost.ts"
import { usePostDialog } from "@/features/post/model/usePostDialog.ts"
import { Button } from "@/shared/ui"
import { MessageSquare } from "lucide-react"

export function PostOpenDetailButton({ post }: { post: Post }) {
  const { setSelectedPost } = usePost()
  const { setShowPostDetailDialog } = usePostDialog()

  // 게시물 상세 보기
  function handleOpenPostDetail(post: Post) {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => handleOpenPostDetail(post)}>
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}

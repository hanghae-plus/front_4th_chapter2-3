// features/post/ui
import type { Post } from "@/entities/post/model"
import { usePost } from "@/features/post/model/usePost.ts"
import { usePostDialog } from "@/features/post/model/usePostDialog.ts"
import { Button } from "@/shared/ui"
import { Edit2 } from "lucide-react"

export function PostShowEditDialogButton({ post }: { post: Post }) {
  const { setSelectedPost } = usePost()
  const { setShowEditDialog } = usePostDialog()

  function handleEditDialogOpen() {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleEditDialogOpen}>
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}

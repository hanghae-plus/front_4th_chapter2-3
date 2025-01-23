import { MessageSquare } from "lucide-react"

import { useDialog } from "../../../app/model/DialogProvider"
import { Button } from "../../../shared/ui"
import { PostDetailDialog } from "../../../widgets/post-detail-dialog/ui/PostDetailDialog"

import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostDetailOpenButtonProps {
  post: PostWithUser
  searchQuery: string
}

export const PostDetailOpenButton = ({ post, searchQuery }: PostDetailOpenButtonProps) => {
  const { openDialog } = useDialog()

  const handleOpenModal = (post: PostWithUser) => {
    openDialog(PostDetailDialog, {
      open: true,
      selectedPost: post,
      searchQuery,
      postId: post.id,
      // setShowEditCommentDialog,
      // setShowAddCommentDialog,
      // setNewComment,
      // setSelectedComment,
    })
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => handleOpenModal(post)}>
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}

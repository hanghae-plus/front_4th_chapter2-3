import { MessageSquare } from "lucide-react"

import { useDialog } from "../../../app/model/DialogProvider"
import { Button } from "../../../shared/ui"
import { PostDetailDialog } from "../../../widgets/post-detail-dialog/ui/PostDetailDialog"

import type { Comment } from "../../../entities/comment/model/types/comments"
import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostDetailOpenButtonProps {
  post: PostWithUser
  searchQuery: string
  comments: Comment[]
}

export const PostDetailOpenButton = ({ post, searchQuery, comments }: PostDetailOpenButtonProps) => {
  const { openDialog } = useDialog()

  const handleOpenModal = (post: PostWithUser) => {
    openDialog(PostDetailDialog, {
      open: true,
      selectedPost: post,
      searchQuery,
      comments,
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

import { Comment } from "@entities/comment/model"
import { useCommentStore } from "@features/comment/model/stores"

export const useCommentManager = () => {
  const store = useCommentStore()

  const handleAddComment = (postId: number) => {
    store.setNewComment({ ...store.newComment, postId })
    store.setShowAddCommentDialog(true)
  }

  const handleEditComment = (comment: Comment) => {
    store.setSelectedComment(comment)
    store.setShowEditCommentDialog(true)
  }

  const handleCommentOperation = async (operation: () => Promise<void>) => {
    try {
      await operation()
    } catch (error) {
      console.error("댓글 작업 중 오류 발생:", error)
    }
  }

  return {
    ...store,
    handleAddComment,
    handleEditComment,
    handleCommentOperation,
  }
}

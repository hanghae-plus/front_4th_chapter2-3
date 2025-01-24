import { Comment } from "@entities/comment/model"
import { useCommentStore } from "@features/comment/model/stores"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { commentsApi } from "@entities/comment/api"

export const useCommentManager = (postId: number) => {
  const store = useCommentStore()
  const queryClient = useQueryClient()

  // 댓글 목록 조회
  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => commentsApi.fetchCommentsByPostId(postId),
    enabled: !!postId,
  })

  // 댓글 추가 mutation
  const addCommentMutation = useMutation({
    mutationFn: commentsApi.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] })
    },
  })

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
    comments,
    addCommentMutation,
  }
}

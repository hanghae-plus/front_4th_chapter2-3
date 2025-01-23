import { Comment, CommentResponse, postCommentLike } from "@/entities/comments"
import { commentKeys } from "@/entities/comments/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UseMutationLikeCommentProps {
  postId?: number
  commentId: number
  likes: number
}

function useMutationLikeComment(props: UseMutationLikeCommentProps) {
  const { postId, commentId, likes } = props

  const queryClient = useQueryClient()

  const { mutate: likeComment, isPending } = useMutation({
    mutationFn: () => {
      if (!postId) throw new Error("postId가 필요합니다.")
      return postCommentLike(commentId, likes)
    },
    onSuccess: (updatedComment) => {
      queryClient.setQueryData(commentKeys.detail(postId), (old: CommentResponse) => ({
        ...old,
        comments: old.comments.map((comment: Comment) =>
          comment.id === commentId ? { ...updatedComment, likes: comment.likes + 1 } : comment,
        ),
      }))
    },
  })

  return { likeComment, isPending }
}

export { useMutationLikeComment }

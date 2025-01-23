import { Comment, CommentResponse, deleteComment } from "@/entities/comments"
import { commentKeys } from "@/entities/comments/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UseMutationDeleteCommentProps {
  comment: Comment
}

function useMutationDeleteComment(props: UseMutationDeleteCommentProps) {
  const { comment } = props

  const queryClient = useQueryClient()

  const { mutate: deleteCommentMutation, isPending } = useMutation({
    mutationFn: () => deleteComment(comment.id),
    onSuccess: () => {
      queryClient.setQueryData(commentKeys.detail(comment.postId), (old: CommentResponse) => ({
        ...old,
        comments: old.comments.filter((deletedComment: Comment) => deletedComment.id !== comment.id),
      }))
    },
  })

  return { deleteCommentMutation, isPending }
}

export { useMutationDeleteComment }

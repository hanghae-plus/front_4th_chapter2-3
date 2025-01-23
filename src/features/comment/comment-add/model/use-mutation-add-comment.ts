import { addComment, Comment, CommentResponse } from "@/entities/comments"
import { commentKeys } from "@/entities/comments/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UseMutationAddCommentProps {
  newComment: Comment
}

function useMutationAddComment(props: UseMutationAddCommentProps) {
  const { newComment } = props

  const queryClient = useQueryClient()

  const { mutate: addCommentMutation, isPending } = useMutation({
    mutationFn: () => addComment(newComment),
    onSuccess: () => {
      queryClient.setQueryData(commentKeys.detail(newComment.postId), (oldData: CommentResponse) => {
        return {
          ...oldData,
          comments: [...oldData.comments, newComment],
        }
      })
    },
  })

  return { addCommentMutation, isPending }
}

export { useMutationAddComment }

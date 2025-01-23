import { Comment, CommentResponse, editComment } from "@/entities/comments"
import { commentKeys } from "@/entities/comments/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UseMutationUpdateCommentProps {
  selectedComment: Comment
}

function useMutationUpdateComment(props: UseMutationUpdateCommentProps) {
  const { selectedComment } = props

  const queryClient = useQueryClient()

  const { mutate: updateComment, isPending } = useMutation({
    mutationFn: () => editComment(selectedComment),
    onSuccess: () => {
      queryClient.setQueryData(commentKeys.detail(selectedComment.postId), (old: CommentResponse) => ({
        ...old,
        comments: old.comments.map((comment: Comment) =>
          comment.id === selectedComment.id ? { ...selectedComment, body: selectedComment.body } : comment,
        ),
      }))
    },
  })

  return { updateComment, isPending }
}

export { useMutationUpdateComment }

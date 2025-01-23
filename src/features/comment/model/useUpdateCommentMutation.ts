import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment } from "@entities/post/types"
import { updateComment } from "@entities/post/api"

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (comment: Comment) => updateComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/comments/posts"],
        exact: true,
      })
    },
  })
}

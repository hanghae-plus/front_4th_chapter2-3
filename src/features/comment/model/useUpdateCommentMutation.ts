import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment } from "@entities/comment/types"
import { updateComment } from "@entities/comment/api"
import { commentKeys } from "@features/comment/lib"

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (comment: Comment) => updateComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.fetch._def,
        exact: true,
      })
    },
  })
}

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RequestComment } from "@entities/comment/types"
import { addComment } from "@entities/comment/api"

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (comment: RequestComment) => addComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/comments/posts"],
        exact: true,
      })
    },
  })
}
